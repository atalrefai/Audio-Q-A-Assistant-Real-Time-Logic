<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Audio Q&A Assistant</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
        .App {
            background-color: #fff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            width: 400px;
            text-align: center;
        }
        button {
            padding: 10px 20px;
            margin: 10px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
        button:disabled {
            background-color: #ccc;
            cursor: not-allowed;
        }
        button:not(:disabled) {
            background-color: #007bff;
            color: white;
        }
        audio {
            margin-top: 20px;
        }
        h2 {
            margin-top: 20px;
        }
        p {
            font-size: 1rem;
            text-align: left;
        }
        .loading {
            font-style: italic;
            color: #888;
        }
    </style>
</head>
<body>
    <div class="App">
        <h1>Audio Q&A Assistant</h1>

        <!-- Button controls for starting and stopping the audio recording -->
        <div>
            <button id="startRecordingBtn">Start Recording</button>
            <button id="stopRecordingBtn" disabled>Stop Recording</button>
        </div>

        <!-- Display the recorded audio as a playable audio element -->
        <audio id="audioPlayback" controls="controls" style="display:none;"></audio>

        <!-- Display loading message while transcription and AI processing is happening -->
        <p id="loadingMessage" class="loading" style="display:none;">Loading, please wait...</p>

        <!-- Display the transcription result if available -->
        <div id="transcriptionResult" style="display:none;">
            <h2>Transcription</h2>
            <p id="transcriptionText"></p>
        </div>

        <!-- Display the AI-generated answer if available -->
        <div id="answerResult" style="display:none;">
            <h2>Suggested Answer</h2>
            <p id="answerText"></p>
        </div>
    </div>

    <script>
        const startRecordingBtn = document.getElementById('startRecordingBtn');
        const stopRecordingBtn = document.getElementById('stopRecordingBtn');
        const audioPlayback = document.getElementById('audioPlayback');
        const loadingMessage = document.getElementById('loadingMessage');
        const transcriptionResult = document.getElementById('transcriptionResult');
        const transcriptionText = document.getElementById('transcriptionText');
        const answerResult = document.getElementById('answerResult');
        const answerText = document.getElementById('answerText');

        let mediaRecorder;
        let audioChunks = [];

        // Function to start audio recording
        startRecordingBtn.addEventListener('click', () => {
            navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
                mediaRecorder = new MediaRecorder(stream);
                mediaRecorder.ondataavailable = event => audioChunks.push(event.data);
                mediaRecorder.onstop = handleStopRecording;
                mediaRecorder.start();

                startRecordingBtn.disabled = true;
                stopRecordingBtn.disabled = false;
            });
        });

        // Function to stop audio recording
        stopRecordingBtn.addEventListener('click', () => {
            mediaRecorder.stop();
            startRecordingBtn.disabled = false;
            stopRecordingBtn.disabled = true;
        });

        // Function to handle audio stop and process the recorded data
        function handleStopRecording() {
            const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
            const audioURL = URL.createObjectURL(audioBlob);
            audioPlayback.src = audioURL;
            audioPlayback.style.display = 'block';
            audioChunks = [];

            uploadAudio(audioBlob);
        }

        // Function to upload audio to the server and handle the response
        function uploadAudio(blob) {
            const formData = new FormData();
            formData.append('audio', blob);

            loadingMessage.style.display = 'block';
            transcriptionResult.style.display = 'none';
            answerResult.style.display = 'none';

            fetch('http://localhost:5000/transcribe', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                loadingMessage.style.display = 'none';

                transcriptionText.textContent = data.transcription;
                answerText.textContent = data.answer;

                transcriptionResult.style.display = 'block';
                answerResult.style.display = 'block';
            })
            .catch(error => {
                console.error('Error:', error);
                loadingMessage.textContent = 'Error occurred during transcription or Q&A processing.';
            });
        }
    </script>
</body>
</html>
