interface Props {
  orderId: string;
  total: number;
  estimatedDelivery: string;
  onReset: () => void;
}

export function OrderSummary({ orderId, total, estimatedDelivery, onReset }: Props) {
  return (
    <section className="card" style={{ padding: '1.5rem', display: 'grid', gap: '0.5rem' }}>
      <span className="badge">Order confirmed</span>
      <h3 style={{ marginTop: 0 }}>Thank you for your purchase</h3>
      <p style={{ margin: 0, color: '#5f5f5f' }}>
        We are hand-pouring your candles with care. Look out for a shipping confirmation soon.
      </p>
      <div
        style={{
          display: 'grid',
          gap: '0.5rem',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          marginTop: '1rem',
        }}
      >
        <div>
          <strong>Order ID</strong>
          <p style={{ margin: 0 }}>{orderId}</p>
        </div>
        <div>
          <strong>Estimated Delivery</strong>
          <p style={{ margin: 0 }}>{estimatedDelivery}</p>
        </div>
        <div>
          <strong>Total</strong>
          <p style={{ margin: 0 }}>${total.toFixed(2)}</p>
        </div>
      </div>
      <button className="button-secondary" onClick={onReset} style={{ marginTop: '1rem', width: 'fit-content' }}>
        Continue shopping
      </button>
    </section>
  );
}
