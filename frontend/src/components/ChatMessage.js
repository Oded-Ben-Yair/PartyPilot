// Determines the type of message and renders the corresponding component.
import React from 'react';
import TextMessage from './TextMessage';
import ImageMessage from './ImageMessage';
import PlanMessage from './PlanMessage';

function ChatMessage({ message }) {
  // Handle plan data that might be in text messages
  if (message.type === 'text') {
    // Check for plan-related content (JSON or plan formatting markers)
    if (message.content.includes('"concept":') || 
        message.content.includes('"activities":') ||
        message.content.includes('"venue":') ||
        message.content.includes('### Plan')) {
      
      try {
        // Try to extract JSON from the message
        let planData = null;
        
        // Look for JSON structure
        if (message.content.includes('{') && message.content.includes('}')) {
          // Find the outermost JSON object
          let jsonStart = message.content.indexOf('{');
          let jsonEnd = message.content.lastIndexOf('}') + 1;
          
          if (jsonStart !== -1 && jsonEnd > jsonStart) {
            const jsonStr = message.content.substring(jsonStart, jsonEnd);
            planData = JSON.parse(jsonStr);
            
            // If we got a valid plan object
            if (planData && (planData.concept || planData.theme || planData.activities)) {
              return <PlanMessage planData={planData} />;
            }
          }
        }
        
        // If we couldn't extract JSON but still have plan content, 
        // display it with better formatting
        if (!planData && message.content.includes('### Plan')) {
          return (
            <div style={{ 
              padding: '16px', 
              backgroundColor: '#f0f7ff', 
              margin: '4px 0', 
              borderRadius: '8px',
              border: '1px solid #d0e3ff',
              whiteSpace: 'pre-wrap',
              lineHeight: '1.5'
            }}>
              {message.content}
            </div>
          );
        }
      } catch (e) {
        console.log('Failed to parse plan data:', e);
      }
    }
    
    // Regular text message
    return <TextMessage content={message.content} />;
  } else if (message.type === 'image') {
    return <ImageMessage imageUrl={message.content} />;
  } else if (message.type === 'plan') {
    return <PlanMessage planData={message.content} />;
  }
  
  return null;
}

export default ChatMessage;