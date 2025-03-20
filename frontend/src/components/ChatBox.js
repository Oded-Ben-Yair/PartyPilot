// ChatBox.js
// Displays the list of chat messages with auto-scroll functionality.
// Updated styling for improved responsiveness and UX.
import React, { useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';

function ChatBox({ messages }) {
  const containerRef = useRef(null);

  // Auto-scroll to the bottom whenever messages change.
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div 
      ref={containerRef} 
      style={{ 
        height: '80vh', 
        maxWidth: '800px', 
        margin: '0 auto', 
        overflowY: 'auto', 
        border: '1px solid #ccc', 
        padding: '1rem',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' 
      }}
    >
      {messages.map((msg, index) => (
        <ChatMessage key={index} message={msg} />
      ))}
    </div>
  );
}

export default ChatBox;
