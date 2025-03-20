import React from 'react';

function InvitationMessage({ invitation }) {
  // Default values in case properties are missing
  const { text, imageUrl } = invitation || {};
  
  return (
    <div className="invitation-card" style={{ 
      margin: '16px 0',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      border: '1px solid #ffb74d'
    }}>
      {imageUrl && (
        <div className="invitation-image" style={{ maxWidth: '100%', textAlign: 'center' }}>
          <img 
            src={imageUrl} 
            alt="Birthday Invitation" 
            style={{ 
              maxWidth: '100%', 
              borderRadius: '8px 8px 0 0'
            }} 
          />
        </div>
      )}
      
      <div className="invitation-text" style={{ 
        padding: '16px',
        backgroundColor: '#fff8e1', 
        borderTop: imageUrl ? '1px solid #ffb74d' : 'none'
      }}>
        <h3 style={{ marginTop: 0, color: '#e65100' }}>Your Invitation</h3>
        {text ? (
          <div dangerouslySetInnerHTML={{ __html: text.replace(/\n/g, '<br/>') }} />
        ) : (
          <p>Invitation details will appear here.</p>
        )}
      </div>
    </div>
  );
}

export default InvitationMessage;