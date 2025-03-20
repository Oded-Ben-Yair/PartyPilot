import { useState, useCallback, useEffect, useRef } from 'react';
import { sendChatMessage, fetchInvitation } from '../apiService';

export default function useChat() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
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

  const handleInitialPathSelection = useCallback((path) => {
    const message = path === 'quick' 
      ? { content: "I'm in a rush. Please give me a quick form to get 3 birthday party options." }
      : { content: "Let's chat about planning my birthday party in detail." };
    
    sendMessage(message);
  }, []);

  // Enhanced invitation detection with more patterns
  const isInvitationRequest = (content) => {
    if (!content) return false;
    const text = content.toLowerCase().trim();
    
    // Direct patterns
    if (text.includes("invitation pls") || 
        text.includes("send invitation") || 
        text.includes("send me the invitation") ||
        text.includes("generate invitation") ||
        text.includes("make invitation") ||
        text.includes("create invitation")) {
      return true;
    }
    
    // More generic pattern matching
    const invitationWords = ['invitation', 'invite', 'card'];
    const actionVerbs = ['create', 'make', 'generate', 'send', 'design', 'get'];
    
    return actionVerbs.some(verb => 
      invitationWords.some(keyword => 
        text.includes(`${verb} ${keyword}`) || 
        text.includes(`${keyword} ${verb}`) ||
        (text.includes(keyword) && text.includes("pls"))
      )
    );
  };

  const formatPlans = (plans) => {
    if (!Array.isArray(plans) || plans.length === 0) return null;
    return { role: 'assistant', type: 'plans', content: plans };
  };

  const sendMessage = useCallback(async (newMessage) => {
    const userMessage = { role: 'user', type: 'text', ...newMessage };
    const newController = new AbortController();
    setController(newController);
    setLoading(true);
    addMessage(userMessage);

    // Handle invitation requests
    if (isInvitationRequest(userMessage.content)) {
      try {
        console.log("[useChat] Invitation request detected");
        const response = await fetchInvitation([...messages, userMessage], newController.signal);
        
        if (response.aborted) {
          addMessage({ role: 'assistant', type: 'text', content: 'Invitation generation stopped.' });
          return;
        }
        
        // Enhanced logging
        console.log("[useChat] Invitation response:", response);
        
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

    // Regular messages
    try {
      const response = await sendChatMessage([...messages, userMessage], newController.signal);
      
      if (response.aborted) {
        addMessage({ role: 'assistant', type: 'text', content: 'Generation stopped.' });
        return;
      }
      
      if (response.plans && Array.isArray(response.plans)) {
        addMessage(formatPlans(response.plans));
      } else {
        addMessage({ 
          role: 'assistant', 
          type: 'text', 
          content: response.response || JSON.stringify(response) 
        });
      }
    } catch (err) {
      handleError(err, 'message');
    } finally {
      setLoading(false);
      setController(null);
    }
  }, [messages, addMessage]);

  const handleError = useCallback((err, type = 'message') => {
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
  }, [addMessage]);

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