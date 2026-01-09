export const mockOrders = [
  {
    id: 1,
    userId: 1,
    products: [
      { id: 1, name: '치킨', quantity: 1, price: 18000 },
    ],
    totalPrice: 18000,
    status: 'pending',
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 2,
    userId: 1,
    products: [
      { id: 2, name: '피자', quantity: 2, price: 40000 },
    ],
    totalPrice: 40000,
    status: 'completed',
    createdAt: '2024-01-02T00:00:00Z',
  },
];
