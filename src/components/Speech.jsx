import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Button, Typography, Box } from '@mui/material';
import { Mic as MicIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';

const Speech = () => {
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    const [savedTranscript, setSavedTranscript] = useState("");

    useEffect(() => {
        setSavedTranscript(transcript);
        console.log(savedTranscript);
    }, [transcript]);

    if (!browserSupportsSpeechRecognition) {
        return <Typography variant="h6">Browser doesn't support speech recognition.</Typography>;
    }

    const startListeningWithContinuous = () => {
        SpeechRecognition.startListening({ continuous: true });
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            textAlign="center"
            sx={{ gap: 3 }}
        >
            <Typography variant="h4" color="primary">
                Voice to Text Converter
            </Typography>
            <motion.div animate={listening ? { scale: [1, 1.2, 1] } : {}} transition={{ repeat: Infinity, duration: 1 }}>
                <MicIcon color="secondary" style={{ fontSize: 50 }} />
            </motion.div>
            <Typography variant="subtitle1">
                {listening ? 'Listening...' : 'Click "Start" to begin'}
            </Typography>
            <Box sx={{ gap: 2, mt: 2 }} display="flex">
                <Button variant="outlined" color="primary" onClick={startListeningWithContinuous}>
                    Start
                </Button>
                <Button variant="outlined" color="primary" onClick={SpeechRecognition.stopListening}>
                    Stop
                </Button>
                <Button variant="outlined" color="error" onClick={resetTranscript}>
                    Reset
                </Button>
            </Box>
            <Typography variant="body1">
                {savedTranscript}
            </Typography>
        </Box>
    );
};

export default Speech;
