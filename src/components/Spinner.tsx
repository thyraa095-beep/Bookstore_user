import React from 'react';

interface SpinnerProps {
  size?: 'md' | 'lg';
}

export default function Spinner({ size = 'md' }: SpinnerProps) {
  const cls = size === 'lg' ? 'h-12 w-12 border-4' : 'h-8 w-8 border-[3px]';
  return (
    <div className="flex items-center justify-center py-16">
      <div className={`${cls} rounded-full border-indigo-600 border-t-transparent animate-spin`} />
    </div>
  );
}
