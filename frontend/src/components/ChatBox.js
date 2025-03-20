// Displays the list of chat messages with auto-scroll functionality.
import React, { useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';

function ChatBox({ messages }) {
  const containerRef = useRef(null);

  // Auto-scroll to the bottom whenever messages change
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div 
      ref={containerRef} 
      style={{ height: '60vh', overflowY: 'auto', border: '1px solid #ccc', padding: '1rem' }}
    >
      {messages.map((msg, index) => (
        <ChatMessage key={index} message={msg} />
      ))}
    </div>
  );
}

export default ChatBox;
