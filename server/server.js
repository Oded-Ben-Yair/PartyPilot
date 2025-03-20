// This file sets up the Express server for the PartyPilot project.
// It initializes middleware, configures environment variables, and sets up a basic health-check endpoint.

const express = require('express'); // Import the Express framework
const cors = require('cors');         // Import CORS middleware for enabling cross-origin requests
require('dotenv').config();           // Load environment variables from .env file

// Create an instance of the Express application
const app = express();

// Middleware configuration
app.use(cors());                    // Enable Cross-Origin Resource Sharing for all routes
app.use(express.json());            // Automatically parse JSON in incoming requests

// Health-check endpoint to verify server status
app.get('/api/health', (req, res) => {
  res.json({ status: 'online' });
});

// Retrieve port number from environment variables or default to 3001
const PORT = process.env.PORT || 3001;

// Start the server and log the running port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
