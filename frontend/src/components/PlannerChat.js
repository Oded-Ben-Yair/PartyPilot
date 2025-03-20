// Container component for the PartyPilot chat interface.
// It combines the ChatBox and InputBar components.
import React, { useState } from 'react';
import ChatBox from './ChatBox';
import InputBar from './InputBar';

function PlannerChat() {
  // messages: an array of message objects { type: string, content: string or object }
  const [messages, setMessages] = useState([]);

  // Adds a new message to the conversation
  const addMessage = (message) => {
    setMessages(prev => [...prev, message]);
  };

  return (
    <div>
      <ChatBox messages={messages} />
      <InputBar onSend={addMessage} />
    </div>
  );
}

export default PlannerChat;
