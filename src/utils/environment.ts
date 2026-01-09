import { createEnv } from '@t3-oss/env-nextjs';
import * as z from 'zod';

export const ENV = createEnv({
  server: {},
  client: {
    NEXT_PUBLIC_API_URL: z.url(),
    NEXT_PUBLIC_API_MOCKING: z.enum(['enabled', 'disabled']),
  },
  runtimeEnv: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_API_MOCKING: process.env.NEXT_PUBLIC_API_MOCKING,
  },
});
