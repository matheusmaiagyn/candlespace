import { Link } from 'react-router-dom';
import { CartDrawer } from '../components/CartDrawer';
import { CheckoutForm } from '../components/CheckoutForm';
import { OrderSummary } from '../components/OrderSummary';
import { CartItem, Customer } from '../types';

interface CheckoutPageProps {
  cart: CartItem[];
  onRemove: (id: string) => void;
  onQuantityChange: (id: string, quantity: number) => void;
  onCheckout: (customer: Customer, notes?: string) => void;
  loading: boolean;
  error: string | null;
  order: { id: string; total: number; estimatedDelivery: string } | null;
  onResetOrder: () => void;
}

export function CheckoutPage({
  cart,
  onRemove,
  onQuantityChange,
  onCheckout,
  loading,
  error,
  order,
  onResetOrder,
}: CheckoutPageProps) {
  return (
    <main className="section">
      <div className="container" style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: '2fr 1fr' }}>
        <div style={{ display: 'grid', gap: '1.25rem' }}>
          <div>
            <p className="eyebrow" style={{ color: '#8b4513', letterSpacing: '2px' }}>
              Checkout
            </p>
            <h2 style={{ margin: '0.2rem 0' }}>Secure your glow</h2>
            <p style={{ margin: 0, color: '#5f5f5f' }}>
              Provide your details and notes, and we'll hand-pack your order with care.
            </p>
          </div>

          {error && (
            <div className="card" style={{ padding: '1rem', borderLeft: '6px solid #d9534f' }}>
              <strong>We hit a snag.</strong>
              <p style={{ margin: 0 }}>{error}</p>
            </div>
          )}

          <CheckoutForm onSubmit={onCheckout} disabled={loading || cart.length === 0} />

          {order && (
            <OrderSummary
              orderId={order.id}
              total={order.total}
              estimatedDelivery={order.estimatedDelivery}
              onReset={onResetOrder}
            />
          )}
        </div>

        <div style={{ display: 'grid', gap: '1rem', alignSelf: 'flex-start' }}>
          <CartDrawer
            items={cart}
            onRemove={onRemove}
            onQuantityChange={onQuantityChange}
            onCheckout={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          />
          <Link className="button-secondary" to="/products">
            Continue shopping
          </Link>
        </div>
      </div>
    </main>
  );
}
