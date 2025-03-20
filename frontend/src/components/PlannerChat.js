// Container component for the PartyPilot chat interface.
import React, { useState } from 'react';
import ChatBox from './ChatBox';
import InputBar from './InputBar';
import useChat from '../hooks/useChat';

function PlannerChat() {
  const { messages, loading, sendMessage, requestInvitation } = useChat();
  const [showWelcome, setShowWelcome] = useState(messages.length <= 1);
  
  const handleChatOption = () => {
    setShowWelcome(false);
    sendMessage({
      type: 'text',
      content: "Let's chat"
    });
  };
  
  const handleQuickFormOption = () => {
    setShowWelcome(false);
    sendMessage({
      type: 'text',
      content: "rush"
    });
  };

  // Show welcome screen with options if this is the first message
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
          <h2 style={{ marginBottom: '1.5rem', color: '#333' }}>
            Welcome to PartyPilot!
          </h2>
          <p style={{ marginBottom: '2rem', color: '#666' }}>
            How would you like to plan your birthday party?
          </p>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button 
              onClick={handleChatOption}
              style={{
                padding: '1rem 2rem',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '1rem',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Let's Chat
            </button>
            <button 
              onClick={handleQuickFormOption}
              style={{
                padding: '1rem 2rem',
                backgroundColor: '#2196F3',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '1rem',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              I'm in a Rush
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  // Regular chat interface
  return (
    <div style={{ padding: '1rem', maxWidth: '900px', margin: '0 auto' }}>
      <ChatBox messages={messages} loading={loading} />
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        marginTop: '1rem',
        gap: '0.5rem',
        flexWrap: 'wrap'
      }}>
        <div style={{ flex: '1', minWidth: '200px' }}>
          <InputBar onSend={sendMessage} />
        </div>
        
        <button 
          onClick={requestInvitation} 
          disabled={loading}
          style={{ 
            padding: '0.5rem 1rem', 
            backgroundColor: '#ff9800',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '0.9rem',
            cursor: 'pointer',
            fontWeight: 'bold',
            whiteSpace: 'nowrap'
          }}
        >
          Generate Invitation
        </button>
      </div>
    </div>
  );
}

export default PlannerChat;