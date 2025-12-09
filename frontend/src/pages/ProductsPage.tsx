import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartDrawer } from '../components/CartDrawer';
import { ProductCard } from '../components/ProductCard';
import { CartItem, Product } from '../types';

interface ProductsPageProps {
  products: Product[];
  addToCart: (product: Product) => void;
  cart: CartItem[];
  onRemove: (id: string) => void;
  onQuantityChange: (id: string, quantity: number) => void;
  error?: string | null;
}

export function ProductsPage({ products, addToCart, cart, onRemove, onQuantityChange, error }: ProductsPageProps) {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  const categories = useMemo(() => ['all', ...new Set(products.map((p) => p.category))], [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = category === 'all' || product.category === category;
      const term = search.trim().toLowerCase();
      const matchesTerm =
        term.length === 0 ||
        product.name.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term) ||
        product.fragranceNotes.some((note) => note.toLowerCase().includes(term));
      return matchesCategory && matchesTerm;
    });
  }, [products, category, search]);

  const isLoading = products.length === 0;

  return (
    <main className="section">
      <div className="container" style={{ display: 'grid', gap: '2rem' }}>
        <div className="section-header">
          <div>
            <p className="eyebrow" style={{ color: '#8b4513', letterSpacing: '2px' }}>
              Curated collection
            </p>
            <h2 style={{ margin: '0.2rem 0' }}>Find your new glow</h2>
            <p style={{ margin: 0, color: '#5f5f5f' }}>
              Filter by fragrance family or search by notes to land on the perfect candle.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <input
              type="search"
              placeholder="Search scents or notes"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input"
              style={{ minWidth: '240px' }}
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="input"
              style={{ minWidth: '180px' }}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All categories' : cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {error && (
          <div className="card" style={{ padding: '1rem', borderLeft: '6px solid #d9534f' }}>
            <strong>We hit a snag.</strong>
            <p style={{ margin: 0 }}>{error}</p>
          </div>
        )}

        <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: '2fr 1fr' }}>
          <div className="grid grid-3">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} onAdd={addToCart} />
            ))}
            {isLoading && (
              <div className="card" style={{ gridColumn: '1/-1', padding: '1.5rem' }}>
                <h3 style={{ margin: '0 0 0.25rem' }}>Gathering the collection</h3>
                <p style={{ margin: 0, color: '#5f5f5f' }}>
                  We are loading the scents and vessels. Please check back in a moment.
                </p>
              </div>
            )}
            {!isLoading && filteredProducts.length === 0 && (
              <div className="card" style={{ gridColumn: '1/-1', padding: '1.5rem' }}>
                <h3 style={{ margin: '0 0 0.25rem' }}>No candles match your search</h3>
                <p style={{ margin: 0, color: '#5f5f5f' }}>
                  Try adjusting filters or browsing all categories to find your next favorite aroma.
                </p>
              </div>
            )}
          </div>

          <div id="cart-panel" style={{ display: 'grid', gap: '1.5rem' }}>
            <CartDrawer
              items={cart}
              onRemove={onRemove}
              onQuantityChange={onQuantityChange}
              onCheckout={() => navigate('/checkout')}
            />
            <button className="button-secondary" onClick={() => navigate('/checkout')} disabled={cart.length === 0}>
              Proceed to checkout
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
