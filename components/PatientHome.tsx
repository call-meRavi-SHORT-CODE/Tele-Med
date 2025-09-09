import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Activity, MessageCircle, FileText, MapPin } from 'lucide-react-native';
import { ActionCard } from './ActionCard';
import { LanguageContext } from '@/contexts/LanguageContext';
import { useRouter } from 'expo-router';

export function PatientHome() {
  const { t } = useContext(LanguageContext);
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ActionCard
        title={t('patient.symptoms')}
        description={t('patient.symptomsDesc')}
        icon={Activity}
        onPress={() => router.push('/symptoms')}
        backgroundColor="#FEF2F2"
        iconColor="#EF4444"
      />

      <ActionCard
        title={t('patient.consultation')}
        description={t('patient.consultationDesc')}
        icon={MessageCircle}
        onPress={() => router.push('/consultation')}
        backgroundColor="#EBF8FF"
        iconColor="#3B82F6"
      />

      <ActionCard
        title={t('patient.records')}
        description={t('patient.recordsDesc')}
        icon={FileText}
        onPress={() => router.push('/(tabs)/records')}
        backgroundColor="#F0FDF4"
        iconColor="#22C55E"
      />

      <ActionCard
        title={t('patient.pharmacy')}
        description={t('patient.pharmacyDesc')}
        icon={MapPin}
        onPress={() => router.push('/pharmacy')}
        backgroundColor="#FEF3C7"
        iconColor="#F59E0B"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
});