export function processText(text) {
    let processed = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    processed = processed.replace(/###\s+(.*?)(?:\n|$)/g, '<h3 style="margin-top: 16px; margin-bottom: 8px; color: #2e7d32;">$1</h3>');
    processed = processed.replace(/- \*\*([\d:]+)\*\* -/g, '<span style="color: #2e7d32; font-weight: bold;">$1</span> -');
    processed = processed.replace(/- ([^*\n]+)/g, '• $1');
    return processed;
  }