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
    <form onSubmit={handleSubmit} style={{ marginTop: '1rem', display: 'flex' }}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ flex: 1, padding: '8px' }}
        placeholder="Type your message..."
      />
      <button type="submit" style={{ padding: '8px 16px' }}>Send</button>
    </form>
  );
}

export default InputBar;
