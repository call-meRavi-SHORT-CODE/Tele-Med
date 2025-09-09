import React, { useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { AuthContext } from '@/contexts/AuthContext';
import { LanguageContext } from '@/contexts/LanguageContext';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { VoiceButton } from '@/components/VoiceButton';
import { PatientHome } from '@/components/PatientHome';
import { DoctorHome } from '@/components/DoctorHome';
import { PharmacyHome } from '@/components/PharmacyHome';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const { user, logout } = useContext(AuthContext);
  const { t } = useContext(LanguageContext);
  const router = useRouter();

  if (!user) {
    router.replace('/login');
    return null;
  }

  const getWelcomeMessage = () => {
    switch (user.role) {
      case 'patient':
        return t('patient.welcome');
      case 'doctor':
        return t('doctor.welcome');
      case 'pharmacy':
        return t('pharmacy.welcome');
      default:
        return t('common.home');
    }
  };

  const renderRoleSpecificContent = () => {
    switch (user.role) {
      case 'patient':
        return <PatientHome />;
      case 'doctor':
        return <DoctorHome />;
      case 'pharmacy':
        return <PharmacyHome />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <LanguageSwitcher />
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>{getWelcomeMessage()}</Text>
            <Text style={styles.userName}>{user.name}</Text>
            <VoiceButton 
              text={`${getWelcomeMessage()} ${user.name}`} 
              type="speak" 
              size={24} 
            />
          </View>
        </View>

        {renderRoleSpecificContent()}

        <View style={styles.logoutContainer}>
          <VoiceButton 
            text={t('common.logout')} 
            type="speak" 
            size={20} 
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
    paddingVertical: 20,
  },
  welcomeContainer: {
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 8,
  },
  userName: {
    fontSize: 18,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 16,
  },
  logoutContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
});