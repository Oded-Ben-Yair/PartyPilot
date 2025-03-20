import React from 'react';
import TextMessage from './TextMessage';
import ImageMessage from './ImageMessage';
import PlanMessage from './PlanMessage';
import InvitationMessage from './InvitationMessage';
import { processText } from '../utils/processText';

function ChatMessage({ message }) {
  // Handle plans passed as a structured object
  if (message.type === 'plans') {
    return Array.isArray(message.content) ? (
      <div className="plans-container">
        {message.content.map((plan, index) => (
          <div key={index}>
            <h3 style={{ color: '#2e7d32', marginBottom: '8px' }}>Plan {index + 1}: {plan.concept}</h3>
            <PlanMessage planData={plan} />
          </div>
        ))}
      </div>
    ) : (
      <PlanMessage planData={message.content} />
    );
  }
  
  // Handle invitation messages
  if (message.type === 'invitation') {
    return <InvitationMessage invitation={message.content} />;
  }
  
  // Handle image messages
  if (message.type === 'image') {
    return <ImageMessage imageUrl={message.content} />;
  }
  
  // Default case - text messages
  if (message.type === 'text') {
    // Try to detect plan data in text content
    if (message.content.includes('"concept":') || 
        message.content.includes('"activities":') ||
        message.content.includes('"venue":') ||
        message.content.includes('Plan 1:') ||
        message.content.includes('### Plan')) {
      
      try {
        // Check for JSON data
        if (message.content.includes('{') && message.content.includes('}')) {
          let jsonStart = message.content.indexOf('{');
          let jsonEnd = message.content.lastIndexOf('}') + 1;
          
          if (jsonStart !== -1 && jsonEnd > jsonStart) {
            const jsonStr = message.content.substring(jsonStart, jsonEnd);
            const planData = JSON.parse(jsonStr);
            
            if (planData && (planData.concept || planData.theme || planData.activities)) {
              return <PlanMessage planData={planData} />;
            }
          }
        }
        
        // Format plan text with styling if it contains plan headers
        if (message.content.includes('Plan 1:') || message.content.includes('### Plan')) {
          return (
            <div style={{ 
              padding: '16px', 
              backgroundColor: '#f0f7ff', 
              margin: '8px 0', 
              borderRadius: '8px',
              border: '1px solid #d0e3ff',
              whiteSpace: 'pre-wrap',
              lineHeight: '1.5'
            }}
            dangerouslySetInnerHTML={{ __html: processText(message.content) }} />
          );
        }
      } catch (e) {
        console.log('Failed to parse plan data:', e);
      }
    }
    
    // Check for invitation request or response text
    if (message.content.toLowerCase().includes('invitation') && 
        (message.content.includes('generate') || message.content.includes('create'))) {
      return (
        <div style={{ 
          padding: '16px', 
          backgroundColor: '#fff8e1', 
          margin: '8px 0', 
          borderRadius: '8px',
          border: '1px solid #ffe082',
          whiteSpace: 'pre-wrap',
          lineHeight: '1.5'
        }}
        dangerouslySetInnerHTML={{ __html: processText(message.content) }} />
      );
    }
    
    // Default text message
    return <TextMessage content={message.content} />;
  }
  
  return null;
}

export default ChatMessage;