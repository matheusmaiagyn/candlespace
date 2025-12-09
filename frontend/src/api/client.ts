const baseUrl = import.meta.env.VITE_API_URL || '';

export async function fetchProducts() {
  const response = await fetch(`${baseUrl}/api/products`);
  if (!response.ok) {
    throw new Error('Unable to load products');
  }
  return response.json();
}

export async function submitCheckout(body: unknown) {
  const response = await fetch(`${baseUrl}/api/checkout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || 'Unable to submit order');
  }

  return response.json();
}
