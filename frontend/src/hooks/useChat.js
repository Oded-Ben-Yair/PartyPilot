// Custom hook to manage chat state and API interactions.
import { useState, useCallback } from 'react';
import { sendChatMessage, fetchInvitation } from '../apiService';

export default function useChat() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Adds a new message to the conversation.
  const addMessage = useCallback((message) => {
    setMessages((prev) => [...prev, message]);
  }, []);

  // Sends a new message to the chat API and updates the conversation.
  const sendMessage = useCallback(async (newMessage) => {
    try {
      setLoading(true);
      addMessage(newMessage); // Add the user message
      const response = await sendChatMessage([...messages, newMessage]);
      // Assuming the API returns a response object with either a 'response' property or structured data.
      const reply = response.response || JSON.stringify(response);
      addMessage({ type: 'text', content: reply });
    } catch (err) {
      console.error('[useChat] Error sending message:', err);
      setError(err.message);
      addMessage({ type: 'text', content: 'Error: Could not send message.' });
    } finally {
      setLoading(false);
    }
  }, [messages, addMessage]);

  // Requests a digital invitation based on the current conversation.
  const requestInvitation = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetchInvitation(messages);
      // Append invitation text and image to the conversation.
      addMessage({ type: 'text', content: response.invitationText });
      addMessage({ type: 'image', content: response.imageUrl });
    } catch (err) {
      console.error('[useChat] Error generating invitation:', err);
      setError(err.message);
      addMessage({ type: 'text', content: 'Error: Could not generate invitation.' });
    } finally {
      setLoading(false);
    }
  }, [messages, addMessage]);

  return {
    messages,
    loading,
    error,
    sendMessage,
    addMessage,
    requestInvitation,
  };
}
