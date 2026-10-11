# NovaMind AI

A full-stack AI chat application built with React, Node.js, Express.js, and MongoDB. NovaMind AI provides user authentication, AI-powered conversations, and persistent chat threads through the Groq API.

**[Live Demo](https://novamind-ai-2.onrender.com/)** · 

## Features

- **User Authentication:** Register and log in securely using password hashing and JWT authentication.
- **AI Conversations:** Send prompts and receive AI-generated responses through the Groq API.
- **Multiple Chat Threads:** Create and manage separate conversations.
- **Persistent Chat History:** Store conversation messages in MongoDB and retrieve messages by thread.
- **Thread Management:** View existing conversations and delete unwanted threads.
- **Responsive Chat Interface:** Interact with AI responses through a React-based interface with Markdown rendering and code highlighting.

## Tech Stack

**Frontend:** React, Vite, React Router, Axios, React Markdown

**Backend:** Node.js, Express.js, REST APIs

**Database:** MongoDB, Mongoose

**Authentication:** JSON Web Tokens (JWT), bcryptjs

**AI Integration:** Groq API

**Deployment:** Render

## Project Structure

- `Frontend/` — React application and user interface
- `Backend/controllers/` — Authentication and application logic
- `Backend/middleware/` — Authentication middleware
- `Backend/models/` — MongoDB data models
- `Backend/routes/` — Authentication and chat API routes
- `Backend/utils/` — AI API integration
- `Backend/server.js` — Express server and database connection

## Getting Started

### Prerequisites

- Node.js
- npm
- MongoDB database
- Groq API key

### 1. Clone the repository

`git clone https://github.com/Sohamchopade/-NovaMind-AI-.git`

Open the cloned project directory in your terminal.

### 2. Configure the backend

Navigate to the backend directory:

`cd Backend`

Install the dependencies:

`npm install`

Create a `.env` file inside the `Backend` directory containing:

`MONGODB_URI=your_mongodb_connection_string`

`JWT_SECRET=your_jwt_secret`

`GROQ_API_KEY=your_groq_api_key`

Replace the example values with your own credentials. Never commit your `.env` file or expose your API keys.

Start the backend:

`npm run dev`

The backend runs on `http://localhost:3000`.

### 3. Start the frontend

Open a second terminal from the project root and run:

`cd Frontend`

`npm install`

`npm run dev`

Open the local URL displayed by Vite in your terminal.

### 4. Try NovaMind AI

Register an account, log in, start a conversation, send a prompt, and explore the saved chat threads.

## API Endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| POST | `/api/auth/register` | Register a user |
| POST | `/api/auth/login` | Authenticate a user |
| POST | `/api/chat` | Send a chat message |
| GET | `/api/thread` | Retrieve chat threads |
| GET | `/api/thread/:threadId` | Retrieve messages from a thread |
| DELETE | `/api/thread/:threadId` | Delete a chat thread |

The chat and thread endpoints require authentication where implemented.

## Environment Variables

Keep all database credentials, JWT secrets, and AI API keys in environment variables. Configure the corresponding variables in your deployment environment when hosting the backend.

## Author

**Soham Chopade**

- GitHub: [Sohamchopade](https://github.com/Sohamchopade)
