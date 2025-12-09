import { useEffect, useMemo, useState } from 'react';
import { fetchProducts, submitCheckout } from './api/client';
import { CartItem, CheckoutPayload, Product } from './types';
import { ProductCard } from './components/ProductCard';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutForm } from './components/CheckoutForm';
import { OrderSummary } from './components/OrderSummary';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<{ id: string; total: number; estimatedDelivery: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts()
      .then((data) => setProducts(data))
      .catch(() => setError('We could not load products. Please try again later.'));
  }, []);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
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
    setError(null);
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
      setError(err instanceof Error ? err.message : 'Unable to complete checkout.');
    } finally {
      setLoading(false);
    }
  };

  const heroHighlight = useMemo(
    () => products.find((p) => p.isNew) || products[0],
    [products]
  );

  return (
    <div>
      <header style={{ padding: '1.5rem 0', background: '#fff' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ margin: 0, letterSpacing: 2, textTransform: 'uppercase', fontSize: 12 }}>CandleSpace</p>
            <h1 style={{ margin: 0 }}>Artisanal candle studio</h1>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <span className="tag">Inspired by Anthropologie & West Elm warmth</span>
          </div>
        </div>
      </header>

      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="container" style={{ display: 'grid', gap: '1.5rem', alignItems: 'center' }}>
          <div className="card" style={{ padding: '1.75rem', background: 'linear-gradient(120deg, #fffaf0, #ffe4b5)' }}>
            <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', alignItems: 'center' }}>
              <div style={{ display: 'grid', gap: '0.75rem' }}>
                <span className="badge">Small batch</span>
                <h2 style={{ fontSize: '2rem' }}>Glow worth gifting</h2>
                <p style={{ margin: 0, color: '#5f5f5f', maxWidth: 540 }}>
                  Hand-poured soy candles with refined fragrance blends. Designed for evenings in, gifting, and the
                  cozy rituals in between.
                </p>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <button className="button-primary" onClick={() => heroHighlight && addToCart(heroHighlight)}>
                    Add bestseller to cart
                  </button>
                  <button className="button-secondary" onClick={() => window.scrollTo({ top: 500, behavior: 'smooth' })}>
                    Explore collection
                  </button>
                </div>
              </div>
              {heroHighlight && (
                <div className="card" style={{ padding: '1rem', textAlign: 'center' }}>
                  <img
                    src={heroHighlight.image}
                    alt={heroHighlight.name}
                    style={{ height: 240, width: '100%', objectFit: 'cover', borderRadius: 12 }}
                  />
                  <h3 style={{ margin: '0.75rem 0 0.25rem' }}>{heroHighlight.name}</h3>
                  <p style={{ margin: 0, color: '#5f5f5f' }}>{heroHighlight.description}</p>
                  <p style={{ margin: 0, fontWeight: 700 }}>${heroHighlight.price.toFixed(2)}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <main className="section">
        <div className="container" style={{ display: 'grid', gap: '2rem', gridTemplateColumns: '2fr 1fr' }}>
          <div className="grid grid-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} onAdd={addToCart} />
            ))}
          </div>
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            <CartDrawer
              items={cart}
              onRemove={removeFromCart}
              onQuantityChange={updateQuantity}
              onCheckout={() => document.getElementById('checkout')?.scrollIntoView({ behavior: 'smooth' })}
            />
            {order && (
              <OrderSummary
                orderId={order.id}
                total={order.total}
                estimatedDelivery={order.estimatedDelivery}
                onReset={() => setOrder(null)}
              />
            )}
          </div>
        </div>
      </main>

      <section className="section" id="checkout">
        <div className="container" style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: '1fr' }}>
          {error && (
            <div className="card" style={{ padding: '1rem', borderLeft: '6px solid #d9534f' }}>
              <strong>We hit a snag.</strong>
              <p style={{ margin: 0 }}>{error}</p>
            </div>
          )}
          <CheckoutForm onSubmit={handleCheckout} disabled={loading || cart.length === 0} />
        </div>
      </section>

      <footer style={{ padding: '2rem 0', background: '#fff', marginTop: '2rem' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h3 style={{ margin: 0 }}>CandleSpace</h3>
            <p style={{ margin: 0, color: '#5f5f5f' }}>Warmth, craft, and a touch of modern glow.</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <span className="badge">Hand-poured in small batches</span>
            <span className="badge" style={{ background: '#eaf7ea', color: '#228b22' }}>
              Clean-burning soy
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
