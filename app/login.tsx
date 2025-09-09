import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { User, Stethoscope, Pill } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { AuthContext } from '@/contexts/AuthContext';
import { LanguageContext } from '@/contexts/LanguageContext';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { ActionCard } from '@/components/ActionCard';
import { VoiceButton } from '@/components/VoiceButton';

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useContext(AuthContext);
  const { t } = useContext(LanguageContext);

  const handleRoleSelect = async (role: 'patient' | 'doctor' | 'pharmacy') => {
    const userData = {
      id: `${role}_${Date.now()}`,
      name: `${role} User`,
      role,
    };
    
    await login(userData);
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <LanguageSwitcher />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{t('login.title')}</Text>
          <Text style={styles.subtitle}>{t('login.subtitle')}</Text>
          <VoiceButton 
            text={`${t('login.title')}. ${t('login.subtitle')}`} 
            type="speak" 
            size={24} 
          />
        </View>
      </View>

      <View style={styles.content}>
        <ActionCard
          title={t('roles.patient')}
          description={t('login.patientDesc')}
          icon={User}
          onPress={() => handleRoleSelect('patient')}
          backgroundColor="#EBF8FF"
          iconColor="#3B82F6"
        />

        <ActionCard
          title={t('roles.doctor')}
          description={t('login.doctorDesc')}
          icon={Stethoscope}
          onPress={() => handleRoleSelect('doctor')}
          backgroundColor="#F0FDF4"
          iconColor="#22C55E"
        />

        <ActionCard
          title={t('roles.pharmacy')}
          description={t('login.pharmacyDesc')}
          icon={Pill}
          onPress={() => handleRoleSelect('pharmacy')}
          backgroundColor="#FEF3C7"
          iconColor="#F59E0B"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    paddingVertical: 20,
  },
  titleContainer: {
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 20,
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
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
});