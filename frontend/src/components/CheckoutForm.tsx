import { useState } from 'react';
import { Customer } from '../types';

interface Props {
  onSubmit: (customer: Customer, notes?: string) => void;
  disabled?: boolean;
}

const emptyCustomer: Customer = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  postalCode: '',
};

export function CheckoutForm({ onSubmit, disabled }: Props) {
  const [customer, setCustomer] = useState<Customer>(emptyCustomer);
  const [notes, setNotes] = useState('');

  const handleChange = (field: keyof Customer, value: string) => {
    setCustomer((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(customer, notes);
  };

  return (
    <form onSubmit={handleSubmit} className="card" style={{ padding: '1.5rem', display: 'grid', gap: '1rem' }}>
      <div className="section-header">
        <div>
          <h3>Checkout</h3>
          <p style={{ margin: 0, color: '#5f5f5f' }}>Share your details for a warm delivery experience.</p>
        </div>
        <span className="badge">Secure</span>
      </div>
      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        <label style={{ display: 'grid', gap: 6 }}>
          First Name
          <input
            required
            value={customer.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
            style={{ padding: '0.75rem', borderRadius: 10, border: '1px solid #d8c9ba' }}
          />
        </label>
        <label style={{ display: 'grid', gap: 6 }}>
          Last Name
          <input
            required
            value={customer.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
            style={{ padding: '0.75rem', borderRadius: 10, border: '1px solid #d8c9ba' }}
          />
        </label>
        <label style={{ display: 'grid', gap: 6 }}>
          Email
          <input
            type="email"
            required
            value={customer.email}
            onChange={(e) => handleChange('email', e.target.value)}
            style={{ padding: '0.75rem', borderRadius: 10, border: '1px solid #d8c9ba' }}
          />
        </label>
        <label style={{ display: 'grid', gap: 6 }}>
          Phone
          <input
            type="tel"
            value={customer.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            style={{ padding: '0.75rem', borderRadius: 10, border: '1px solid #d8c9ba' }}
          />
        </label>
      </div>
      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        <label style={{ display: 'grid', gap: 6 }}>
          Address
          <input
            required
            value={customer.address}
            onChange={(e) => handleChange('address', e.target.value)}
            style={{ padding: '0.75rem', borderRadius: 10, border: '1px solid #d8c9ba' }}
          />
        </label>
        <label style={{ display: 'grid', gap: 6 }}>
          City
          <input
            required
            value={customer.city}
            onChange={(e) => handleChange('city', e.target.value)}
            style={{ padding: '0.75rem', borderRadius: 10, border: '1px solid #d8c9ba' }}
          />
        </label>
        <label style={{ display: 'grid', gap: 6 }}>
          State/Province
          <input
            required
            value={customer.state}
            onChange={(e) => handleChange('state', e.target.value)}
            style={{ padding: '0.75rem', borderRadius: 10, border: '1px solid #d8c9ba' }}
          />
        </label>
        <label style={{ display: 'grid', gap: 6 }}>
          Postal Code
          <input
            required
            value={customer.postalCode}
            onChange={(e) => handleChange('postalCode', e.target.value)}
            style={{ padding: '0.75rem', borderRadius: 10, border: '1px solid #d8c9ba' }}
          />
        </label>
      </div>
      <label style={{ display: 'grid', gap: 6 }}>
        Gift Note (optional)
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          style={{ padding: '0.75rem', borderRadius: 12, border: '1px solid #d8c9ba', resize: 'vertical' }}
        />
      </label>
      <button type="submit" className="button-primary" disabled={disabled}>
        {disabled ? 'Placing order...' : 'Place order'}
      </button>
    </form>
  );
}
