import React from 'react';
import { Navigation } from './components/Navigation';
import { Router } from './components/Router';

function App() {
  return (
    <div className="flex min-h-screen py-10 px-20 gap-10">
      <Navigation />
      <Router />
    </div>
  );
}

export default App;
