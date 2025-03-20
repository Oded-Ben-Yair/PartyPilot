import { useState, useCallback, useEffect, useRef } from 'react';
import { sendChatMessage, fetchInvitation } from '../apiService';

export default function useChat() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error] = useState(null);
  const [controller, setController] = useState(null);
  const greetingAddedRef = useRef(false);

  const addMessage = useCallback((message) => {
    setMessages((prev) => [...prev, message]);
  }, []);

  useEffect(() => {
    if (!greetingAddedRef.current && messages.length === 0) {
      greetingAddedRef.current = true;
      addMessage({
        role: 'assistant',
        type: 'text',
        content: "Hello! I'm your PartyPilot. How can I help plan your birthday today?"
      });
    }
  }, [messages, addMessage]);

  const isInvitationRequest = useCallback((content) => {
    if (!content) return false;
    const text = content.toLowerCase().trim();
    const invitationPhrases = [
      'invitation', 'invite', 'digital card', 'send invite', 
      'make invitation', 'create invite', 'design invitation'
    ];
    return invitationPhrases.some(phrase => text.includes(phrase));
  }, []);

  const processMessage = useCallback(async (newMessage, existingMessages) => {
    const userMessage = { role: 'user', type: 'text', ...newMessage };
    const newController = new AbortController();
    
    setController(newController);
    setLoading(true);
    addMessage(userMessage);

    try {
      // Check if it's an invitation request
      const isInvitation = isInvitationRequest(userMessage.content);
      
      const apiMethod = isInvitation ? fetchInvitation : sendChatMessage;
      const response = await apiMethod([...existingMessages, userMessage], newController.signal);

      if (response.aborted) {
        addMessage({ 
          role: 'assistant', 
          type: 'text', 
          content: 'Generation stopped.' 
        });
        return;
      }

      addMessage({ 
        role: 'assistant', 
        ...response 
      });
    } catch (err) {
      console.error('Message sending error:', err);
      addMessage({ 
        role: 'assistant', 
        type: 'text', 
        content: 'Sorry, something went wrong. Please try again.' 
      });
    } finally {
      setLoading(false);
      setController(null);
    }
  }, [addMessage, isInvitationRequest]);

  const sendMessage = useCallback((newMessage) => {
    processMessage(newMessage, messages);
  }, [messages, processMessage]);

  const handleInitialPathSelection = useCallback((path) => {
    const message = path === 'quick' 
      ? { content: "I'm in a rush. Please give me a quick form to get 3 birthday party options." }
      : { content: "Let's chat about planning my birthday party in detail." };
    
    sendMessage(message);
  }, [sendMessage]);

  const stopGeneration = useCallback(() => {
    if (controller) controller.abort();
  }, [controller]);

  return { 
    messages, 
    loading, 
    error, 
    sendMessage, 
    addMessage, 
    handleInitialPathSelection,
    stopGeneration 
  };
}
