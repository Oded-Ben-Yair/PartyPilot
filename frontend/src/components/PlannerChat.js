import React, { useState } from 'react';
import ChatBox from './ChatBox';
import InputBar from './InputBar';
import useChat from '../hooks/useChat';

function PlannerChat() {
  const { messages, loading, sendMessage, requestInvitation, stopGeneration } = useChat();
  const [showWelcome, setShowWelcome] = useState(true);
  const [error, setError] = useState(null);

  const handleChatOption = () => {
    setShowWelcome(false);
    sendMessage({ content: "Let's chat about my party!" }); // Start chat
  };

  const handleQuickFormOption = () => {
    setShowWelcome(false);
    sendMessage({ content: "I'm in a rush, let's get started quickly!" }); // Start quick planning
  };

  const handleGenerateInvitation = async () => {
    try {
      await requestInvitation();
    } catch (err) {
      setError("I'm sorry, I couldn't generate the invitation at this time. Would you like to try again or proceed with the current plan?");
    }
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
            <button onClick={handleChatOption} style={{ padding: '0.5rem 1rem', fontSize: '1rem', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Let's Chat
            </button>
            <button onClick={handleQuickFormOption} style={{ padding: '0.5rem 1rem', fontSize: '1rem', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              I'm in a Rush
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '80vh', maxWidth: '900px', margin: '0 auto' }}>
      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <ChatBox messages={messages} loading={loading} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', gap: '0.5rem', flexWrap: 'wrap' }}>
        <div style={{ flex: '1', minWidth: '200px' }}>
          <InputBar onSend={sendMessage} />
        </div>
        {loading ? (
          <button onClick={stopGeneration} style={{ padding: '0.5rem 1rem', fontSize: '1rem', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Stop Generating
          </button>
        ) : (
          <button onClick={handleGenerateInvitation} style={{ padding: '0.5rem 1rem', fontSize: '1rem', backgroundColor: '#ffc107', color: 'black', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Generate Invitation
          </button>
        )}
      </div>
    </div>
  );
}

export default PlannerChat;