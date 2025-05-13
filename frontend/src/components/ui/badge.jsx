// src/components/ui/badge.jsx
import React from 'react';

export function Badge({ children, className = '', variant = 'default' }) {
  const base = variant === 'outline'
    ? 'border border-gray-300 text-gray-700 bg-white'
    : 'bg-blue-100 text-blue-800';

  return (
    <span className={`text-xs font-medium px-2 py-1 rounded ${base} ${className}`}>
      {children}
    </span>
  );
}
