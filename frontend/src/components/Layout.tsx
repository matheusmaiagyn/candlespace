import { Link, useLocation, useNavigate } from 'react-router-dom';

interface LayoutProps {
  cartCount: number;
  cartTotal: number;
}

export function Layout({ cartCount, cartTotal }: LayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className="site-header" data-page={location.pathname}>
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
            <Link to="/" className={`nav-link ${location.pathname === '/' ? 'is-active' : ''}`}>
              Home
            </Link>
            <Link to="/products" className={`nav-link ${location.pathname === '/products' ? 'is-active' : ''}`}>
              Products
            </Link>
            <Link to="/checkout" className={`nav-link ${location.pathname === '/checkout' ? 'is-active' : ''}`}>
              Checkout
            </Link>
          </div>
          <div className="nav-actions">
            <span className="pill">Hand-poured • Small batch</span>
            <button className="cart-chip" onClick={() => navigate('/products#cart-panel')}>
              <span className="cart-chip__label">Cart</span>
              <span className="cart-chip__count">{cartCount}</span>
              <span className="cart-chip__total">${cartTotal.toFixed(2)}</span>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
