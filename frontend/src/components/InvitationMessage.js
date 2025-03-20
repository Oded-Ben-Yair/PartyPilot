import React, { useState } from 'react';

function InvitationMessage({ sendMessage, invitation }) {
  // Always call hooks at the top level
  const [invitationPrompt, setInvitationPrompt] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!invitationPrompt.trim()) return;

    sendMessage({
      type: 'invitation_request',
      content: `Please create a digital invitation: ${invitationPrompt}`
    });
    setInvitationPrompt('');
  };

  // If we already have an invitation response, render it
  if (invitation) {
    return (
      <div className="w-full max-w-lg mx-auto p-4 border rounded-lg bg-white shadow">
        <h3 className="text-lg font-bold mb-2">Your Digital Invitation</h3>
        <p>{invitation.text}</p>
        {invitation.imageUrl && (
          <img
            src={invitation.imageUrl}
            alt="Digital Invitation"
            className="mt-4 rounded"
          />
        )}
      </div>
    );
  }

  // Otherwise, render the invitation input form
  return (
    <div className="w-full max-w-lg mx-auto p-4">
      <textarea
        value={invitationPrompt}
        onChange={(e) => setInvitationPrompt(e.target.value)}
        placeholder="Describe the invitation you want (theme, style, details)"
        className="w-full p-3 border rounded-lg mb-3 resize-y min-h-[100px] 
                   focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <button
        onClick={handleSubmit}
        className="w-full bg-blue-500 text-white py-2 rounded-lg 
                   hover:bg-blue-600 transition-colors"
      >
        Generate Invitation
      </button>
    </div>
  );
}

export default InvitationMessage;

