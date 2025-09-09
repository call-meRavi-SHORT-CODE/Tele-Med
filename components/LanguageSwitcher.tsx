import React, { useContext } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Languages } from 'lucide-react-native';
import { LanguageContext } from '@/contexts/LanguageContext';

export function LanguageSwitcher() {
  const { language, setLanguage } = useContext(LanguageContext);

  const languages = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'hi', label: 'Hindi', native: 'हिंदी' },
    { code: 'pa', label: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
  ];

  return (
    <View style={styles.container}>
      <Languages size={20} color="#6B7280" />
      <View style={styles.buttonContainer}>
        {languages.map((lang) => (
          <TouchableOpacity
            key={lang.code}
            style={[
              styles.languageButton,
              language === lang.code && styles.activeLanguageButton,
            ]}
            onPress={() => setLanguage(lang.code as any)}
          >
            <Text
              style={[
                styles.languageText,
                language === lang.code && styles.activeLanguageText,
              ]}
            >
              {lang.native}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    padding: 8,
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginLeft: 8,
  },
  languageButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginHorizontal: 2,
  },
  activeLanguageButton: {
    backgroundColor: '#3B82F6',
  },
  languageText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  activeLanguageText: {
    color: '#FFFFFF',
  },
});