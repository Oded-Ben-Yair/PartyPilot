const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001';

const formatResponse = (response) => {
  // Convert raw responses to user-friendly format
  if (response.plans) {
    return {
      type: 'plans',
      content: response.plans.map(plan => 
        `Plan: ${plan.concept}\nTheme: ${plan.theme}\nVenue: ${plan.venue}`
      ).join('\n\n')
    };
  }

  if (response.invitationText) {
    return {
      type: 'invitation',
      content: {
        text: response.invitationText,
        imageUrl: response.invitationImageURL || null,
        details: response
      }
    };
  }

  return { 
    type: 'text', 
    content: response.response || JSON.stringify(response) 
  };
};

export async function sendChatMessage(messages, signal) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages }),
      signal,
    });

    if (!response.ok) throw new Error(`Chat API responded with status ${response.status}`);
    
    const rawResponse = await response.json();
    return formatResponse(rawResponse);
  } catch (error) {
    if (error.name === 'AbortError') {
      return { type: 'text', content: 'Generation stopped.' };
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
    
    const rawResponse = await response.json();
    return formatResponse(rawResponse);
  } catch (error) {
    if (error.name === 'AbortError') {
      return { type: 'text', content: 'Invitation generation stopped.' };
    }
    console.error('[API Service] Error in fetchInvitation:', error);
    throw error;
  }
}
