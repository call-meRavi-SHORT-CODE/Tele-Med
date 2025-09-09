import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Video, Phone, MessageCircle, Clock } from 'lucide-react-native';
import { LanguageContext } from '@/contexts/LanguageContext';
import { VoiceButton } from '@/components/VoiceButton';
import { dummyDoctors } from '@/constants/dummyData';
import { useRouter } from 'expo-router';

export default function ConsultationScreen() {
  const { t } = useContext(LanguageContext);
  const router = useRouter();
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);

  const consultationTypes = [
    {
      id: 'video',
      title: 'Video Call',
      description: 'Face-to-face consultation',
      icon: Video,
      color: '#3B82F6',
      bgColor: '#EBF8FF',
    },
    {
      id: 'audio',
      title: 'Audio Call',
      description: 'Voice-only consultation',
      icon: Phone,
      color: '#22C55E',
      bgColor: '#F0FDF4',
    },
    {
      id: 'chat',
      title: 'Text Chat',
      description: 'Written conversation',
      icon: MessageCircle,
      color: '#F59E0B',
      bgColor: '#FEF3C7',
    },
  ];

  const DoctorCard = ({ doctor }: { doctor: any }) => (
    <TouchableOpacity
      style={[
        styles.doctorCard,
        selectedDoctor === doctor.id && styles.selectedDoctorCard,
      ]}
      onPress={() => setSelectedDoctor(doctor.id)}
    >
      <View style={styles.doctorInfo}>
        <View style={styles.doctorAvatar}>
          <Text style={styles.doctorInitials}>
            {doctor.name.split(' ').map((n: string) => n[0]).join('')}
          </Text>
        </View>
        <View style={styles.doctorDetails}>
          <Text style={styles.doctorName}>{doctor.name}</Text>
          <Text style={styles.doctorSpecialization}>{doctor.specialization}</Text>
          <Text style={styles.doctorExperience}>{doctor.experience}</Text>
          <Text style={styles.doctorDistance}>{doctor.distance} away</Text>
        </View>
      </View>
      <View style={styles.doctorMeta}>
        <View style={[styles.availabilityBadge, doctor.available ? styles.available : styles.unavailable]}>
          <Text style={[styles.availabilityText, doctor.available ? styles.availableText : styles.unavailableText]}>
            {doctor.available ? 'Available' : 'Busy'}
          </Text>
        </View>
        <Text style={styles.consultationFee}>₹{doctor.consultationFee}</Text>
        <VoiceButton 
          text={`Doctor ${doctor.name}, ${doctor.specialization}, ${doctor.experience} experience, ${doctor.distance} away, consultation fee ${doctor.consultationFee} rupees`}
          type="speak" 
          size={18} 
        />
      </View>
    </TouchableOpacity>
  );

  const ConsultationTypeCard = ({ type }: { type: any }) => (
    <TouchableOpacity style={[styles.typeCard, { backgroundColor: type.bgColor }]}>
      <type.icon size={32} color={type.color} />
      <Text style={styles.typeTitle}>{type.title}</Text>
      <Text style={styles.typeDescription}>{type.description}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Doctor Consultation</Text>
          <Text style={styles.subtitle}>Choose a doctor and consultation type</Text>
          <VoiceButton 
            text="Doctor Consultation. Choose a doctor and consultation type" 
            type="speak" 
            size={24} 
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available Doctors</Text>
          {dummyDoctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </View>

        {selectedDoctor && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Consultation Type</Text>
            <View style={styles.typeGrid}>
              {consultationTypes.map((type) => (
                <ConsultationTypeCard key={type.id} type={type} />
              ))}
            </View>
          </View>
        )}

        {selectedDoctor && (
          <View style={styles.bookingContainer}>
            <TouchableOpacity 
              style={styles.bookButton}
              onPress={() => {
                // Navigate to booking confirmation or payment
                router.push('/prescription');
              }}
            >
              <Text style={styles.bookButtonText}>Book Consultation</Text>
            </TouchableOpacity>
          </View>
        )}
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
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  doctorCard: {
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
  selectedDoctorCard: {
    borderWidth: 2,
    borderColor: '#3B82F6',
  },
  doctorInfo: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  doctorAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  doctorInitials: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  doctorDetails: {
    flex: 1,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  doctorSpecialization: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  doctorExperience: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  doctorDistance: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  doctorMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  availabilityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  available: {
    backgroundColor: '#DCFCE7',
  },
  unavailable: {
    backgroundColor: '#FEE2E2',
  },
  availabilityText: {
    fontSize: 12,
    fontWeight: '500',
  },
  availableText: {
    color: '#166534',
  },
  unavailableText: {
    color: '#991B1B',
  },
  consultationFee: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  typeGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  typeCard: {
    width: '30%',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  typeTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginTop: 8,
    textAlign: 'center',
  },
  typeDescription: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
    textAlign: 'center',
  },
  bookingContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  bookButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  bookButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});