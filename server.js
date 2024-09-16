//this is server.js from node js 
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const speech = require('@google-cloud/speech');
const mic = require('mic');
const { OpenAI } = require('openai');

// Google Cloud Speech-to-Text setup
const speechClient = new speech.SpeechClient({
    keyFilename: 'write your API Google'
});

// OpenAI setup
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // لدعم تحميل البيانات النصية

let recognizeStream;

app.post('/transcribe', (req, res) => {
    console.log("Step 1: Starting live transcription process");

    // Adjust config for Google Speech-to-Text
    const request = {
        config: {
            encoding: 'LINEAR16',
            sampleRateHertz: 16000, // Adjust sample rate to match microphone
            languageCode: 'en-US', // Adjust the language as needed
            speechContexts: [
                {
                    phrases: ["hello", "how are you", "example phrases"], // Add expected phrases to improve recognition
                    boost: 15 // Boost recognition for these phrases
                }
            ]
        },
        interimResults: true
    };

    let transcription = '';
    let responseSent = false;

    // Google Cloud Speech-to-Text stream setup
    recognizeStream = speechClient
        .streamingRecognize(request)
        .on('error', error => {
            console.error('Error during streaming recognition:', error);
            if (!responseSent) {
                res.status(500).json({ error: 'Error during streaming recognition' });
                responseSent = true;
            }
        })
        .on('data', data => {
            console.log("Step 2: Received data from Google Cloud Speech-to-Text");

            if (data.results && data.results[0] && data.results[0].alternatives[0]) {
                const interimTranscript = data.results[0].alternatives[0].transcript;
                console.log('Interim Transcription:', interimTranscript);

                if (data.results[0].isFinal) {
                    transcription += interimTranscript + " ";
                    console.log('Final Transcript (Updated):', transcription);
                }
            } else {
                console.log('No transcription data available');
            }
        })
        .on('end', async () => {
            console.log("Step 3: Transcription process ended");

            if (!responseSent && transcription.trim() !== '') {
                console.log('Final Transcription:', transcription);

                try {
                    console.log("Step 4: Sending transcription to OpenAI");

                    const response = await openai.chat.completions.create({
                        model: "gpt-3.5-turbo",
                        messages: [
                            { role: "system", content: "You are a helpful assistant." },
                            { role: "user", content: `Answer the following question based on this transcription: ${transcription}` }
                        ],
                        max_tokens: 100,
                    });

                    const answer = response.choices[0].message.content.trim();
                    console.log('OpenAI Answer:', answer);
                    res.json({ transcription, answer }); // إرسال النص والإجابة للواجهة
                } catch (error) {
                    console.error('Error generating answer from OpenAI:', error);
                    res.status(500).json({ error: 'Error generating answer from OpenAI' });
                }
                responseSent = true;
            } else if (!responseSent) {
                console.log('No valid transcription found.');
                res.status(400).json({ error: 'No valid transcription found' });
                responseSent = true;
            }
        });

    // Microphone setup using mic
    const micInstance = mic({
        rate: '16000',
        channels: '1',
        debug: true,
        exitOnSilence: 10 // Stop recording after 6 seconds of silence
    });

    const micInputStream = micInstance.getAudioStream();

    micInputStream.on('data', data => {
        console.log("Step 5: Receiving audio input, size:", data.length);
        recognizeStream.write(data);
    });

    micInputStream.on('error', error => {
        console.error('Error capturing audio:', error);
        if (!responseSent) {
            res.status(500).json({ error: 'Error capturing audio' });
            responseSent = true;
        }
    });

    micInstance.start();

    // Stop recording after 15 seconds
    setTimeout(() => {
        console.log("Step 6: Stopping microphone and ending stream");
        micInstance.stop();
        recognizeStream.end();
    }, 15000); // Increase the recording time to ensure proper capture
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
