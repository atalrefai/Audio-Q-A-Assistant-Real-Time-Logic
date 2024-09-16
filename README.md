Audio Q&A Assistant Project Documentation
1. How to Set Up the Project from Scratch
To set up this project on a new machine, follow the steps below:

Prerequisites:
- Node.js and npm (Ensure that Node.js is installed, as npm comes with it)
- Google Cloud account with Speech-to-Text API enabled
- OpenAI API Key
Step-by-Step Setup:
1. Clone the Repository:
   Clone or download the project files from your repository using the following command:

   git clone https://github.com/your-repository-url.git
   cd your-project-directory

2. Install Dependencies:
   Install the necessary packages for both the backend (server.js) and the frontend (App.js). Run the following command to install all required dependencies:

   npm install

   This will install required packages such as express, cors, body-parser, axios, @google-cloud/speech, mic, and openai.

3. Configure Environment Variables:
   - Create a .env file in the root directory using the following command:

     touch .env

   - Edit the .env file with the following environment variables. Replace the placeholders with your actual API key and any other relevant data:

     OPENAI_API_KEY=your_openai_api_key
     PORT=5000

   - Make sure you also have the Google Cloud Speech-to-Text credentials JSON file (e.g., absolute-bloom-435805-c3-f759528475b9.json) in the root directory.

4. Start the Backend Server:
   To start the server and run the backend, execute:

   node server.js

   The server should start on port 5000 (or any other port specified in .env).

5. Run the Frontend:
   For the React-based frontend, run:

   npm start

   This will launch the frontend app where users can interact with the system. The app will run on localhost:3000 by default.
2. Interface Demo
The user interface for this project is a simple yet powerful audio-based Q&A assistant. Below are the main features in action:

1. Recording Audio:
- Use the following command to start the recording:

  # Frontend action (clicks Start Recording button)

2. Displaying Transcription and Answer:
- The transcription and the generated answer will appear after you stop the recording:

  # Frontend action (clicks Stop Recording button)

3. Loading Indicator:
- During the processing phase, the application will display a loading message.

4. Audio Playback:
- The recorded audio can be played back using the audio controls.
3. Codebase Explanation
The codebase consists of two primary parts: the backend (server.js) and the frontend (App.js).

Backend (server.js):
- Purpose: This file handles the audio processing and transcription using Google Cloud's Speech-to-Text API and integrates OpenAI for generating answers.
- Key Parts:
  1. Speech-to-Text Setup:
     The backend initializes the Google Cloud Speech-to-Text API using the provided credentials. The streaming API is set up to capture and transcribe the user's voice in real-time.
     Command to start the backend server:

     node server.js

  2. Microphone Input:
     The mic package is used to capture audio input from the user's microphone and feed it into the Google Cloud Speech-to-Text streaming service.

  3. Processing Transcription:
     Once the speech transcription is complete, the backend sends the transcription to OpenAI to generate a response.

Frontend (App.js):
- Purpose: This is a React component that handles the user interaction, from recording audio to displaying transcription and the generated answer.
- Key Features:
  1. State Management:
     The app uses useState to manage the states of recording, transcription, audio playback, and loading.

  2. Audio Recording:
     The navigator.mediaDevices.getUserMedia() API is used to capture the user's microphone input, and the audio is stored in audioChunksRef.

  3. Uploading Audio:
     After recording, the audio is converted to a Blob, which is then uploaded to the backend for transcription.

  4. Display Logic:
     The transcription and the response from OpenAI are displayed to the user once available. A loading indicator is shown while the backend processes the request.
