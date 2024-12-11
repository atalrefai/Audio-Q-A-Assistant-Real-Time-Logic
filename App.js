//this is app.js from react
// Import necessary React hooks and axios for HTTP requests
import React, { useState, useRef } from 'react';
import axios from 'axios';

// Main functional component for the app
function App() {
  // useState hooks to manage various states in the app
  const [recording, setRecording] = useState(false); // Manages if the app is currently recording
  const [blobURL, setBlobURL] = useState(''); // Stores the URL of the audio blob for playback
  const [transcription, setTranscription] = useState(''); // Stores the transcription text after speech-to-text conversion
  const [answer, setAnswer] = useState(''); // Stores the AI-generated response (answer) from the backend
  const [loading, setLoading] = useState(false); // Manages the loading state when processing data

  // useRef hooks to reference the MediaRecorder and audio chunks
  const mediaRecorderRef = useRef(null); // Reference to the MediaRecorder instance used for recording audio
  const audioChunksRef = useRef([]); // Stores the audio data chunks while recording

  // Function to start audio recording
  const startRecording = () => {
    // Access the user's microphone
    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
      // Create a new MediaRecorder instance
      mediaRecorderRef.current = new MediaRecorder(stream);

      // Event listener for when audio data is available during recording
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data); // Push audio data chunks to the reference array
      };

      // Event listener for when the recording stops
      mediaRecorderRef.current.onstop = handleStopRecording;

      // Start recording
      mediaRecorderRef.current.start();
      setRecording(true); // Update the recording state to true to indicate that recording has started
    });
  };

  // Function to stop audio recording
  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop(); // Stop the recording
      setRecording(false); // Set recording state to false as recording has stopped
    }
  };

  // Function to handle actions after recording is stopped
  const handleStopRecording = () => {
    // Create a Blob from the recorded audio chunks
    const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });

    // Create a URL for the Blob so it can be played back in the browser
    const audioURL = URL.createObjectURL(audioBlob);
    setBlobURL(audioURL); // Update the blob URL to be used for audio playback

    // Reset the audio chunks reference for future recordings
    audioChunksRef.current = [];

    // Call the function to upload the audio Blob to the server
    handleUpload(audioBlob);
  };

  // Function to upload the recorded audio blob to the backend server
  const handleUpload = (blob) => {
    // Create a FormData object to send the audio Blob as multipart/form-data
    const formData = new FormData();
    formData.append('audio', blob); // Append the audio Blob to the FormData

    // Set loading state to true while the audio is being processed
    setLoading(true);

    // Send the audio data to the backend server for transcription and AI processing
    axios.post('http://localhost:5000/transcribe', formData, {
      headers: {
        'Content-Type': 'multipart/form-data' // Set correct headers for sending form data
      }
    })
    .then(response => {
      // On success, set the transcription and answer states with the data received from the backend
      setTranscription(response.data.transcription); // Store the transcription result
      setAnswer(response.data.answer); // Store the AI-generated answer
      setLoading(false); // Set loading state to false after processing is done
    })
    .catch(error => {
      console.error('Error:', error); // Log any errors that occur during the request
      setLoading(false); // Set loading state to false if an error occurs
    });
  };

  // JSX (HTML-like syntax) to render the UI of the app
  return (
    <div className="App">
      <h1>Audio Q&A Assistant</h1>
      
      {/* Button controls for starting and stopping the audio recording */}
      <div>
        {/* Button to start recording; disabled when recording is already in progress */}
        <button onClick={startRecording} disabled={recording}>
          Start Recording
        </button>
        {/* Button to stop recording; disabled when not recording */}
        <button onClick={stopRecording} disabled={!recording}>
          Stop Recording
        </button>
      </div>
      
      {/* Display the recorded audio as a playable audio element */}
      {blobURL && <audio src={blobURL} controls="controls" />}

      {/* Display loading message while transcription and AI processing is happening */}
      {loading && <p>Loading, please wait...</p>}

      {/* Display the transcription result if available */}
      {transcription && (
        <div>
          <h2>Transcription</h2>
          <p>{transcription}</p>
        </div>
      )}

      {/* Display the AI-generated answer if available */}
      {answer && (
        <div>
          <h2>Suggested Answer</h2>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}

// Export the App component so it can be used in other parts of the project
export default App;
