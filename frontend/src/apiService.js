// apiService.js
// This file encapsulates all API calls to the PartyPilot backend.
// It provides functions to send chat messages and fetch digital invitations.

// Set the base URL for API calls.
// The REACT_APP_API_BASE_URL environment variable can be used to override the default.
// If not set, defaults to 'http://localhost:3001'.
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001';

/**
 * Sends the current conversation to the chat endpoint and retrieves a response.
 * @param {Array} messages - Array of conversation messages.
 * @returns {Promise<Object>} - The response from the chat API.
 */
export async function sendChatMessage(messages) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages }),
    });
    if (!response.ok) {
      throw new Error(`Chat API responded with status ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('[API Service] Error in sendChatMessage:', error);
    throw error;
  }
}

/**
 * Sends the current conversation to the invitation endpoint and retrieves invitation data.
 * @param {Array} messages - Array of conversation messages.
 * @returns {Promise<Object>} - The response from the invitation API.
 */
export async function fetchInvitation(messages) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/generate-invitation`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages }),
    });
    if (!response.ok) {
      throw new Error(`Invitation API responded with status ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('[API Service] Error in fetchInvitation:', error);
    throw error;
  }
}
