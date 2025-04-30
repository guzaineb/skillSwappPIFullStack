import React from 'react';

export function Card({ children, className = '' }) {
  return <div className={`bg-white shadow rounded-xl p-6 ${className}`}>{children}</div>;
}

export function CardHeader({ children }) {
  return <div className="mb-4">{children}</div>;
}

export function CardTitle({ children }) {
  return <h2 className="text-2xl font-bold">{children}</h2>;
}

export function CardDescription({ children }) {
  return <p className="text-gray-500">{children}</p>;
}

export function CardContent({ children }) {
  return <div className="mb-4">{children}</div>;
}

export function CardFooter({ children }) {
  return <div className="mt-4">{children}</div>;
}
