// useChat.js
// Custom hook to manage chat state and API interactions.
// Ensures all messages include a role (required by OpenAI API) and adds an initial greeting.
import { useState, useCallback, useEffect } from 'react';
import { sendChatMessage, fetchInvitation } from '../apiService';

export default function useChat() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Adds a new message to the conversation.
  const addMessage = useCallback((message) => {
    setMessages((prev) => [...prev, message]);
  }, []);

  // Add an initial greeting message on mount.
  useEffect(() => {
    addMessage({ role: 'assistant', type: 'text', content: 'Hello! I’m your PartyPilot. How can I help plan your birthday today?' });
  }, [addMessage]);

  // Sends a new message to the chat API and updates the conversation.
  const sendMessage = useCallback(async (newMessage) => {
    // Ensure the new message has a role of 'user'
    const userMessage = { role: 'user', ...newMessage };
    try {
      setLoading(true);
      addMessage(userMessage); // Add the user message
      const response = await sendChatMessage([...messages, userMessage]);
      // Parse the response from the API.
      const replyContent = response.response || JSON.stringify(response);
      // Add the assistant response with a proper role.
      addMessage({ role: 'assistant', type: 'text', content: replyContent });
    } catch (err) {
      console.error('[useChat] Error sending message:', err);
      setError(err.message);
      addMessage({ role: 'assistant', type: 'text', content: 'Error: Could not send message.' });
    } finally {
      setLoading(false);
    }
  }, [messages, addMessage]);

  // Requests a digital invitation based on the current conversation.
  const requestInvitation = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetchInvitation(messages);
      // Append invitation text and image with proper roles.
      addMessage({ role: 'assistant', type: 'text', content: response.invitationText });
      addMessage({ role: 'assistant', type: 'image', content: response.imageUrl });
    } catch (err) {
      console.error('[useChat] Error generating invitation:', err);
      setError(err.message);
      addMessage({ role: 'assistant', type: 'text', content: 'Error: Could not generate invitation.' });
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
