'use client';

import { useEffect } from 'react';
import { ENV } from '@/src/utils';

export function MSWInit() {
  useEffect(() => {
    const initMSW = async () => {
      if (
        ENV.NEXT_PUBLIC_API_MOCKING !== 'enabled'
        || typeof window === 'undefined'
      ) {
        return;
      }

      const { worker } = await import('@/src/mocks/browser');
      worker.start({ onUnhandledRequest: 'bypass' });
    };

    initMSW();
  }, []);

  return null;
}
