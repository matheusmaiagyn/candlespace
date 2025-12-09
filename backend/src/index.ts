import express, { Request, Response } from 'express';
import cors from 'cors';
import { products } from './data/products';
import { CheckoutRequest, OrderSummary } from './types';

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'CandleSpace API is glowing.' });
});

app.get('/api/products', (_req: Request, res: Response) => {
  res.json(products);
});

app.post('/api/checkout', (req: Request, res: Response) => {
  const payload: CheckoutRequest = req.body;

  if (!payload?.customer || !payload?.items || payload.items.length === 0) {
    return res.status(400).json({ message: 'Customer info and at least one item are required.' });
  }

  const itemCount = payload.items.reduce((sum, item) => sum + item.quantity, 0);
  const total = payload.items.reduce((sum, item) => {
    const product = products.find((p) => p.id === item.productId);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);

  const orderSummary: OrderSummary = {
    orderId: `ORD-${Math.floor(Math.random() * 900000 + 100000)}`,
    total,
    itemCount,
    estimatedDelivery: '5-7 business days',
  };

  res.status(201).json({
    message: 'Order received. Thank you for shopping with CandleSpace!',
    order: orderSummary,
    customer: payload.customer,
  });
});

app.use((req: Request, res: Response) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found.` });
});

app.listen(port, () => {
  console.log(`CandleSpace API listening on port ${port}`);
});
