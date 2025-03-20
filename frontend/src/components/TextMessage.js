// Renders a text message with improved readability and formatting.
import React from 'react';

function TextMessage({ content }) {
  // Process text to handle markdown-style formatting
  const processText = (text) => {
    // Replace **Text** with bold
    let processed = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Replace markdown headers (###) with styled headers
    processed = processed.replace(/###\s+(.*?)(?:\n|$)/g, '<h3 style="margin-top: 16px; margin-bottom: 8px; color: #2e7d32;">$1</h3>');
    
    // Handle activity lists with times
    processed = processed.replace(/- \*\*([\d:]+)\*\* -/g, '<span style="color: #2e7d32; font-weight: bold;">$1</span> -');
    
    // Handle bullet points
    processed = processed.replace(/- ([^*\n]+)/g, '• $1');
    
    return processed;
  };

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