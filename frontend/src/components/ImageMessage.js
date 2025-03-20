// Renders an image message.
import React from 'react';

function ImageMessage({ imageUrl }) {
  return (
    <img 
      src={imageUrl} 
      alt="Chat Content" 
      style={{ maxWidth: '100%', borderRadius: '8px', margin: '4px 0' }} 
    />
  );
}

export default ImageMessage;
