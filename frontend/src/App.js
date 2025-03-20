import React from 'react';
import './App.css';
import PlannerChat from './components/PlannerChat';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>PartyPilot</h1>
      </header>
      <main className="App-main">
        <PlannerChat />
      </main>
      <footer className="App-footer">
        <p>Powered by AI</p>
      </footer>
    </div>
  );
}

export default App;