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

export interface CustomerDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface CheckoutRequest {
  customer: CustomerDetails;
  items: CartItem[];
  notes?: string;
}

export interface OrderSummary {
  orderId: string;
  total: number;
  itemCount: number;
  estimatedDelivery: string;
}
