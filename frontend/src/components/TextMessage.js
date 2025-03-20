// Renders a text message.
import React from 'react';

function TextMessage({ content }) {
  return (
    <div style={{ padding: '8px', backgroundColor: '#f0f0f0', margin: '4px 0', borderRadius: '4px' }}>
      {content}
    </div>
  );
}

export default TextMessage;
