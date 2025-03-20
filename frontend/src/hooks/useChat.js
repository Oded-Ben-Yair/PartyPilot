// Custom hook to manage chat state and API interactions.
// Ensures every message includes a role (required by the OpenAI API)
// and adds an initial greeting only once.
import { useState, useCallback, useEffect, useRef } from 'react';
import { sendChatMessage, fetchInvitation } from '../apiService';

export default function useChat() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // Add a ref to track if the greeting has been added
  const greetingAddedRef = useRef(false);

  // Adds a new message to the conversation.
  const addMessage = useCallback((message) => {
    setMessages((prev) => [...prev, message]);
  }, []);

  // Add an initial greeting message on mount (only once).
  useEffect(() => {
    // Only add welcome message if it hasn't been added yet
    if (!greetingAddedRef.current && messages.length === 0) {
      greetingAddedRef.current = true;
      addMessage({
        role: 'assistant',
        type: 'text',
        content: "Hello! I'm your PartyPilot. How can I help plan your birthday today?"
      });
    }
  }, []); // empty dependency array ensures it runs only once

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
      // Add the assistant response with the proper role.
      addMessage({
        role: 'assistant',
        type: 'text',
        content: replyContent
      });
    } catch (err) {
      console.error('[useChat] Error sending message:', err);
      setError(err.message);
      addMessage({
        role: 'assistant',
        type: 'text',
        content: 'Error: Could not send message.'
      });
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
      addMessage({
        role: 'assistant',
        type: 'text',
        content: response.invitationText
      });
      
      // Only add the image if we have a valid URL
      if (response.imageUrl && response.imageUrl !== "") {
        addMessage({
          role: 'assistant',
          type: 'image',
          content: response.imageUrl
        });
      }
    } catch (err) {
      console.error('[useChat] Error generating invitation:', err);
      setError(err.message);
      addMessage({
        role: 'assistant',
        type: 'text',
        content: 'Error: Could not generate invitation. Please try again later.'
      });
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