# PartyPilot

PartyPilot is an AI-powered birthday planning system built with Node.js, Express, React, and OpenAI that dynamically generates personalized birthday event plans and digital invitations, fully adhering to the PDF assignment requirements.


## Key Features

- **User Input & Quick Form:**  
  Users can enter details like age, theme, guest count, budget range, location, and preferred activities via an interactive chat or quick form.

- **AI-Generated Plans:**  
  Utilizes advanced prompting techniques (ReAct, Tree-of-Thought, prompt chaining) to produce three distinct birthday event plans, including venue recommendations, activity schedules, catering suggestions, and guest engagement ideas.

- **Digital Invitation Generation:**  
  Leverages OpenAI’s DALL-E to create custom digital invitations based on the party theme and user preferences.

- **Customizable Experience:**  
  Users can edit and tweak the generated plans directly within the chat interface.

## Tech Stack

- **Backend:** Node.js, Express
- **Frontend:** React (bootstrapped with Create React App)
- **AI Integration:** OpenAI API (ChatGPT and DALL-E)
- **Configuration:** Environment variables via `.env`

## Prerequisites

- Node.js (LTS recommended)
- npm

## Setup Instructions

1. **Clone the Repository:**
   ```bash
   git clone <YOUR_REPO_URL>
   cd <REPO_DIRECTORY>
   ```

2. **Configure Environment Variables:**
   - In the `server` directory, create a `.env` file with the following:
     ```env
     OPENAI_API_KEY=your_openai_api_key_here
     ```
     
3. **Install Dependencies:**
   - For the backend:
     ```bash
     cd server
     npm install
     ```
   - For the frontend:
     ```bash
     cd ../frontend
     npm install
     ```

## Running the Application

- **Start the Backend Server (Port 3001):**
  ```bash
  cd server
  npm start
  ```

- **Start the Frontend App (Port 3000):**
  ```bash
  cd frontend
  npm start
  ```

## API Endpoints

- **Chat Endpoint:**  
  `POST /api/chat` - Generates AI-powered birthday event plans.
  
- **Invitation Generation Endpoint:**  
  `POST /api/generate-invitation` - Creates a digital invitation using DALL-E based on conversation context.

## Deployment

Follow the standard Create React App deployment guidelines for the frontend and deploy the Node.js backend using your preferred method.

[Screencast From 2025-03-23 11-40-50.webm](https://github.com/user-attachments/assets/7c6179d4-6eee-4dd6-a37c-f6410cc29387)
