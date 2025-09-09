import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Users, Calendar, FileText } from 'lucide-react-native';
import { ActionCard } from './ActionCard';
import { LanguageContext } from '@/contexts/LanguageContext';
import { useRouter } from 'expo-router';

export function DoctorHome() {
  const { t } = useContext(LanguageContext);
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ActionCard
        title={t('doctor.patients')}
        description="View and respond to patient consultation requests"
        icon={Users}
        onPress={() => router.push('/(tabs)/patients')}
        backgroundColor="#EBF8FF"
        iconColor="#3B82F6"
      />

      <ActionCard
        title={t('doctor.schedule')}
        description="Manage your consultation schedule"
        icon={Calendar}
        onPress={() => {}}
        backgroundColor="#F0FDF4"
        iconColor="#22C55E"
      />

      <ActionCard
        title={t('doctor.prescriptions')}
        description="Create and manage prescriptions"
        icon={FileText}
        onPress={() => router.push('/prescription')}
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