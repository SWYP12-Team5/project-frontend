import { http, HttpResponse } from 'msw';
import { mockOrders } from '@/src/mocks/fixtures';

export const orderHandlers = [
  // 주문 목록
  http.get('/api/orders', ({ request }) => {
    const authHeader = request.headers.get('Authorization');

    if (!authHeader) {
      return HttpResponse.json(
        { error: 'Unauthorized' },
        { status: 401 },
      );
    }

    return HttpResponse.json({
      orders: mockOrders,
      total: mockOrders.length,
    });
  }),

  // 주문 생성
  http.post('/api/orders', async ({ request }) => {
    const authHeader = request.headers.get('Authorization');

    if (!authHeader) {
      return HttpResponse.json(
        { error: 'Unauthorized' },
        { status: 401 },
      );
    }

    const body = await request.json() as {
      products: Array<{ id: number; quantity: number }>;
    };

    return HttpResponse.json({
      order: {
        id: 999,
        userId: 1,
        products: body.products,
        totalPrice: 50000,
        status: 'pending',
        createdAt: new Date().toISOString(),
      },
    }, { status: 201 });
  }),

  // 주문 상세
  http.get('/api/orders/:id', ({ params }) => {
    const { id } = params;
    const order = mockOrders.find(o => o.id === Number(id));

    if (!order) {
      return HttpResponse.json(
        { error: 'Order not found' },
        { status: 404 },
      );
    }

    return HttpResponse.json({ order });
  }),
];
