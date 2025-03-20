// Container component for the PartyPilot chat interface.
// Utilizes the custom hook useChat for state management and API integration.
import React from 'react';
import ChatBox from './ChatBox';
import InputBar from './InputBar';
import useChat from '../hooks/useChat';

function PlannerChat() {
  // Destructure state and functions from useChat
  const { messages, loading, sendMessage } = useChat();

  return (
    <div>
      <ChatBox messages={messages} loading={loading} />
      <InputBar onSend={sendMessage} />
    </div>
  );
}

export default PlannerChat;
