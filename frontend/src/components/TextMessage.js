// Renders a text message with improved readability.
import React from 'react';

function TextMessage({ content }) {
  return (
    <div style={{ 
      padding: '8px', 
      backgroundColor: '#f0f0f0', 
      margin: '4px 0', 
      borderRadius: '4px', 
      whiteSpace: 'pre-wrap', 
      lineHeight: '1.5',
      fontSize: '1rem'
    }}>
      {content}
    </div>
  );
}

export default TextMessage;

