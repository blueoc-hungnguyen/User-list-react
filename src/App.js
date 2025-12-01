import React from 'react';
import HomePage from './pages/HomePage';
import './App.css';

export default function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>User list</h1>
      </header>
      <main>
        <HomePage />
      </main>
      <footer className="app-footer">
        <small>Built with JSONPlaceholder API</small>
      </footer>
    </div>
  );
}
