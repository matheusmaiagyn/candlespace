import { Link } from 'react-router-dom';
import { Product } from '../types';

interface HomePageProps {
  heroHighlight?: Product;
  addToCart: (product: Product) => void;
  loading?: boolean;
}

export function HomePage({ heroHighlight, addToCart, loading }: HomePageProps) {
  return (
    <main>
      <section className="hero">
        <div className="hero__overlay" />
        <div className="container hero__content">
          <div className="hero__copy">
            <p className="eyebrow">Cozy evenings, crafted glow</p>
            <h2>Illuminate your sanctuary</h2>
            <p className="lede">
              Handcrafted, small-batch candles designed to bring warmth, comfort, and serenity to your everyday moments.
            </p>
            <div className="hero__actions">
              <Link className="button-secondary" to="/products">
                Shop the collection
              </Link>
              {heroHighlight && (
                <button className="button-primary" onClick={() => addToCart(heroHighlight)} disabled={loading}>
                  Add bestseller to cart
                </button>
              )}
            </div>
          </div>
          <div className="hero__featured card">
            {heroHighlight ? (
              <>
                <img src={heroHighlight.image} alt={heroHighlight.name} />
                <div className="hero__featured-copy">
                  <span className="badge">Bestseller</span>
                  <h3>{heroHighlight.name}</h3>
                  <p>{heroHighlight.description}</p>
                  <p className="hero__price">${heroHighlight.price.toFixed(2)}</p>
                </div>
              </>
            ) : (
              <div className="hero__featured-copy">
                <p className="badge">Loading</p>
                <h3>Curating your glow</h3>
                <p>Please wait while we assemble our latest scents.</p>
              </div>
            )}
          </div>
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
    </main>
  );
}
