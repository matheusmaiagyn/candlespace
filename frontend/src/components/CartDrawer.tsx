import { CartItem } from '../types';

interface Props {
  items: CartItem[];
  onRemove: (productId: string) => void;
  onQuantityChange: (productId: string, quantity: number) => void;
  onCheckout: () => void;
}

export function CartDrawer({ items, onRemove, onQuantityChange, onCheckout }: Props) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <aside
      style={{
        background: '#fff',
        borderRadius: 16,
        padding: '1.5rem',
        boxShadow: '0 16px 38px rgba(0,0,0,0.12)',
        position: 'sticky',
        top: 24,
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      <div>
        <h3 style={{ marginBottom: 4 }}>Your Cart</h3>
        <p style={{ margin: 0, color: '#5f5f5f' }}>
          {items.length === 0 ? 'Add your favorite scents to begin.' : `${items.length} product(s)`}
        </p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {items.map((item) => (
          <div key={item.id} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
            <img
              src={item.image}
              alt={item.name}
              style={{ width: 72, height: 72, objectFit: 'cover', borderRadius: 12 }}
            />
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong>{item.name}</strong>
                <button className="button-secondary" onClick={() => onRemove(item.id)}>
                  Remove
                </button>
              </div>
              <p style={{ margin: '4px 0', color: '#5f5f5f' }}>{item.size}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <label style={{ fontSize: 13 }}>Qty</label>
                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) => onQuantityChange(item.id, parseInt(e.target.value, 10) || 1)}
                  style={{ width: 64, padding: '6px 8px', borderRadius: 8, border: '1px solid #d8c9ba' }}
                />
                <span style={{ marginLeft: 'auto', fontWeight: 700 }}>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontWeight: 700 }}>Subtotal</span>
        <span style={{ fontSize: '1.1rem' }}>${subtotal.toFixed(2)}</span>
      </div>
      <button className="button-primary" disabled={!items.length} onClick={onCheckout}>
        Proceed to checkout
      </button>
    </aside>
  );
}
