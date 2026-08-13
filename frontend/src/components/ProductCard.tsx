import { Product } from '../types';

interface Props {
  product: Product;
  onAdd: (product: Product) => void;
}

export function ProductCard({ product, onAdd }: Props) {
  return (
    <article className="card" style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'relative' }}>
        {product.isNew && <span className="badge" style={{ position: 'absolute', top: 12, left: 12 }}>New</span>}
        <img
          src={product.image}
          alt={product.name}
          style={{ width: '100%', height: 240, objectFit: 'cover' }}
        />
      </div>
      <div style={{ padding: '1.4rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '1.2rem' }}>{product.name}</h3>
          <span className="tag">{product.category}</span>
        </header>
        <p style={{ margin: 0, color: '#4a4a4a' }}>{product.description}</p>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {product.fragranceNotes.map((note) => (
            <span key={note} className="badge">
              {note}
            </span>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
          <div>
            <strong style={{ fontSize: '1.1rem' }}>${product.price.toFixed(2)}</strong>
            <p style={{ margin: 0, fontSize: 13, color: '#5f5f5f' }}>
              {product.size} • ~{product.burnTimeHours} hrs burn
            </p>
          </div>
          <button className="button-primary" onClick={() => onAdd(product)}>
            Add to cart
          </button>
        </div>
      </div>
    </article>
  );
}
