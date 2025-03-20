import React from 'react';
import TextMessage from './TextMessage';
import ImageMessage from './ImageMessage';
import PlanMessage from './PlanMessage';
import { processText } from '../utils/processText';

function ChatMessage({ message }) {
  if (message.type === 'text') {
    if (message.content.includes('"concept":') || 
        message.content.includes('"activities":') ||
        message.content.includes('"venue":') ||
        message.content.includes('### Plan')) {
      try {
        let planData = null;
        if (message.content.includes('{') && message.content.includes('}')) {
          let jsonStart = message.content.indexOf('{');
          let jsonEnd = message.content.lastIndexOf('}') + 1;
          if (jsonStart !== -1 && jsonEnd > jsonStart) {
            const jsonStr = message.content.substring(jsonStart, jsonEnd);
            planData = JSON.parse(jsonStr);
            if (planData && (planData.concept || planData.theme || planData.activities)) {
              return <PlanMessage planData={planData} />;
            }
          }
        }
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
            }}
            dangerouslySetInnerHTML={{ __html: processText(message.content) }}>
            </div>
          );
        }
      } catch (e) {
        console.log('Failed to parse plan data:', e);
      }
    }
    return <TextMessage content={message.content} />;
  } else if (message.type === 'image') {
    return <ImageMessage imageUrl={message.content} />;
  } else if (message.type === 'plan') {
    return <PlanMessage planData={message.content} />;
  }
  return null;
}

export default ChatMessage;