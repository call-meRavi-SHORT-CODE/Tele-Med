import React, { useContext } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Volume2, Mic } from 'lucide-react-native';
import { LanguageContext } from '@/contexts/LanguageContext';
import * as Speech from 'expo-speech';

interface VoiceButtonProps {
  text: string;
  type: 'speak' | 'listen';
  onSpeechResult?: (result: string) => void;
  size?: number;
}

export function VoiceButton({ text, type, onSpeechResult, size = 24 }: VoiceButtonProps) {
  const { language } = useContext(LanguageContext);

  const handleSpeak = () => {
    const languageCode = language === 'hi' ? 'hi-IN' : language === 'pa' ? 'pa-IN' : 'en-US';
    
    Speech.speak(text, {
      language: languageCode,
      rate: 0.8,
      pitch: 1.0,
    });
  };

  const handleListen = () => {
    // Placeholder for speech-to-text functionality
    // In a real app, you would use expo-speech or a third-party STT service
    console.log('Starting speech recognition...');
    if (onSpeechResult) {
      // Mock speech result for demonstration
      setTimeout(() => {
        onSpeechResult('मुझे बुखार है'); // Example result
      }, 2000);
    }
  };

  const handlePress = () => {
    if (type === 'speak') {
      handleSpeak();
    } else {
      handleListen();
    }
  };

  return (
    <TouchableOpacity 
      style={[styles.button, type === 'speak' ? styles.speakButton : styles.listenButton]}
      onPress={handlePress}
    >
      {type === 'speak' ? (
        <Volume2 size={size} color="#FFFFFF" />
      ) : (
        <Mic size={size} color="#FFFFFF" />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 12,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  speakButton: {
    backgroundColor: '#22C55E',
  },
  listenButton: {
    backgroundColor: '#3B82F6',
  },
});