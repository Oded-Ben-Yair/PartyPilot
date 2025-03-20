// InvitationMessage.js
import React, { useState } from 'react';
import './InvitationMessage.css'; // Import the CSS file

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
      <div className="invitation-card">
        <h3 className="invitation-title">Your Digital Invitation</h3>
        <p>{invitation.text}</p>
        {invitation.imageUrl && (
          <img
            src={invitation.imageUrl}
            alt="Digital Invitation"
            className="invitation-image"
          />
        )}
      </div>
    );
  }

  // Otherwise, render the invitation input form
  return (
    <div className="invitation-form-container">
      <textarea
        value={invitationPrompt}
        onChange={(e) => setInvitationPrompt(e.target.value)}
        placeholder="Describe the invitation you want (theme, style, details)"
        className="invitation-textarea"
      />
      <button
        onClick={handleSubmit}
        className="invitation-button"
      >
        Generate Invitation
      </button>
    </div>
  );
}

export default InvitationMessage;
