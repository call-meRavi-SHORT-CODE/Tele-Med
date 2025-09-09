import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { FileText, User, Calendar, Pill, Camera, Save } from 'lucide-react-native';
import { LanguageContext } from '@/contexts/LanguageContext';
import { VoiceButton } from '@/components/VoiceButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function PrescriptionScreen() {
  const { t } = useContext(LanguageContext);
  const router = useRouter();
  const [prescriptionData, setPrescriptionData] = useState({
    patientName: 'Rajesh Singh',
    patientAge: '45',
    diagnosis: '',
    medicines: [
      { name: '', dosage: '', duration: '', instructions: '' }
    ],
    notes: ''
  });

  const addMedicine = () => {
    setPrescriptionData(prev => ({
      ...prev,
      medicines: [
        ...prev.medicines,
        { name: '', dosage: '', duration: '', instructions: '' }
      ]
    }));
  };

  const updateMedicine = (index: number, field: string, value: string) => {
    const updatedMedicines = [...prescriptionData.medicines];
    updatedMedicines[index] = { ...updatedMedicines[index], [field]: value };
    setPrescriptionData(prev => ({ ...prev, medicines: updatedMedicines }));
  };

  const savePrescription = async () => {
    try {
      const prescription = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        doctor: 'Dr. Current User', // This would come from auth context
        ...prescriptionData
      };

      // Save to patient's health records
      const existingRecords = await AsyncStorage.getItem('healthRecords');
      const records = existingRecords ? JSON.parse(existingRecords) : [];
      
      const healthRecord = {
        id: prescription.id,
        date: prescription.date,
        type: 'prescription',
        doctor: prescription.doctor,
        symptoms: 'As diagnosed',
        diagnosis: prescription.diagnosis,
        medicines: prescription.medicines.map(med => med.name)
      };

      records.push(healthRecord);
      await AsyncStorage.setItem('healthRecords', JSON.stringify(records));
      
      // Save prescription
      const existingPrescriptions = await AsyncStorage.getItem('prescriptions');
      const prescriptions = existingPrescriptions ? JSON.parse(existingPrescriptions) : [];
      prescriptions.push(prescription);
      await AsyncStorage.setItem('prescriptions', JSON.stringify(prescriptions));

      console.log('Prescription saved successfully');
      router.back();
    } catch (error) {
      console.error('Error saving prescription:', error);
    }
  };

  const MedicineForm = ({ medicine, index }: { medicine: any, index: number }) => (
    <View style={styles.medicineCard}>
      <Text style={styles.medicineTitle}>Medicine {index + 1}</Text>
      
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Medicine Name</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter medicine name"
          value={medicine.name}
          onChangeText={(value) => updateMedicine(index, 'name', value)}
        />
      </View>

      <View style={styles.inputRow}>
        <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
          <Text style={styles.inputLabel}>Dosage</Text>
          <TextInput
            style={styles.textInput}
            placeholder="e.g., 500mg"
            value={medicine.dosage}
            onChangeText={(value) => updateMedicine(index, 'dosage', value)}
          />
        </View>
        <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
          <Text style={styles.inputLabel}>Duration</Text>
          <TextInput
            style={styles.textInput}
            placeholder="e.g., 5 days"
            value={medicine.duration}
            onChangeText={(value) => updateMedicine(index, 'duration', value)}
          />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Instructions</Text>
        <TextInput
          style={styles.textInput}
          placeholder="e.g., Take after meals"
          value={medicine.instructions}
          onChangeText={(value) => updateMedicine(index, 'instructions', value)}
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Create Prescription</Text>
          <Text style={styles.subtitle}>Fill in patient prescription details</Text>
          <VoiceButton 
            text="Create Prescription. Fill in patient prescription details" 
            type="speak" 
            size={24} 
          />
        </View>

        <View style={styles.content}>
          {/* Patient Info */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <User size={24} color="#3B82F6" />
              <Text style={styles.sectionTitle}>Patient Information</Text>
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Patient Name</Text>
              <TextInput
                style={styles.textInput}
                value={prescriptionData.patientName}
                onChangeText={(value) => setPrescriptionData(prev => ({ ...prev, patientName: value }))}
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Age</Text>
              <TextInput
                style={styles.textInput}
                value={prescriptionData.patientAge}
                onChangeText={(value) => setPrescriptionData(prev => ({ ...prev, patientAge: value }))}
                keyboardType="numeric"
              />
            </View>
          </View>

          {/* Diagnosis */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <FileText size={24} color="#22C55E" />
              <Text style={styles.sectionTitle}>Diagnosis</Text>
            </View>
            
            <View style={styles.inputGroup}>
              <TextInput
                style={[styles.textInput, styles.textArea]}
                placeholder="Enter diagnosis..."
                value={prescriptionData.diagnosis}
                onChangeText={(value) => setPrescriptionData(prev => ({ ...prev, diagnosis: value }))}
                multiline
                numberOfLines={3}
              />
            </View>
          </View>

          {/* Medicines */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Pill size={24} color="#F59E0B" />
              <Text style={styles.sectionTitle}>Medicines</Text>
            </View>

            {prescriptionData.medicines.map((medicine, index) => (
              <MedicineForm key={index} medicine={medicine} index={index} />
            ))}

            <TouchableOpacity style={styles.addButton} onPress={addMedicine}>
              <Text style={styles.addButtonText}>+ Add Another Medicine</Text>
            </TouchableOpacity>
          </View>

          {/* Notes */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <FileText size={24} color="#8B5CF6" />
              <Text style={styles.sectionTitle}>Additional Notes</Text>
            </View>
            
            <View style={styles.inputGroup}>
              <TextInput
                style={[styles.textInput, styles.textArea]}
                placeholder="Any additional instructions or notes..."
                value={prescriptionData.notes}
                onChangeText={(value) => setPrescriptionData(prev => ({ ...prev, notes: value }))}
                multiline
                numberOfLines={3}
              />
            </View>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.saveButton} onPress={savePrescription}>
              <Save size={20} color="#FFFFFF" />
              <Text style={styles.saveButtonText}>Save Prescription</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cameraButton}>
              <Camera size={20} color="#6B7280" />
              <Text style={styles.cameraButtonText}>Take Photo</Text>
            </TouchableOpacity>
          </View>
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
  section: {
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
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginLeft: 8,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputRow: {
    flexDirection: 'row',
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 6,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: '#1F2937',
    backgroundColor: '#FFFFFF',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  medicineCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  medicineTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  addButton: {
    borderWidth: 2,
    borderColor: '#D1D5DB',
    borderStyle: 'dashed',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  addButtonText: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  saveButton: {
    backgroundColor: '#22C55E',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
    justifyContent: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  cameraButton: {
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
    justifyContent: 'center',
  },
  cameraButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
    marginLeft: 8,
  },
});