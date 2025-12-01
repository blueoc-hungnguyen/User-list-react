import React from 'react';

export default function ErrorMessage({ message }) {
  if (!message) return null;
  return <div style={{ color: '#b00020', padding: '8px 0' }}>{message}</div>;
}
