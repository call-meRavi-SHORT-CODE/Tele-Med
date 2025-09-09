import React, { useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { User, Clock, MessageCircle, Phone } from 'lucide-react-native';
import { LanguageContext } from '@/contexts/LanguageContext';
import { VoiceButton } from '@/components/VoiceButton';

const patientRequests = [
  {
    id: '1',
    name: 'Rajesh Singh',
    age: 45,
    symptoms: 'Fever, Headache, Body pain',
    requestTime: '10 minutes ago',
    type: 'urgent',
    phone: '+91 98765 43210'
  },
  {
    id: '2',
    name: 'Priya Kaur',
    age: 32,
    symptoms: 'Cough, Sore throat',
    requestTime: '25 minutes ago',
    type: 'normal',
    phone: '+91 98765 43211'
  },
  {
    id: '3',
    name: 'Amarjit Sharma',
    age: 58,
    symptoms: 'Chest pain, Shortness of breath',
    requestTime: '1 hour ago',
    type: 'urgent',
    phone: '+91 98765 43212'
  }
];

export default function PatientsScreen() {
  const { t } = useContext(LanguageContext);

  const PatientCard = ({ patient }: { patient: any }) => (
    <View style={[styles.patientCard, patient.type === 'urgent' && styles.urgentCard]}>
      <View style={styles.patientHeader}>
        <View style={styles.patientInfo}>
          <View style={styles.patientAvatar}>
            <User size={24} color="#FFFFFF" />
          </View>
          <View style={styles.patientDetails}>
            <Text style={styles.patientName}>{patient.name}</Text>
            <Text style={styles.patientAge}>Age: {patient.age}</Text>
            <Text style={styles.requestTime}>{patient.requestTime}</Text>
          </View>
        </View>
        <View style={styles.urgencyBadge}>
          {patient.type === 'urgent' && (
            <View style={styles.urgentBadge}>
              <Text style={styles.urgentText}>URGENT</Text>
            </View>
          )}
        </View>
      </View>
      
      <View style={styles.symptomsSection}>
        <Text style={styles.symptomsTitle}>Symptoms:</Text>
        <Text style={styles.symptomsText}>{patient.symptoms}</Text>
      </View>

      <View style={styles.actionsSection}>
        <TouchableOpacity style={styles.actionButton}>
          <MessageCircle size={20} color="#3B82F6" />
          <Text style={styles.actionText}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Phone size={20} color="#22C55E" />
          <Text style={styles.actionText}>Call</Text>
        </TouchableOpacity>
        <VoiceButton 
          text={`Patient ${patient.name}, age ${patient.age}, symptoms: ${patient.symptoms}, requested ${patient.requestTime}`}
          type="speak" 
          size={18} 
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Patient Requests</Text>
          <Text style={styles.subtitle}>Consultation requests from patients</Text>
          <VoiceButton 
            text="Patient Requests. Consultation requests from patients" 
            type="speak" 
            size={24} 
          />
        </View>

        <View style={styles.content}>
          {patientRequests.map((patient) => (
            <PatientCard key={patient.id} patient={patient} />
          ))}
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
  patientCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  urgentCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#EF4444',
  },
  patientHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  patientInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  patientAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  patientDetails: {
    flex: 1,
  },
  patientName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  patientAge: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  requestTime: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  urgencyBadge: {
    alignItems: 'center',
  },
  urgentBadge: {
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  urgentText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#DC2626',
  },
  symptomsSection: {
    marginBottom: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  symptomsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  symptomsText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  actionsSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F9FAFB',
  },
  actionText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
});