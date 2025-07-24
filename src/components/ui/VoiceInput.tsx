import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface VoiceInputProps {
  onResult: (text: string) => void;
  isListening: boolean;
  onToggle: () => void;
}

export function VoiceInput({ onResult, isListening, onToggle }: VoiceInputProps) {
  const [transcript, setTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // Check if speech recognition is supported
    setIsSupported('webkitSpeechRecognition' in window || 'SpeechRecognition' in window);
  }, []);

  const handleVoiceInput = () => {
    if (!isSupported) {
      // Mock voice input for demo
      const mockResponses = [
        "Create a new note about quantum computing",
        "Remember to review the project proposal",
        "Schedule a meeting for tomorrow at 3 PM",
        "Add task: Finish the dashboard design",
        "Note: Great ideas come from deep focus sessions"
      ];
      
      const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
      setTranscript(randomResponse);
      
      setTimeout(() => {
        onResult(randomResponse);
        setTranscript('');
      }, 2000);
      
      return;
    }

    // Real speech recognition would go here
    onToggle();
  };

  return (
    <div className="relative">
      <motion.button
        onClick={handleVoiceInput}
        className={`relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
          isListening 
            ? 'bg-gradient-cyber shadow-glow-intense' 
            : 'bg-card/60 border border-cyber-blue/30 hover:border-cyber-blue hover:shadow-glow-blue'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={isListening ? {
          boxShadow: [
            '0 0 20px hsl(var(--cyber-blue) / 0.5)',
            '0 0 40px hsl(var(--cyber-blue) / 0.8)',
            '0 0 20px hsl(var(--cyber-blue) / 0.5)'
          ]
        } : {}}
        transition={{ duration: 1, repeat: isListening ? Infinity : 0 }}
      >
        {/* Microphone Icon */}
        <motion.svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className={`transition-colors duration-300 ${
            isListening ? 'text-background' : 'text-cyber-blue'
          }`}
          animate={isListening ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 0.5, repeat: isListening ? Infinity : 0 }}
        >
          <path
            d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3Z"
            fill="currentColor"
          />
          <path
            d="M19 10v2a7 7 0 0 1-14 0v-2"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M12 19v4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8 23h8"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>

        {/* Pulse rings when listening */}
        {isListening && (
          <div className="absolute inset-0">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute inset-0 rounded-full border border-cyber-blue"
                animate={{
                  scale: [1, 2],
                  opacity: [0.5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: 'easeOut'
                }}
              />
            ))}
          </div>
        )}
      </motion.button>

      {/* Transcript display */}
      <AnimatePresence>
        {transcript && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            className="absolute top-20 left-1/2 transform -translate-x-1/2 w-64 bg-card/90 backdrop-blur-sm border border-cyber-blue/30 rounded-lg p-3 shadow-glow-blue"
          >
            <div className="text-xs text-cyber-blue font-orbitron font-bold mb-1">
              Voice Input Detected:
            </div>
            <div className="text-sm text-foreground font-exo">
              {transcript}
            </div>
            
            {/* Animated dots */}
            <div className="flex items-center justify-center mt-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-1 h-1 bg-cyber-blue rounded-full mx-1"
                  animate={{
                    opacity: [0.3, 1, 0.3],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Status indicator */}
      <motion.div
        className={`absolute -top-1 -right-1 w-4 h-4 rounded-full ${
          isListening ? 'bg-cyber-green' : 'bg-muted'
        }`}
        animate={isListening ? {
          scale: [1, 1.3, 1],
        } : {}}
        transition={{ duration: 1, repeat: isListening ? Infinity : 0 }}
      />
    </div>
  );
}