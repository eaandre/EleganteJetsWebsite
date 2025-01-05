"use client"

import React from 'react'

interface ErrorFallbackProps {
  error: Error | null;
  resetErrorBoundary: () => void;
}

export const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetErrorBoundary }) => (
  <div role="alert" className="p-4 bg-red-100 text-red-700 rounded-md">
    <p className="font-bold">Something went wrong:</p>
    {error && <pre className="mt-2 text-sm">{error.message}</pre>}
    <button
      onClick={resetErrorBoundary}
      className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
    >
      Try again
    </button>
  </div>
);

