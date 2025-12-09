import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { fetchProducts, submitCheckout } from './api/client';
import { CartItem, CheckoutPayload, Product } from './types';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { CheckoutPage } from './pages/CheckoutPage';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<{ id: string; total: number; estimatedDelivery: string } | null>(null);
  const [productError, setProductError] = useState<string | null>(null);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts()
      .then((data) => setProducts(data))
      .catch(() => setProductError('We could not load products. Please try again later.'));
  }, []);

  const cartCount = useMemo(() => cart.reduce((count, item) => count + item.quantity, 0), [cart]);
  const cartTotal = useMemo(
    () => cart.reduce((total, item) => total + item.price * item.quantity, 0),
    [cart]
  );

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    const next = Math.max(1, quantity);
    setCart((prev) => prev.map((item) => (item.id === id ? { ...item, quantity: next } : item)));
  };

  const handleCheckout = async (customer: CheckoutPayload['customer'], notes?: string) => {
    if (cart.length === 0) return;

    setLoading(true);
    setCheckoutError(null);
    try {
      const payload: CheckoutPayload = {
        customer,
        items: cart.map((item) => ({ productId: item.id, quantity: item.quantity })),
        notes,
      };
      const response = await submitCheckout(payload);
      setOrder({
        id: response.order.orderId,
        total: response.order.total,
        estimatedDelivery: response.order.estimatedDelivery,
      });
      setCart([]);
    } catch (err) {
      setCheckoutError(err instanceof Error ? err.message : 'Unable to complete checkout.');
    } finally {
      setLoading(false);
    }
  };

  const heroHighlight = useMemo(() => products.find((p) => p.isNew) || products[0], [products]);

  return (
    <BrowserRouter>
      <Layout cartCount={cartCount} cartTotal={cartTotal} />
      <Routes>
        <Route
          path="/"
          element={<HomePage heroHighlight={heroHighlight} addToCart={addToCart} loading={products.length === 0} />}
        />
        <Route
          path="/products"
          element={
            <ProductsPage
              products={products}
              addToCart={addToCart}
              cart={cart}
              onRemove={removeFromCart}
              onQuantityChange={updateQuantity}
              error={productError}
            />
          }
        />
        <Route
          path="/checkout"
          element={
            <CheckoutPage
              cart={cart}
              onRemove={removeFromCart}
              onQuantityChange={updateQuantity}
              error={checkoutError}
              onCheckout={handleCheckout}
              loading={loading}
              order={order}
              onResetOrder={() => setOrder(null)}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
