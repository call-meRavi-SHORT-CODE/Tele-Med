import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Thermometer, Heart, Zap, Atom as Stomach, Brain, Settings as Lungs } from 'lucide-react-native';
import { LanguageContext } from '@/contexts/LanguageContext';
import { ActionCard } from '@/components/ActionCard';
import { VoiceButton } from '@/components/VoiceButton';
import { useRouter } from 'expo-router';

export default function SymptomsScreen() {
  const { t } = useContext(LanguageContext);
  const router = useRouter();
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);

  const symptoms = [
    {
      id: 'fever',
      title: t('symptoms.fever'),
      icon: Thermometer,
      color: '#EF4444',
      bgColor: '#FEF2F2',
    },
    {
      id: 'cough',
      title: t('symptoms.cough'),
      icon: Lungs,
      color: '#8B5CF6',
      bgColor: '#F5F3FF',
    },
    {
      id: 'pain',
      title: t('symptoms.pain'),
      icon: Zap,
      color: '#F59E0B',
      bgColor: '#FEF3C7',
    },
    {
      id: 'stomach',
      title: t('symptoms.stomach'),
      icon: Stomach,
      color: '#22C55E',
      bgColor: '#F0FDF4',
    },
    {
      id: 'headache',
      title: t('symptoms.headache'),
      icon: Brain,
      color: '#3B82F6',
      bgColor: '#EBF8FF',
    },
    {
      id: 'breathe',
      title: t('symptoms.breathe'),
      icon: Heart,
      color: '#EF4444',
      bgColor: '#FEF2F2',
    },
  ];

  const handleSymptomSelect = (symptomId: string) => {
    // Navigate to detailed symptom assessment
    router.push(`/consultation?symptom=${symptomId}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>{t('symptoms.title')}</Text>
          <Text style={styles.subtitle}>{t('symptoms.subtitle')}</Text>
          <VoiceButton 
            text={`${t('symptoms.title')}. ${t('symptoms.subtitle')}`} 
            type="speak" 
            size={24} 
          />
        </View>

        <View style={styles.content}>
          {symptoms.map((symptom) => (
            <ActionCard
              key={symptom.id}
              title={symptom.title}
              description={`Check if you have ${symptom.title.toLowerCase()}`}
              icon={symptom.icon}
              onPress={() => handleSymptomSelect(symptom.id)}
              backgroundColor={symptom.bgColor}
              iconColor={symptom.color}
            />
          ))}
        </View>

        <View style={styles.voiceInputContainer}>
          <Text style={styles.voiceInputTitle}>Or describe your symptoms</Text>
          <VoiceButton 
            text="Tap to speak about your symptoms" 
            type="listen" 
            size={32} 
            onSpeechResult={(result) => {
              console.log('Voice input:', result);
              // Process voice input and navigate accordingly
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 16,
  },
  content: {
    paddingHorizontal: 8,
  },
  voiceInputContainer: {
    alignItems: 'center',
    paddingVertical: 30,
    marginHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginVertical: 16,
  },
  voiceInputTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
});