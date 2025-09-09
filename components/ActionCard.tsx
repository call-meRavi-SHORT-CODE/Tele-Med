import React, { useContext } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Video as LucideIcon } from 'lucide-react-native';
import { VoiceButton } from './VoiceButton';
import { LanguageContext } from '@/contexts/LanguageContext';

interface ActionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  onPress: () => void;
  backgroundColor?: string;
  iconColor?: string;
}

export function ActionCard({
  title,
  description,
  icon: Icon,
  onPress,
  backgroundColor = '#FFFFFF',
  iconColor = '#3B82F6',
}: ActionCardProps) {
  const { t } = useContext(LanguageContext);

  return (
    <TouchableOpacity style={[styles.card, { backgroundColor }]} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Icon size={48} color={iconColor} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <View style={styles.voiceContainer}>
        <VoiceButton text={`${title}. ${description}`} type="speak" size={20} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  iconContainer: {
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  voiceContainer: {
    marginLeft: 8,
  },
});