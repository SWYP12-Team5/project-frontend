'use client';

import { useState } from 'react';

export default function TestMSWPage() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const testLogin = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'test@example.com',
          password: 'password123',
        }),
      });
      const data = await res.json();
      setResult({ success: true, data, status: res.status });
    }
    catch (error) {
      setResult({ success: false, error: String(error) });
    }
    finally {
      setLoading(false);
    }
  };

  const testProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setResult({ success: true, data, status: res.status });
    }
    catch (error) {
      setResult({ success: false, error: String(error) });
    }
    finally {
      setLoading(false);
    }
  };

  const testProductSearch = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/products?category=electronics&search=test');
      const data = await res.json();
      setResult({ success: true, data, status: res.status });
    }
    catch (error) {
      setResult({ success: false, error: String(error) });
    }
    finally {
      setLoading(false);
    }
  };

  const testUnauthorized = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/auth/me');
      const data = await res.json();
      setResult({ success: false, data, status: res.status });
    }
    catch (error) {
      setResult({ success: false, error: String(error) });
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl p-8">
      <h1 className="mb-6 text-3xl font-bold">MSW Test Page</h1>

      <div className="mb-8 space-y-4">
        <button
          onClick={testLogin}
          disabled={loading}
          className={`
            rounded bg-blue-500 px-4 py-2 text-white
            hover:bg-blue-600
            disabled:opacity-50
          `}
        >
          Test Login (Success)
        </button>

        <button
          onClick={testProducts}
          disabled={loading}
          className={`
            ml-2 rounded bg-green-500 px-4 py-2 text-white
            hover:bg-green-600
            disabled:opacity-50
          `}
        >
          Test Products List
        </button>

        <button
          onClick={testProductSearch}
          disabled={loading}
          className={`
            ml-2 rounded bg-purple-500 px-4 py-2 text-white
            hover:bg-purple-600
            disabled:opacity-50
          `}
        >
          Test Product Search
        </button>

        <button
          onClick={testUnauthorized}
          disabled={loading}
          className={`
            ml-2 rounded bg-red-500 px-4 py-2 text-white
            hover:bg-red-600
            disabled:opacity-50
          `}
        >
          Test 401 Error
        </button>
      </div>

      {result && (
        <div className="rounded border bg-gray-50 p-4">
          <h2 className="mb-2 font-bold">Result:</h2>
          <pre className="overflow-auto whitespace-pre-wrap">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
