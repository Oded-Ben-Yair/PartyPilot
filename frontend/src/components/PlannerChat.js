import React, { useState } from 'react';
import ChatBox from './ChatBox';
import InputBar from './InputBar';
import useChat from '../hooks/useChat';

function PlannerChat() {
  const { messages, loading, sendMessage, stopGeneration, handleInitialPathSelection } = useChat();
  const [showWelcome, setShowWelcome] = useState(true);

  const handleChatOption = () => {
    setShowWelcome(false);
    handleInitialPathSelection('chat');
  };

  const handleQuickFormOption = () => {
    setShowWelcome(false);
    handleInitialPathSelection('quick');
  };

  if (showWelcome) {
    return (
      <div style={{ padding: '1rem', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ 
          textAlign: 'center', 
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          marginTop: '2rem'
        }}>
          <h2 style={{ marginBottom: '1.5rem', color: '#333' }}>Welcome to PartyPilot!</h2>
          <p style={{ marginBottom: '2rem', color: '#666' }}>
            How would you like to plan your birthday party?
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button 
              onClick={handleChatOption} 
              style={{ 
                padding: '0.5rem 1rem', 
                fontSize: '1rem', 
                backgroundColor: '#007bff', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px', 
                cursor: 'pointer' 
              }}
            >
              Let's Chat
            </button>
            <button 
              onClick={handleQuickFormOption} 
              style={{ 
                padding: '0.5rem 1rem', 
                fontSize: '1rem', 
                backgroundColor: '#28a745', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px', 
                cursor: 'pointer' 
              }}
            >
              I'm in a Rush
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        height: '80vh', 
        maxWidth: '900px', 
        margin: '0 auto' 
      }}
    >
      {/* Chat Messages */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <ChatBox messages={messages} loading={loading} />
      </div>

      {/* Input Bar */}
      <div style={{ marginTop: '1rem' }}>
        <InputBar 
          onSend={sendMessage} 
          disabled={loading} 
          onStop={stopGeneration} 
        />
      </div>
    </div>
  );
}

export default PlannerChat;

