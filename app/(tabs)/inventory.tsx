import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Package, TriangleAlert as AlertTriangle, Plus, Minus, Search } from 'lucide-react-native';
import { LanguageContext } from '@/contexts/LanguageContext';
import { VoiceButton } from '@/components/VoiceButton';
import { medicineInventory } from '@/constants/dummyData';

export default function InventoryScreen() {
  const { t } = useContext(LanguageContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [inventory, setInventory] = useState(medicineInventory);

  const filteredInventory = inventory.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const updateStock = (id: string, change: number) => {
    setInventory(prev => prev.map(item =>
      item.id === id
        ? { ...item, stock: Math.max(0, item.stock + change) }
        : item
    ));
  };

  const getStockStatus = (item: any) => {
    if (item.stock === 0) return { status: 'out', color: '#EF4444', bg: '#FEE2E2' };
    if (item.stock <= item.minStock) return { status: 'low', color: '#F59E0B', bg: '#FEF3C7' };
    return { status: 'good', color: '#22C55E', bg: '#DCFCE7' };
  };

  const MedicineCard = ({ item }: { item: any }) => {
    const stockInfo = getStockStatus(item);
    
    return (
      <View style={styles.medicineCard}>
        <View style={styles.medicineHeader}>
          <View style={styles.medicineInfo}>
            <Text style={styles.medicineName}>{item.name}</Text>
            <Text style={styles.medicineCategory}>{item.category}</Text>
            <Text style={styles.medicinePrice}>₹{item.price}</Text>
          </View>
          <VoiceButton 
            text={`${item.name}, ${item.category}, price ${item.price} rupees, stock ${item.stock} units`}
            type="speak" 
            size={18} 
          />
        </View>

        <View style={styles.stockSection}>
          <View style={styles.stockInfo}>
            <View style={[styles.stockBadge, { backgroundColor: stockInfo.bg }]}>
              <Text style={[styles.stockText, { color: stockInfo.color }]}>
                {item.stock} units
              </Text>
            </View>
            {stockInfo.status !== 'good' && (
              <View style={styles.alertIcon}>
                <AlertTriangle size={20} color={stockInfo.color} />
              </View>
            )}
          </View>
          
          <View style={styles.stockControls}>
            <TouchableOpacity
              style={styles.stockButton}
              onPress={() => updateStock(item.id, -1)}
            >
              <Minus size={20} color="#6B7280" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.stockButton}
              onPress={() => updateStock(item.id, 1)}
            >
              <Plus size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.medicineDetails}>
          <Text style={styles.detailText}>Min Stock: {item.minStock}</Text>
          <Text style={styles.detailText}>Expiry: {new Date(item.expiryDate).toLocaleDateString()}</Text>
          <Text style={styles.detailText}>Mfg: {item.manufacturer}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('pharmacy.inventory')}</Text>
        <Text style={styles.subtitle}>Manage medicine stock and availability</Text>
        <VoiceButton 
          text="Medicine Inventory. Manage medicine stock and availability" 
          type="speak" 
          size={24} 
        />
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Search size={20} color="#9CA3AF" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search medicines..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9CA3AF"
          />
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {filteredInventory.map((item) => (
          <MedicineCard key={item.id} item={item} />
        ))}
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
    paddingHorizontal: 16,
  },
  medicineCard: {
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
  medicineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  medicineInfo: {
    flex: 1,
  },
  medicineName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  medicineCategory: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  medicinePrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#059669',
  },
  stockSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  stockInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stockBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  stockText: {
    fontSize: 14,
    fontWeight: '600',
  },
  alertIcon: {
    marginLeft: 4,
  },
  stockControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stockButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    marginHorizontal: 4,
  },
  medicineDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  detailText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
});