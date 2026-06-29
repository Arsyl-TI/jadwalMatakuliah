// app/pertemuan.tsx
import React, { useState, useCallback, useMemo, useContext } from 'react';
import { 
  View, Text, FlatList, StyleSheet, ListRenderItem, 
  RefreshControl, TextInput, TouchableOpacity, Modal, Pressable 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getJoinedPertemuan, JoinedPertemuan } from '../data/dummyData';
import { ThemeContext } from '../context/ThemeContext'; // Import Context

const PertemuanScreen: React.FC = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<JoinedPertemuan | null>(null);
  
  // Mengambil state isDarkMode
  const { isDarkMode } = useContext(ThemeContext);
  
  const allData = useMemo(() => getJoinedPertemuan(), []);

  const filteredData = useMemo(() => {
    if (!searchQuery) return allData;
    return allData.filter(item => 
      item.topik.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.matkul.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, allData]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  }, []);

  const handlePressItem = (item: JoinedPertemuan) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const renderItem: ListRenderItem<JoinedPertemuan> = ({ item }) => (
    <TouchableOpacity 
      style={[styles.itemContainer, { backgroundColor: isDarkMode ? '#1e1e1e' : '#fff' }]} 
      activeOpacity={0.7}
      onPress={() => handlePressItem(item)}
    >
      <View style={[styles.colorDot, { backgroundColor: item.warna }]} />
      <View style={styles.itemContent}>
        <Text style={[styles.matkul, { color: isDarkMode ? '#ecf0f1' : '#2c3e50' }]}>
          {item.matkul} - Pert {item.pertemuan_ke}
        </Text>
        <Text style={[styles.topik, { color: isDarkMode ? '#bdc3c7' : '#34495e' }]}>{item.topik}</Text>
        <Text style={[styles.tanggal, { color: isDarkMode ? '#95a5a6' : '#95a5a6' }]}>{item.tanggal}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={isDarkMode ? "#7f8c8d" : "#bdc3c7"} />
    </TouchableOpacity>
  );

  const ItemSeparator: React.FC = () => (
    <View style={[styles.separator, { backgroundColor: isDarkMode ? '#333' : '#ecf0f1' }]} />
  );
  
  const HeaderComponent: React.FC = () => (
    <View style={[styles.header, { 
      backgroundColor: isDarkMode ? '#2c3e50' : '#e8f4f8',
      borderColor: isDarkMode ? '#34495e' : '#d1e8e2' 
    }]}>
      <Text style={[styles.headerTitle, { color: isDarkMode ? '#fff' : '#2c3e50' }]}>Riwayat Pertemuan</Text>
      <Text style={[styles.subHeaderText, { color: isDarkMode ? '#bdc3c7' : '#7f8c8d' }]}>
        Total {filteredData.length} pertemuan ditemukan
      </Text>
    </View>
  );

  const EmptyComponent: React.FC = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="search-outline" size={64} color={isDarkMode ? "#555" : "#bdc3c7"} />
      <Text style={[styles.emptyText, { color: isDarkMode ? '#7f8c8d' : '#95a5a6' }]}>
        Tidak ada pertemuan yang sesuai dengan pencarian Anda.
      </Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#fff' }]}>
      <View style={[styles.searchContainer, { backgroundColor: isDarkMode ? '#333' : '#f1f2f6' }]}>
        <Ionicons name="search" size={20} color={isDarkMode ? "#bdc3c7" : "#7f8c8d"} style={styles.searchIcon} />
        <TextInput
          style={[styles.searchInput, { color: isDarkMode ? '#fff' : '#000' }]}
          placeholder="Cari topik atau nama matkul..."
          placeholderTextColor={isDarkMode ? "#7f8c8d" : "#95a5a6"}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item: JoinedPertemuan) => item.id}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={HeaderComponent}
        ListEmptyComponent={EmptyComponent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={isDarkMode ? '#fff' : '#000'} />}
        contentContainerStyle={filteredData.length === 0 ? styles.flatlistEmpty : { paddingBottom: 20 }}
      />

      <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: isDarkMode ? '#1e1e1e' : '#fff' }]}>
            {selectedItem && (
              <>
                <View style={[styles.modalHeader, { backgroundColor: selectedItem.warna }]}>
                  <Text style={styles.modalHeaderText}>{selectedItem.matkul}</Text>
                </View>
                
                <View style={styles.modalBody}>
                  <Text style={[styles.modalLabel, { color: isDarkMode ? '#7f8c8d' : '#7f8c8d' }]}>Pertemuan Ke</Text>
                  <Text style={[styles.modalValue, { color: isDarkMode ? '#ecf0f1' : '#2c3e50' }]}>{selectedItem.pertemuan_ke}</Text>

                  <Text style={[styles.modalLabel, { color: isDarkMode ? '#7f8c8d' : '#7f8c8d' }]}>Topik Pembahasan</Text>
                  <Text style={[styles.modalValue, { color: isDarkMode ? '#ecf0f1' : '#2c3e50' }]}>{selectedItem.topik}</Text>

                  <Text style={[styles.modalLabel, { color: isDarkMode ? '#7f8c8d' : '#7f8c8d' }]}>Tanggal</Text>
                  <Text style={[styles.modalValue, { color: isDarkMode ? '#ecf0f1' : '#2c3e50' }]}>{selectedItem.tanggal}</Text>

                  <Text style={[styles.modalLabel, { color: isDarkMode ? '#7f8c8d' : '#7f8c8d' }]}>Status Kehadiran</Text>
                  <View style={styles.badgeHadir}>
                    <Ionicons name="checkmark-circle" size={16} color="#fff" />
                    <Text style={styles.badgeText}>Hadir</Text>
                  </View>
                </View>

                <Pressable 
                  style={[styles.closeButton, { backgroundColor: isDarkMode ? '#333' : '#f1f2f6', borderTopColor: isDarkMode ? '#444' : '#e0e0e0' }]} 
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={[styles.closeButtonText, { color: isDarkMode ? '#ff6b6b' : '#e74c3c' }]}>Tutup</Text>
                </Pressable>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

// ... (Bagian StyleSheet tetap sama dengan sebelumnya)
const styles = StyleSheet.create({
  container: { flex: 1 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', margin: 16, borderRadius: 8, paddingHorizontal: 12 },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, height: 40, fontSize: 16 },
  header: { padding: 16, borderBottomWidth: 1 },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  subHeaderText: { fontSize: 14, marginTop: 4 },
  itemContainer: { padding: 16, flexDirection: 'row', alignItems: 'center' },
  colorDot: { width: 12, height: 12, borderRadius: 6, marginRight: 16 },
  itemContent: { flex: 1 },
  matkul: { fontSize: 16, fontWeight: 'bold' },
  topik: { fontSize: 15, marginTop: 2 },
  tanggal: { fontSize: 13, marginTop: 4 },
  separator: { height: 1, marginLeft: 44 },
  flatlistEmpty: { flexGrow: 1, justifyContent: 'center' },
  emptyContainer: { alignItems: 'center', padding: 32 },
  emptyText: { fontSize: 16, textAlign: 'center', marginTop: 16 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '85%', borderRadius: 12, overflow: 'hidden', elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4 },
  modalHeader: { padding: 16, alignItems: 'center' },
  modalHeaderText: { color: '#fff', fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
  modalBody: { padding: 20 },
  modalLabel: { fontSize: 12, textTransform: 'uppercase', marginBottom: 2 },
  modalValue: { fontSize: 16, fontWeight: '500', marginBottom: 12 },
  badgeHadir: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#2ecc71', alignSelf: 'flex-start', paddingVertical: 4, paddingHorizontal: 12, borderRadius: 16, marginTop: 4 },
  badgeText: { color: '#fff', fontWeight: 'bold', marginLeft: 4, fontSize: 14 },
  closeButton: { padding: 16, alignItems: 'center', borderTopWidth: 1 },
  closeButtonText: { fontSize: 16, fontWeight: 'bold' }
});

export default PertemuanScreen;