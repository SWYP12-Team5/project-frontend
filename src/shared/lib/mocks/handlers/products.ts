import { http, HttpResponse } from 'msw';
import { mockProducts } from '@/src/shared/lib/mocks/fixtures';

export const productHandlers = [
  // 상품 목록
  http.get('/api/products', ({ request }) => {
    const url = new URL(request.url);
    const category = url.searchParams.get('category');
    const search = url.searchParams.get('search');

    let filtered = [...mockProducts];

    // 카테고리 필터
    if (category) {
      filtered = filtered.filter(p => p.category === category);
    }

    // 검색 필터
    if (search) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    return HttpResponse.json({
      products: filtered,
      total: filtered.length,
    });
  }),

  // 상품 상세
  http.get('/api/products/:id', ({ params }) => {
    const { id } = params;
    const product = mockProducts.find(p => p.id === Number(id));

    if (!product) {
      return HttpResponse.json(
        { error: 'Product not found' },
        { status: 404 },
      );
    }

    return HttpResponse.json({ product });
  }),

  // 상품 생성 (관리자)
  http.post('/api/products', async ({ request }) => {
    const authHeader = request.headers.get('Authorization');

    if (!authHeader) {
      return HttpResponse.json(
        { error: 'Unauthorized' },
        { status: 401 },
      );
    }

    const body = await request.json() as {
      name: string;
      price: number;
      category: string;
    };

    return HttpResponse.json({
      product: {
        id: 999,
        ...body,
        image: '/images/placeholder.jpg',
        description: '',
      },
    }, { status: 201 });
  }),
];
