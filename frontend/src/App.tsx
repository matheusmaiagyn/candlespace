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

  const heroHighlight = useMemo(() => products.find((p) => p.isNew) || products[0], [products]);

  return (
    <div>
      <header className="hero" id="home">
        <div className="hero__overlay" />
        <nav className="navbar">
          <div className="container navbar__inner">
            <div className="brand">
              <span className="brand__mark" aria-hidden="true">
                ✦
              </span>
              <div>
                <p className="brand__eyebrow">Lumina & Wick</p>
                <h1 className="brand__title">CandleSpace</h1>
              </div>
            </div>
            <div className="nav-links">
              <a href="#home" className="nav-link">
                Home
              </a>
              <a href="#shop" className="nav-link">
                Shop
              </a>
              <a href="#story" className="nav-link">
                Our Story
              </a>
              <a href="#checkout" className="nav-link">
                Checkout
              </a>
            </div>
            <div className="nav-actions">
              <span className="pill">Hand-poured • Small batch</span>
              <button
                className="cart-chip"
                onClick={() => document.getElementById('cart-panel')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <span className="cart-chip__label">Cart</span>
                <span className="cart-chip__count">{cartCount}</span>
                <span className="cart-chip__total">${cartTotal.toFixed(2)}</span>
              </button>
            </div>
          </div>
        </nav>

        <div className="container hero__content">
          <div className="hero__copy">
            <p className="eyebrow">Cozy evenings, crafted glow</p>
            <h2>Illuminate your sanctuary</h2>
            <p className="lede">
              Handcrafted, small-batch candles designed to bring warmth, comfort, and serenity to your everyday moments.
            </p>
            <div className="hero__actions">
              <button className="button-primary" onClick={() => heroHighlight && addToCart(heroHighlight)}>
                Add bestseller to cart
              </button>
              <button
                className="button-secondary"
                onClick={() => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Shop the collection
              </button>
            </div>
          </div>
          {heroHighlight && (
            <div className="hero__featured card">
              <img src={heroHighlight.image} alt={heroHighlight.name} />
              <div className="hero__featured-copy">
                <span className="badge">Bestseller</span>
                <h3>{heroHighlight.name}</h3>
                <p>{heroHighlight.description}</p>
                <p className="hero__price">${heroHighlight.price.toFixed(2)}</p>
              </div>
            </div>
          )}
        </div>
      </header>

      <section className="section" id="shop">
        <div className="container" style={{ display: 'grid', gap: '2rem', gridTemplateColumns: '2fr 1fr' }}>
          <div className="grid grid-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} onAdd={addToCart} />
            ))}
          </div>
          <div id="cart-panel" style={{ display: 'grid', gap: '1.5rem' }}>
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
      </section>

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

      <section className="section" id="story" style={{ paddingTop: 0 }}>
        <div
          className="container"
          style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}
        >
          <div className="card" style={{ padding: '1.5rem', display: 'grid', gap: '0.5rem' }}>
            <span className="badge">Our Craft</span>
            <h3>Warmth with intention</h3>
            <p style={{ margin: 0, color: '#5f5f5f' }}>
              We blend premium soy wax with phthalate-free fragrances, pour in micro-batches, and finish with cotton wicks for
              a clean burn.
            </p>
          </div>
          <div className="card" style={{ padding: '1.5rem', display: 'grid', gap: '0.5rem' }}>
            <span className="badge">Gifting ready</span>
            <h3>Wraps they'll remember</h3>
            <p style={{ margin: 0, color: '#5f5f5f' }}>
              Every jar arrives in recyclable packaging with a handwritten note option, perfect for thoughtful gifting.
            </p>
          </div>
          <div className="card" style={{ padding: '1.5rem', display: 'grid', gap: '0.5rem' }}>
            <span className="badge">Care</span>
            <h3>Slow evenings encouraged</h3>
            <p style={{ margin: 0, color: '#5f5f5f' }}>
              Trim the wick, light the glow, and let layered scents transform your space into a sanctuary.
            </p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer__inner">
          <div>
            <p className="brand__eyebrow">Lumina & Wick</p>
            <h3 style={{ margin: 0 }}>CandleSpace</h3>
            <p style={{ margin: 0, color: '#5f5f5f' }}>Warmth, craft, and a touch of modern glow.</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <span className="badge">Hand-poured in small batches</span>
            <span className="badge" style={{ background: '#eaf7ea', color: '#228b22' }}>
              Clean-burning soy
            </span>
            <span className="badge" style={{ background: '#f4f1ea', color: '#8b4513' }}>
              Cozy interiors approved
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
