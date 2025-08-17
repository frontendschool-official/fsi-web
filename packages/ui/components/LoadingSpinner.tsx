'use client';

export function LoadingSpinner({ className = '' }: { className?: string }) {
  return (
    <div
      className={`animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-600 ${className}`}
    />
  );
}
