import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { MapPin, Phone, Clock, CircleCheck as CheckCircle, Circle as XCircle, Search } from 'lucide-react-native';
import { LanguageContext } from '@/contexts/LanguageContext';
import { VoiceButton } from '@/components/VoiceButton';
import { dummyPharmacies } from '@/constants/dummyData';
import { useRouter } from 'expo-router';

export default function PharmacyScreen() {
  const { t } = useContext(LanguageContext);
  const router = useRouter();
  const [searchMedicine, setSearchMedicine] = useState('');
  const [selectedPharmacy, setSelectedPharmacy] = useState<string | null>(null);

  // Mock prescription medicines
  const prescriptionMedicines = ['Paracetamol', 'Amoxicillin', 'Cetirizine'];

  const getAvailabilityForMedicines = (pharmacy: any, medicines: string[]) => {
    const availability = medicines.map(medicine => ({
      name: medicine,
      available: pharmacy.medicines[medicine]?.available || false,
      price: pharmacy.medicines[medicine]?.price || 0,
      quantity: pharmacy.medicines[medicine]?.quantity || 0
    }));
    return availability;
  };

  const PharmacyCard = ({ pharmacy }: { pharmacy: any }) => {
    const availability = getAvailabilityForMedicines(pharmacy, prescriptionMedicines);
    const allAvailable = availability.every(med => med.available);
    const someAvailable = availability.some(med => med.available);

    return (
      <TouchableOpacity
        style={[
          styles.pharmacyCard,
          selectedPharmacy === pharmacy.id && styles.selectedCard
        ]}
        onPress={() => setSelectedPharmacy(pharmacy.id)}
      >
        <View style={styles.pharmacyHeader}>
          <View style={styles.pharmacyInfo}>
            <Text style={styles.pharmacyName}>{pharmacy.name}</Text>
            <View style={styles.addressRow}>
              <MapPin size={14} color="#6B7280" />
              <Text style={styles.pharmacyAddress}>{pharmacy.address}</Text>
            </View>
            <View style={styles.distanceRow}>
              <Text style={styles.pharmacyDistance}>{pharmacy.distance}</Text>
              <Text style={styles.pharmacyRating}>⭐ {pharmacy.rating}</Text>
            </View>
          </View>
          <View style={styles.availabilityIndicator}>
            {allAvailable ? (
              <CheckCircle size={24} color="#22C55E" />
            ) : someAvailable ? (
              <CheckCircle size={24} color="#F59E0B" />
            ) : (
              <XCircle size={24} color="#EF4444" />
            )}
          </View>
        </View>

        <View style={styles.medicinesList}>
          <Text style={styles.medicinesTitle}>Prescription Medicines:</Text>
          {availability.map((med, index) => (
            <View key={index} style={styles.medicineRow}>
              <Text style={styles.medicineName}>{med.name}</Text>
              <View style={styles.medicineStatus}>
                {med.available ? (
                  <View style={styles.availableStatus}>
                    <CheckCircle size={16} color="#22C55E" />
                    <Text style={styles.availableText}>₹{med.price}</Text>
                  </View>
                ) : (
                  <View style={styles.unavailableStatus}>
                    <XCircle size={16} color="#EF4444" />
                    <Text style={styles.unavailableText}>Not Available</Text>
                  </View>
                )}
              </View>
            </View>
          ))}
        </View>

        <View style={styles.pharmacyFooter}>
          <View style={styles.contactInfo}>
            <Clock size={14} color="#6B7280" />
            <Text style={styles.openTime}>{pharmacy.openTime}</Text>
          </View>
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.callButton}>
              <Phone size={16} color="#3B82F6" />
              <Text style={styles.callText}>Call</Text>
            </TouchableOpacity>
            <VoiceButton 
              text={`${pharmacy.name}, located at ${pharmacy.address}, ${pharmacy.distance} away, rating ${pharmacy.rating} stars, open ${pharmacy.openTime}`}
              type="speak" 
              size={18} 
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Find Pharmacy</Text>
        <Text style={styles.subtitle}>Locate pharmacies with your medicines</Text>
        <VoiceButton 
          text="Find Pharmacy. Locate pharmacies with your medicines" 
          type="speak" 
          size={24} 
        />
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Search size={20} color="#9CA3AF" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for medicines..."
            value={searchMedicine}
            onChangeText={setSearchMedicine}
            placeholderTextColor="#9CA3AF"
          />
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nearby Pharmacies</Text>
          <Text style={styles.sectionSubtitle}>
            Showing availability for: {prescriptionMedicines.join(', ')}
          </Text>
        </View>

        {dummyPharmacies.map((pharmacy) => (
          <PharmacyCard key={pharmacy.id} pharmacy={pharmacy} />
        ))}
      </ScrollView>

      {selectedPharmacy && (
        <View style={styles.bottomAction}>
          <TouchableOpacity style={styles.orderButton}>
            <Text style={styles.orderButtonText}>Order from Selected Pharmacy</Text>
          </TouchableOpacity>
        </View>
      )}
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
    paddingTop: 20,
    paddingBottom: 10,
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
  searchContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#1F2937',
  },
  content: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  pharmacyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: '#3B82F6',
  },
  pharmacyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  pharmacyInfo: {
    flex: 1,
  },
  pharmacyName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  pharmacyAddress: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
  },
  distanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
  pharmacyDistance: {
    fontSize: 14,
    color: '#6B7280',
  },
  pharmacyRating: {
    fontSize: 14,
    color: '#6B7280',
  },
  availabilityIndicator: {
    marginLeft: 8,
  },
  medicinesList: {
    marginBottom: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  medicinesTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  medicineRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  medicineName: {
    fontSize: 14,
    color: '#1F2937',
  },
  medicineStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  availableStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  availableText: {
    fontSize: 14,
    color: '#22C55E',
    marginLeft: 4,
    fontWeight: '500',
  },
  unavailableStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  unavailableText: {
    fontSize: 14,
    color: '#EF4444',
    marginLeft: 4,
  },
  pharmacyFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  openTime: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  callButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#EBF8FF',
    marginRight: 8,
  },
  callText: {
    fontSize: 14,
    color: '#3B82F6',
    marginLeft: 4,
    fontWeight: '500',
  },
  bottomAction: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  orderButton: {
    backgroundColor: '#22C55E',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  orderButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});