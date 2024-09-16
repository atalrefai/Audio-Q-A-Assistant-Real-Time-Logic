<h1>Audio Q&amp;A Assistant</h1>

<p>This project is an audio-based Q&amp;A assistant that allows users to record audio, transcribe it via Google Cloud's Speech-to-Text API, and receive context-based answers from OpenAI's GPT-3.5 model based on the transcription. The assistant demonstrates the integration of real-time voice processing, AI-driven transcription, and automated response generation.</p>

<h2>Table of Contents</h2>

<ol>
<li><a href="#project-overview">Project Overview</a></li>
<li><a href="#project-setup">Project Setup</a>
<ul>
<li><a href="#prerequisites">Prerequisites</a></li>
<li><a href="#step-by-step-setup">Step-by-Step Setup</a></li>
</ul></li>
<li><a href="#how-to-use">How to Use</a></li>
<li><a href="#features">Features</a></li>
<li><a href="#code-structure">Code Structure</a></li>
<li><a href="#technical-choices">Technical Choices</a></li>
<li><a href="#license">License</a></li>
</ol>

<hr />

<h2>Project Overview</h2>

<p>The Audio Q&amp;A Assistant provides a seamless user experience for real-time audio recording and AI-based transcription and response. It utilizes Google Cloud's Speech-to-Text API to transcribe spoken words into text and OpenAI's GPT-3.5 model to generate intelligent responses based on the transcribed text.</p>

<hr />

<h2>Project Setup</h2>

<p>This section explains how to set up the project from scratch on your local machine.</p>

<h3>Prerequisites</h3>

<p>Make sure you have the following tools and accounts in place:</p>

<ul>
<li><strong>Node.js</strong>: Install the latest version of Node.js, which comes with npm (Node Package Manager).</li>
<li><strong>Google Cloud</strong>: You need to create a project and enable the Speech-to-Text API. This API allows real-time audio transcription.</li>
<li><strong>OpenAI API</strong>: Sign up for an API key from OpenAI to use GPT-3.5 for generating responses.</li>
<li><strong>Environment Variables</strong>: You'll need to configure environment variables for the project, such as the OpenAI API key and server port.</li>
</ul>

<hr />

<h3>Step-by-Step Setup</h3>

<h4>1. <strong>Clone the Repository</strong></h4>

<p>First, clone the project repository from GitHub to your local machine.</p>

<p><code>bash
git clone https://github.com/your-repository-url.git
cd your-project-directory
</code></p>

<h4>2. <strong>Install Project Dependencies</strong></h4>

<p>The project requires several dependencies for both the backend (Express.js) and the frontend (React). Use the following command to install all dependencies:</p>

<p><code>bash
npm install
</code></p>

<p>This will install packages such as <code>express</code>, <code>cors</code>, <code>body-parser</code>, <code>axios</code>, <code>@google-cloud/speech</code>, <code>mic</code>, and <code>openai</code> among others.</p>

<h4>3. <strong>Set Up Environment Variables</strong></h4>

<p>To securely manage sensitive information, you will need to create a <code>.env</code> file for environment variables.</p>

<p><code>bash
touch .env
</code></p>

<p>Inside the <code>.env</code> file, add your OpenAI API key and server port like so:</p>

<p><code>env
OPENAI_API_KEY=your_openai_api_key
PORT=5000
</code></p>

<p>You'll also need to add your Google Cloud Speech-to-Text credentials. Make sure the Google Cloud service account JSON file (e.g., <code>absolute-bloom-435805-c3-f759528475b9.json</code>) is placed in the root directory and properly referenced in <code>server.js</code>.</p>

<h4>4. <strong>Start the Backend Server</strong></h4>

<p>Once the environment variables and dependencies are set up, you can start the backend server by running:</p>

<p><code>bash
node server.js
</code></p>

<p>The backend should now be running on <code>http://localhost:5000</code>. This server will handle audio processing, transcription, and communication with OpenAI for response generation.</p>

<h4>5. <strong>Run the Frontend</strong></h4>

<p>To launch the frontend React application, use the following command:</p>

<p><code>bash
npm start
</code></p>

<p>This will start the frontend app, which will be accessible at <code>http://localhost:3000</code>. From here, users can interact with the Q&amp;A assistant.</p>

<hr />

<h2>How to Use</h2>

<p>Once the project is set up and running, follow these steps to use the Audio Q&amp;A Assistant:</p>

<ol>
<li><p><strong>Open the App</strong>: Go to <code>http://localhost:3000</code> in your web browser.</p></li>
<li><p><strong>Start Recording</strong>: Click the <strong>Start Recording</strong> button to begin recording your audio. The app will use your device's microphone to capture your voice.</p></li>
<li><p><strong>Stop Recording</strong>: Once you're done speaking, click <strong>Stop Recording</strong>. This will send the recorded audio to the backend for transcription and further processing.</p></li>
<li><p><strong>View Transcription</strong>: The app will display a transcription of the recorded audio, showing what was said.</p></li>
<li><p><strong>Receive Answer</strong>: Based on the transcription, the system will generate an intelligent answer using OpenAI's GPT-3.5 model, which will be displayed below the transcription.</p></li>
<li><p><strong>Audio Playback</strong>: You can replay your recorded audio to verify what was captured.</p></li>
</ol>

<hr />

<h2>Features</h2>

<p>The Audio Q&amp;A Assistant includes the following key features:</p>

<ol>
<li><p><strong>Real-time Audio Recording</strong>:</p>

<ul>
<li>Users can record audio through their device’s microphone. The app provides start and stop buttons for controlling the recording process.</li>
</ul></li>
<li><p><strong>Speech-to-Text Transcription</strong>:</p>

<ul>
<li>The app uses Google Cloud's Speech-to-Text API to transcribe spoken words into text with high accuracy. This transcription is displayed on the interface in real time after the recording is processed.</li>
</ul></li>
<li><p><strong>Automated Question &amp; Answer</strong>:</p>

<ul>
<li>OpenAI’s GPT-3.5 model analyzes the transcription to generate a relevant response based on the user’s spoken input. This allows for an interactive Q&amp;A experience.</li>
</ul></li>
<li><p><strong>Loading Indicators</strong>:</p>

<ul>
<li>The app displays a loading indicator while processing the recorded audio, keeping the user informed of the system's status.</li>
</ul></li>
<li><p><strong>Audio Playback</strong>:</p>

<ul>
<li>After recording, users can play back their recorded audio to review it.</li>
</ul></li>
</ol>

<hr />

<h2>Code Structure</h2>

<p>Here’s an overview of the key files and code structure:</p>

<h3><strong>Backend (<code>server.js</code>)</strong>:</h3>

<ul>
<li><strong>Purpose</strong>: Handles the backend logic for processing audio, managing the Google Cloud Speech-to-Text API, and communicating with OpenAI's GPT-3.5 for response generation.</li>
<li><p><strong>Key Components</strong>:</p>

<ul>
<li><strong>Speech-to-Text Integration</strong>: Captures live audio from the microphone and streams it to Google Cloud for transcription.</li>
<li><strong>OpenAI Integration</strong>: Sends the transcription to OpenAI for answer generation, returning the response to the frontend.</li>
</ul>

<p>```bash</p>

<h1>To start the backend:</h1>

<p>node server.js
```</p></li>
</ul>

<h3><strong>Frontend (<code>App.js</code>)</strong>:</h3>

<ul>
<li><strong>Purpose</strong>: Manages the user interface and interactions, allowing users to record audio, view transcriptions, and receive generated answers.</li>
<li><strong>Key Features</strong>:
<ul>
<li><strong>React State Management</strong>: Uses <code>useState</code> to manage audio recording, transcription display, and answer generation.</li>
<li><strong>Audio Handling</strong>: Captures audio via <code>navigator.mediaDevices.getUserMedia()</code> and sends it to the backend for processing.</li>
<li><strong>API Integration</strong>: Communicates with the backend to upload the recorded audio and retrieve responses.</li>
</ul></li>
</ul>

<hr />

<h2>Technical Choices</h2>

<p>The following tools and technologies were chosen to ensure the best performance and accuracy:</p>

<ol>
<li><p><strong>Node.js</strong>: Used for building the backend server to handle HTTP requests and manage real-time communication between the frontend and external APIs.</p></li>
<li><p><strong>React</strong>: Chosen for the frontend due to its state management capabilities and efficient handling of real-time updates in the user interface.</p></li>
<li><p><strong>Google Cloud Speech-to-Text</strong>: Provides industry-leading accuracy for converting spoken words into text, allowing the system to handle various languages and accents.</p></li>
<li><p><strong>OpenAI GPT-3.5</strong>: A powerful model for generating contextually appropriate and intelligent answers based on user input.</p></li>
</ol>

<hr />

<h2>License</h2>

<p>This project is licensed under the MIT License. See the <a href="LICENSE">LICENSE</a> file for more details.</p>
