// Container component for the PartyPilot chat interface.
// Utilizes the custom hook useChat for state management and API integration.
import React from 'react';
import ChatBox from './ChatBox';
import InputBar from './InputBar';
import useChat from '../hooks/useChat';

function PlannerChat() {
  // Destructure state and functions from useChat
  const { messages, loading, sendMessage, requestInvitation } = useChat();

  return (
    <div style={{ padding: '1rem', maxWidth: '900px', margin: '0 auto' }}>
      <ChatBox messages={messages} loading={loading} />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
        <InputBar onSend={sendMessage} />
        <button 
          onClick={requestInvitation} 
          disabled={loading}
          style={{ marginLeft: '1rem', padding: '0.5rem 1rem', cursor: 'pointer' }}
        >
          Generate Invitation
        </button>
      </div>
    </div>
  );
}

export default PlannerChat;

