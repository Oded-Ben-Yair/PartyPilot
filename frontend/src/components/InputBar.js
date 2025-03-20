// InputBar.js
import React, { useState, useRef, useEffect } from 'react';

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
    <form onSubmit={handleSubmit} className="w-full p-4 bg-gray-100 border-t">
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={disabled}
          rows={1}
          style={{ resize: 'none' }}
          className="w-full p-3 pr-12 border rounded-lg overflow-hidden focus:ring-2 focus:ring-blue-500"
          placeholder={disabled ? "AI is processing..." : "Type your message..."}
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2" style={{ width: '80px' }}>
          {disabled ? (
            <button 
              type="button"
              onClick={onStop}
              className="w-full bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Stop
            </button>
          ) : (
            <button 
              type="submit"
              className="w-full bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
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

