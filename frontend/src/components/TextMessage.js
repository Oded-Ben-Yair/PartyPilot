import React from 'react';
import { processText } from '../utils/processText';

function TextMessage({ content }) {
  return (
    <div style={{ 
      padding: '12px 16px', 
      backgroundColor: '#f5f5f5', 
      margin: '4px 0', 
      borderRadius: '8px', 
      whiteSpace: 'pre-wrap', 
      lineHeight: '1.5',
      fontSize: '0.95rem'
    }}
    dangerouslySetInnerHTML={{ __html: processText(content) }}>
    </div>
  );
}

export default TextMessage;