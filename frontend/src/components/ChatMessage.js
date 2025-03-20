// Determines the type of message and renders the corresponding component.
import React from 'react';
import TextMessage from './TextMessage';
import ImageMessage from './ImageMessage';
import PlanMessage from './PlanMessage';

function ChatMessage({ message }) {
  // Handle plan data that might be in text messages as JSON
  if (message.type === 'text') {
    // Check if the message contains plan-related keywords
    if (message.content.includes('"concept":') || 
        message.content.includes('"activities":') ||
        message.content.includes('"Plan 1":') ||
        message.content.includes('### Plan')) {
      
      try {
        // Try to extract JSON from the message
        let planData = null;
        
        // Look for JSON structure
        if (message.content.includes('{') && message.content.includes('}')) {
          const jsonStart = message.content.indexOf('{');
          const jsonEnd = message.content.lastIndexOf('}') + 1;
          const jsonStr = message.content.substring(jsonStart, jsonEnd);
          planData = JSON.parse(jsonStr);
        }
        
        // If JSON parsing worked and contains plan data
        if (planData && (planData.concept || planData.theme || planData.activities)) {
          return <PlanMessage planData={planData} />;
        }
      } catch (e) {
        // If JSON parsing fails, continue to regular text message
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