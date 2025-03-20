import { useState, useCallback, useEffect, useRef } from 'react';
import { sendChatMessage, fetchInvitation } from '../apiService';

export default function useChat() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [controller, setController] = useState(null);
  const greetingAddedRef = useRef(false);

  // Add message to chat history
  const addMessage = useCallback((message) => {
    setMessages((prev) => [...prev, message]);
  }, []);

  // Initial greeting
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

  // Handle user selection from welcome screen
  const handleInitialPathSelection = useCallback((path) => {
    const message = path === 'quick' 
      ? { content: "I'm in a rush. Please give me a quick form to get 3 birthday party options." }
      : { content: "Let's chat about planning my birthday party in detail." };
    
    sendMessage(message);
  }, []);

  // Check if message requests an invitation
  const isInvitationRequest = (content) => {
    const text = content.toLowerCase();
    const invitationKeywords = ['invitation', 'invite', 'card'];
    const actionVerbs = ['create', 'make', 'generate', 'send', 'design'];
    
    return actionVerbs.some(verb => 
      invitationKeywords.some(keyword => text.includes(`${verb} ${keyword}`))
    );
  };

  // Format plans for display
  const formatPlans = (plans) => {
    if (!Array.isArray(plans) || plans.length === 0) return null;
    
    // Return the original plans object to be handled by PlanMessage component
    return { role: 'assistant', type: 'plans', content: plans };
  };

  // Send message to API
  const sendMessage = useCallback(async (newMessage) => {
    const userMessage = { role: 'user', type: 'text', ...newMessage };
    const newController = new AbortController();
    setController(newController);
    setLoading(true);
    addMessage(userMessage);

    // Check if message is asking for invitation
    if (isInvitationRequest(userMessage.content)) {
      try {
        const response = await fetchInvitation(messages.concat(userMessage), newController.signal);
        if (response.aborted) {
          addMessage({ role: 'assistant', type: 'text', content: 'Invitation generation stopped.' });
          return;
        }
        
        // Add invitation message
        addMessage({ 
          role: 'assistant', 
          type: 'invitation', 
          content: {
            text: response.invitationText,
            imageUrl: response.imageUrl
          }
        });
      } catch (err) {
        handleError(err, 'invitation');
      } finally {
        setLoading(false);
        setController(null);
      }
      return;
    }

    // Regular chat message
    try {
      const response = await sendChatMessage([...messages, userMessage], newController.signal);
      if (response.aborted) {
        addMessage({ role: 'assistant', type: 'text', content: 'Generation stopped.' });
        return;
      }
      
      // Handle plans if received
      if (response.plans && Array.isArray(response.plans)) {
        const formattedPlans = formatPlans(response.plans);
        if (formattedPlans) {
          addMessage(formattedPlans);
        } else {
          addMessage({ role: 'assistant', type: 'text', content: response.response || JSON.stringify(response) });
        }
      } else {
        addMessage({ role: 'assistant', type: 'text', content: response.response || JSON.stringify(response) });
      }
    } catch (err) {
      handleError(err, 'message');
    } finally {
      setLoading(false);
      setController(null);
    }
  }, [messages, addMessage]);

  // Handle errors consistently
  const handleError = (err, type = 'message') => {
    if (err.name === 'AbortError') {
      addMessage({ role: 'assistant', type: 'text', content: `Generation stopped.` });
    } else {
      console.error(`[useChat] Error with ${type}:`, err);
      setError(err.message);
      addMessage({ 
        role: 'assistant', 
        type: 'text', 
        content: `Sorry, I couldn't ${type === 'invitation' ? 'create your invitation' : 'process your message'}. Please try again.` 
      });
    }
  };

  // Cancel ongoing generation
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