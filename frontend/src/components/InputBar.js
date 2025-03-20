// InputBar.js
import React, { useState, useRef, useEffect } from 'react';
import './InputBar.css'; // Import the CSS file

function InputBar({ onSend, disabled, onStop }) {
  const [input, setInput] = useState('');
  const textareaRef = useRef(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      // Set minimum height to 70px and cap maximum height at 200px
      const newHeight = Math.min(Math.max(textarea.scrollHeight, 70), 200);
      textarea.style.height = `${newHeight}px`;
    }
  }, [input]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || disabled) return;
    onSend({ content: input });
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="input-bar-form">
      <div className="input-bar-container">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={disabled}
          rows={1}
          style={{ resize: 'none' }}
          className="input-textarea"
          placeholder={disabled ? "AI is processing..." : "Type your message..."}
        />
        <div className="button-container">
          {disabled ? (
            <button 
              type="button"
              onClick={onStop}
              className="stop-button"
            >
              Stop
            </button>
          ) : (
            <button 
              type="submit"
              className="send-button"
            >
              Send
            </button>
          )}
        </div>
      </div>
    </form>
  );
}

export default InputBar;
