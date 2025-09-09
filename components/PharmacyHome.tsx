import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Package, FileText, RefreshCw } from 'lucide-react-native';
import { ActionCard } from './ActionCard';
import { LanguageContext } from '@/contexts/LanguageContext';
import { useRouter } from 'expo-router';

export function PharmacyHome() {
  const { t } = useContext(LanguageContext);
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ActionCard
        title={t('pharmacy.inventory')}
        description="Manage medicine stock and availability"
        icon={Package}
        onPress={() => router.push('/(tabs)/inventory')}
        backgroundColor="#F0FDF4"
        iconColor="#22C55E"
      />

      <ActionCard
        title={t('pharmacy.prescriptions')}
        description="View and fulfill prescription requests"
        icon={FileText}
        onPress={() => {}}
        backgroundColor="#EBF8FF"
        iconColor="#3B82F6"
      />

      <ActionCard
        title={t('pharmacy.update')}
        description="Update stock levels and medicine information"
        icon={RefreshCw}
        onPress={() => {}}
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