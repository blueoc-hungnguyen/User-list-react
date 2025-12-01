import React from 'react';

export default function SearchBox({ value, onChange, placeholder = 'Find user...' }) {
  return (
    <input
      className="search-input"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      aria-label="Find user"
    />
  );
}
