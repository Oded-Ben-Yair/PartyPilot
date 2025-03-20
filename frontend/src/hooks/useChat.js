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

  const sendMessage = useCallback(async (newMessage) => {
    const userMessage = { role: 'user', ...newMessage };
    const newController = new AbortController();
    setController(newController);
    setLoading(true);
    addMessage(userMessage);
    try {
      const response = await sendChatMessage([...messages, userMessage], newController.signal);
      if (response.aborted) return addMessage({ role: 'assistant', type: 'text', content: 'Generation stopped.' });
      if (response.plans) {
        const plansText = response.plans.map((plan, i) => 
          `**Plan ${i + 1}: ${plan.concept}**\n- Theme: ${plan.theme}\n- Venue: ${plan.venue}\n- Activities: ${plan.activities.map(a => `${a.time} - ${a.activity}`).join(', ')}\n- Catering: ${plan.catering}\n- Guest Experience: ${plan.guestExperience}\n- Budget: ${plan.budget}`
        ).join('\n\n');
        addMessage({ role: 'assistant', type: 'text', content: plansText });
      } else {
        addMessage({ role: 'assistant', type: 'text', content: response.response || JSON.stringify(response) });
      }
    } catch (err) {
      if (err.name === 'AbortError') addMessage({ role: 'assistant', type: 'text', content: 'Generation stopped.' });
      else {
        console.error('[useChat] Error:', err);
        setError(err.message);
        addMessage({ role: 'assistant', type: 'text', content: 'Error: Could not send message.' });
      }
    } finally {
      setLoading(false);
      setController(null);
    }
  }, [messages, addMessage]);

  const requestInvitation = useCallback(async () => {
    const newController = new AbortController();
    setController(newController);
    setLoading(true);
    try {
      const response = await fetchInvitation(messages, newController.signal);
      if (response.aborted) return addMessage({ role: 'assistant', type: 'text', content: 'Invitation generation stopped.' });
      addMessage({ role: 'assistant', type: 'text', content: response.invitationText });
      if (response.imageUrl && response.imageUrl !== "") addMessage({ role: 'assistant', type: 'image', content: response.imageUrl });
    } catch (err) {
      if (err.name === 'AbortError') addMessage({ role: 'assistant', type: 'text', content: 'Invitation generation stopped.' });
      else {
        console.error('[useChat] Error:', err);
        setError(err.message);
        addMessage({ role: 'assistant', type: 'text', content: 'Error: Could not generate invitation.' });
      }
    } finally {
      setLoading(false);
      setController(null);
    }
  }, [messages, addMessage]);

  const stopGeneration = useCallback(() => {
    if (controller) controller.abort();
  }, [controller]);

  return { messages, loading, error, sendMessage, addMessage, requestInvitation, stopGeneration };
}