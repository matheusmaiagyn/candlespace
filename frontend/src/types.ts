export type CandleCategory =
  | 'Scented'
  | 'Unscented'
  | 'Seasonal'
  | 'Gift Sets'
  | 'Wellness';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  size: string;
  burnTimeHours: number;
  fragranceNotes: string[];
  category: CandleCategory;
  image: string;
  isNew?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Customer {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
}

export interface CheckoutPayload {
  customer: Customer;
  items: { productId: string; quantity: number }[];
  notes?: string;
}
