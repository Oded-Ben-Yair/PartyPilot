import React, { useState } from 'react';

function InputBar({ onSend, disabled, onStop }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || disabled) return;
    onSend({ type: 'text', content: input });
    setInput('');
  };

  const handleStop = () => {
    if (onStop) onStop();
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={disabled}
        className={`
          flex-1 
          px-3 py-2.5 
          text-base 
          rounded-l-md 
          border 
          border-r-0 
          border-gray-300 
          focus:border-blue-500 
          focus:ring-1 
          focus:ring-blue-500 
          ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
        `}
        placeholder={disabled ? "AI is processing..." : "Type your message..."}
      />
      <button 
        type={disabled ? "button" : "submit"}
        onClick={disabled ? handleStop : undefined}
        className={`
          px-5 py-2.5 
          text-base 
          rounded-r-md 
          text-white 
          font-medium 
          transition-colors 
          duration-200 
          ${disabled 
            ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500' 
            : 'bg-green-500 hover:bg-green-600 focus:ring-green-500'}
          focus:outline-none 
          focus:ring-2 
          focus:ring-opacity-50
          ${disabled ? 'cursor-pointer' : 'cursor-pointer'}
        `}
      >
        {disabled ? 'Stop' : 'Send'}
      </button>
    </form>
  );
}

export default InputBar;