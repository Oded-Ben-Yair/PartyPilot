// Renders the input field and handles sending messages.
import React, { useState } from 'react';

function InputBar({ onSend }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    // Send a text message
    onSend({ type: 'text', content: input });
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ 
      display: 'flex',
      width: '100%' 
    }}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ 
          flex: '1', 
          padding: '10px 12px',
          fontSize: '1rem',
          borderRadius: '4px 0 0 4px',
          border: '1px solid #ccc',
          borderRight: 'none',
          outline: 'none'
        }}
        placeholder="Type your message..."
      />
      <button 
        type="submit" 
        style={{ 
          padding: '10px 20px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '0 4px 4px 0',
          fontSize: '1rem',
          cursor: 'pointer'
        }}
      >
        Send
      </button>
    </form>
  );
}

export default InputBar;