// apiService.js
// This file encapsulates all API calls to the PartyPilot backend.
// It provides functions to send chat messages and fetch digital invitations.
// apiService.js
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001';

export async function sendChatMessage(messages, signal) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages }),
      signal,
    });
    if (!response.ok) throw new Error(`Chat API responded with status ${response.status}`);
    return await response.json();
  } catch (error) {
    if (error.name === 'AbortError') {
      console.log('[API Service] Chat request aborted');
      return { aborted: true };
    }
    console.error('[API Service] Error in sendChatMessage:', error);
    throw error;
  }
}

export async function fetchInvitation(messages, signal) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/generate-invitation`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages }),
      signal,
    });
    if (!response.ok) throw new Error(`Invitation API responded with status ${response.status}`);
    return await response.json();
  } catch (error) {
    if (error.name === 'AbortError') {
      console.log('[API Service] Invitation request aborted');
      return { aborted: true };
    }
    console.error('[API Service] Error in fetchInvitation:', error);
    throw error;
  }
}