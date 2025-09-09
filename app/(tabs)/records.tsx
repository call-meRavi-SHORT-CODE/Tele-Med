import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { FileText, Calendar, User, Pill } from 'lucide-react-native';
import { LanguageContext } from '@/contexts/LanguageContext';
import { VoiceButton } from '@/components/VoiceButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface HealthRecord {
  id: string;
  date: string;
  type: 'consultation' | 'prescription' | 'test';
  doctor: string;
  symptoms: string;
  diagnosis: string;
  medicines?: string[];
}

export default function RecordsScreen() {
  const { t } = useContext(LanguageContext);
  const [records, setRecords] = useState<HealthRecord[]>([]);

  useEffect(() => {
    loadHealthRecords();
  }, []);

  const loadHealthRecords = async () => {
    try {
      const storedRecords = await AsyncStorage.getItem('healthRecords');
      if (storedRecords) {
        setRecords(JSON.parse(storedRecords));
      } else {
        // Load dummy data
        const dummyRecords: HealthRecord[] = [
          {
            id: '1',
            date: '2024-01-15',
            type: 'consultation',
            doctor: 'Dr. Rajesh Kumar',
            symptoms: 'Fever, Headache',
            diagnosis: 'Viral Fever',
            medicines: ['Paracetamol', 'Rest'],
          },
          {
            id: '2',
            date: '2024-01-10',
            type: 'prescription',
            doctor: 'Dr. Priya Singh',
            symptoms: 'Cough, Sore throat',
            diagnosis: 'Common Cold',
            medicines: ['Cough Syrup', 'Throat lozenges'],
          },
        ];
        setRecords(dummyRecords);
        await AsyncStorage.setItem('healthRecords', JSON.stringify(dummyRecords));
      }
    } catch (error) {
      console.error('Error loading health records:', error);
    }
  };

  const getRecordIcon = (type: string) => {
    switch (type) {
      case 'consultation':
        return User;
      case 'prescription':
        return Pill;
      default:
        return FileText;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const RecordCard = ({ record }: { record: HealthRecord }) => {
    const IconComponent = getRecordIcon(record.type);
    
    return (
      <TouchableOpacity style={styles.recordCard}>
        <View style={styles.recordHeader}>
          <View style={styles.recordIconContainer}>
            <IconComponent size={24} color="#3B82F6" />
          </View>
          <View style={styles.recordHeaderText}>
            <Text style={styles.recordDate}>{formatDate(record.date)}</Text>
            <Text style={styles.recordDoctor}>{record.doctor}</Text>
          </View>
          <VoiceButton 
            text={`Record from ${formatDate(record.date)}. Doctor ${record.doctor}. Symptoms: ${record.symptoms}. Diagnosis: ${record.diagnosis}`}
            type="speak" 
            size={20} 
          />
        </View>
        <View style={styles.recordContent}>
          <Text style={styles.recordTitle}>Symptoms:</Text>
          <Text style={styles.recordText}>{record.symptoms}</Text>
          <Text style={styles.recordTitle}>Diagnosis:</Text>
          <Text style={styles.recordText}>{record.diagnosis}</Text>
          {record.medicines && (
            <>
              <Text style={styles.recordTitle}>Medicines:</Text>
              <Text style={styles.recordText}>{record.medicines.join(', ')}</Text>
            </>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>{t('patient.records')}</Text>
          <Text style={styles.subtitle}>Your health history</Text>
          <VoiceButton 
            text={`${t('patient.records')}. Your health history`} 
            type="speak" 
            size={24} 
          />
        </View>

        <View style={styles.content}>
          {records.length > 0 ? (
            records.map((record) => (
              <RecordCard key={record.id} record={record} />
            ))
          ) : (
            <View style={styles.emptyState}>
              <FileText size={64} color="#D1D5DB" />
              <Text style={styles.emptyText}>No health records found</Text>
              <Text style={styles.emptySubtext}>Your consultation history will appear here</Text>
            </View>
          )}
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
    paddingHorizontal: 16,
  },
  recordCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  recordHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  recordIconContainer: {
    marginRight: 12,
  },
  recordHeaderText: {
    flex: 1,
  },
  recordDate: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  recordDoctor: {
    fontSize: 14,
    color: '#6B7280',
  },
  recordContent: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 12,
  },
  recordTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
    marginTop: 8,
  },
  recordText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#9CA3AF',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#D1D5DB',
    marginTop: 4,
  },
});