// This file encapsulates the business logic for interacting with the OpenAI API.
// It provides functions for generating chat responses and digital invitations using advanced prompting techniques.

const OpenAI = require('openai');
const { SYSTEM_PROMPT } = require('./prompts');
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'dummy-key'
});

/**
 * Generates a chat response using the OpenAI API.
 * @param {Array} messages - Array of message objects representing the conversation.
 * @returns {Promise<Object>} - The AI response, parsed as JSON if possible.
 */
async function getChatResponse(messages) {
  // Prepare messages by including the system prompt as the first message
  const formattedMessages = [
    { role: "system", content: SYSTEM_PROMPT },
    ...messages
  ];

  // Log the action with clear context
  console.log('[/api/chat] Sending request to OpenAI with', formattedMessages.length, 'messages');

  const response = await openai.chat.completions.create({
    model: "gpt-4-turbo",
    messages: formattedMessages,
    max_tokens: 2000,
    temperature: 0.7
  });

  const aiResponseText = response.choices[0].message.content;
  
  // Attempt to parse as JSON for structured responses
  try {
    const jsonResponse = JSON.parse(aiResponseText);
    return jsonResponse;
  } catch (parseError) {
    // If parsing fails, return the raw text response
    return { response: aiResponseText };
  }
}

/**
 * Generates a digital invitation based on conversation context using the OpenAI API.
 * @param {Array} messages - Array of message objects representing the conversation.
 * @returns {Promise<Object>} - Contains invitation text, generated image URL, and the DALL-E prompt.
 */
async function generateInvitation(messages) {
  // Build extraction prompt to obtain necessary details from the conversation
  const extractionPrompt = `
From the following conversation, extract the birthday person's name, age (if mentioned), and the party theme (if mentioned).
If the theme isn't explicitly stated, infer it from the context or respond with "None" if it cannot be determined.

Conversation:
${messages.map(msg => `${msg.role}: ${msg.content}`).join("\n")}

Respond with a JSON object in the following format:
{
  "name": "Extracted Name",
  "age": "Extracted Age or null",
  "theme": "Extracted Theme or 'None'"
}
  `;

  const extractionResponse = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "You are an expert at extracting information from conversations." },
      { role: "user", content: extractionPrompt }
    ],
    max_tokens: 200,
    temperature: 0.5
  });

  let extractedData;
  try {
    extractedData = JSON.parse(extractionResponse.choices[0].message.content);
  } catch (parseError) {
    console.error('[/api/generate-invitation] Error parsing extraction response:', parseError);
    throw new Error("Failed to parse extracted conversation data.");
  }

  const { name, age, theme } = extractedData;

  // Generate invitation text based on extracted details
  const invitationPrompt = `
Based on our conversation, create a beautiful birthday invitation text for ${name}'s ${age ? age + "th " : ""}birthday.
The theme is: ${theme === "None" ? "a general birthday" : theme}.
Make it warm, inviting, and concise (about 3-4 lines max).
Include placeholders like [DATE], [TIME], and [LOCATION] for the event details.
  `;

  const textResponse = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "You are an expert invitation writer." },
      { role: "user", content: invitationPrompt }
    ],
    max_tokens: 200,
    temperature: 0.7
  });

  const invitationText = textResponse.choices[0].message.content.trim();

  // Construct a DALL-E prompt based on the theme and details
  let dallePrompt = `Create a beautiful digital birthday invitation for ${name}'s ${age ? age + "th " : ""}birthday with a ${theme === "None" ? "general birthday" : theme} theme. `;

  if (theme === "travel" || theme === "adventure") {
    dallePrompt += "Include vintage maps, a compass, and travel elements with warm earthy tones. No text.";
  } else if (theme === "nature") {
    dallePrompt += "Include natural elements like trees, flowers, and outdoor scenery with soft green and blue tones. No text.";
  } else {
    dallePrompt += "The design should be festive and celebratory with balloons, confetti, and decorative elements. No text.";
  }

  // Generate an image using DALL-E
  const imageResponse = await openai.images.generate({
    model: "dall-e-3",
    prompt: dallePrompt,
    n: 1,
    size: "1024x1024",
    quality: "standard"
  });

  return {
    invitationText,
    imageUrl: imageResponse.data[0].url,
    dallePrompt
  };
}

module.exports = {
  getChatResponse,
  generateInvitation
};
