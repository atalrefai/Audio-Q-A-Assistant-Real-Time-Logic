full step-by-step guide for installing and running the Node.js backend (server.js) and React frontend (app.js) code on a Windows machine.

Prerequisites:
-
Node.js
-
installed on your machine. Download it from here and install it.

Git installed
-
on your machine (optional for cloning repositories). Download it from here.

Google Cloud
-
and OpenAI accounts to obtain API keys.

Backend Setup (Node.js)
-

Install Node.js
-

Download Node.js from Node.js Official Website.
Follow the installation instructions for Windows.
Verify installation by opening Command Prompt and running:

node -v
npm -v

You should see the version numbers for both Node.js and npm (Node Package Manager).

Set Up Google Cloud Speech-to-Text API
-
1. **Sign up or log in** to the [Google Cloud Console](https://console.cloud.google.com/).
2. **Create a new project** or **use an existing project**.
3. **Enable the Speech-to-Text API**.
4. **Create a service account key**:
   - Navigate to `IAM & Admin > Service Accounts`.
   - Create a new service account.
   - Under **Keys**, click **Add Key** and create a new JSON key.
   - Download this JSON file and save it to the project directory (e.g., the same folder as `server.js`).
   - Rename the file to something easy, like `xxxxxxxxxxxxxxxxxxxxxxxxxx.json` (ensure it matches the name in `server.js`).


Set Up OpenAI API
-
Sign up or log in to OpenAI.
Get your API key.
Create a .env file in the root of your backend project directory and add the OpenAI API key:

OPENAI_API_KEY=your_openai_api_key
-

Create Backend Directory
-

Open Command Prompt or PowerShell.
Create a project folder for the backend (e.g., audio-qa-backend):
mkdir audio-qa-backend
cd audio-qa-backend

Install Required Packages
-

In the backend directory, create the server.js file and paste your Node.js code in it.
Run the following command to initialize your Node.js project:
npm init -y
Now install the required dependencies:
npm install express cors body-parser @google-cloud/speech mic openai dotenv

Run the Backend Server
-
To start the backend server, run:
node server.js
The server will run on port 5000 (or the port specified in your .env file).

Testing Backend (Optional)
-

You can use tools like Postman or curl to test the /transcribe endpoint. For example
curl -X POST http://localhost:5000/transcribe

------------------------------------------------------------------------------------



Frontend Setup (React)
-

Install React
-

Open Command Prompt or PowerShell.
Navigate to the parent directory where you want to create the frontend.
Run the following command to create a React app:
npx create-react-app audio-qa-frontend
cd audio-qa-frontend

Add Dependencies
-
Install axios to make HTTP requests:
npm install axios

Update App.js
-
Replace the default App.js code with the React code provided above.

Update the Proxy for Development
-
To avoid CORS issues during development, modify the package.json file of your React project to include a proxy for your backend:
"proxy": "http://localhost:5000"

Run React App
-

To start the React development server, run:
npm start
The React app will run at http://localhost:3000 by default. You can access it via your web browser.

--------------------------------------------------------------------------

Final Steps
-
Testing the Full App
-

Once both backend (localhost:5000) and frontend (localhost:3000) are running, open your browser and navigate to http://localhost:3000.
Try recording audio and submitting it for transcription and Q&A to test the entire workflow.

Troubleshooting
-
If you encounter any issues with microphone permissions, ensure that the browser has access to the microphone.
Check for console errors in the browser and in the backend terminal to debug any issues.
