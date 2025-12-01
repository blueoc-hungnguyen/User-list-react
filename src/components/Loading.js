import React from 'react';

export default function Loading({ text = 'Loading...' }) {
  return <div style={{ padding: '8px 0', color: '#444' }}>{text}</div>;
}
