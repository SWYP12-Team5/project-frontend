import { http, HttpResponse } from 'msw';
import { mockAuthToken, mockUsers } from '@/mocks/fixtures';

export const authHandlers = [
  // 로그인
  http.post('/api/auth/login', async ({ request }) => {
    const body = await request.json() as { email: string; password: string };

    // 성공 케이스
    if (body.email === 'test@example.com' && body.password === 'password123') {
      return HttpResponse.json({
        user: mockUsers.valid,
        ...mockAuthToken,
      });
    }

    // 실패 케이스
    return HttpResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 },
    );
  }),

  // 로그아웃
  http.post('/api/auth/logout', () => {
    return HttpResponse.json({ message: 'Logged out successfully' });
  }),

  // 현재 사용자 정보
  http.get('/api/auth/me', ({ request }) => {
    const authHeader = request.headers.get('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return HttpResponse.json(
        { error: 'Unauthorized' },
        { status: 401 },
      );
    }

    return HttpResponse.json({ user: mockUsers.valid });
  }),

  // 회원가입
  http.post('/api/auth/register', async ({ request }) => {
    const body = await request.json() as {
      email: string;
      password: string;
      name: string;
    };

    return HttpResponse.json({
      user: {
        id: 999,
        email: body.email,
        name: body.name,
        role: 'user',
      },
      ...mockAuthToken,
    }, { status: 201 });
  }),
];
