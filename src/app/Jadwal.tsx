// app/jadwal.tsx
import React, { useState, useCallback, useMemo, useRef, useContext } from 'react';
import { View, Text, SectionList, StyleSheet, SectionListRenderItem, RefreshControl, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import { getJadwalPerHari, JoinedJadwalItem, JadwalSection } from '../data/dummyData';
import { ThemeContext } from '../context/ThemeContext'; // Import Context

const JadwalScreen: React.FC = () => {
  const [refreshing, setRefreshing] = useState(false);
  const sectionsData = useMemo(() => getJadwalPerHari(), []);
  const swipeableRefs = useRef<Map<string, any>>(new Map());

  // Mengambil state isDarkMode
  const { isDarkMode } = useContext(ThemeContext);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  }, []);

  const handleTandaiSelesai = (id: string, matkul: string) => {
    const ref = swipeableRefs.current.get(id);
    if (ref) ref.close();
    Alert.alert("Berhasil", `Kelas ${matkul} telah ditandai selesai untuk hari ini.`);
  };

  const renderRightActions = (item: JoinedJadwalItem) => (
    <TouchableOpacity 
      style={styles.swipeActionBtn} 
      onPress={() => handleTandaiSelesai(item.id, item.matkul)}
      activeOpacity={0.8}
    >
      <Ionicons name="checkmark-done-circle" size={24} color="#fff" />
      <Text style={styles.swipeActionText}>Selesai</Text>
    </TouchableOpacity>
  );

  const renderItem: SectionListRenderItem<JoinedJadwalItem, JadwalSection> = ({ item }) => (
    <View style={[styles.swipeableWrapper, { shadowColor: isDarkMode ? '#000' : '#000' }]}>
      <Swipeable
        ref={(ref) => {
          if (ref && !swipeableRefs.current.has(item.id)) swipeableRefs.current.set(item.id, ref);
        }}
        renderRightActions={() => renderRightActions(item)}
        friction={2}
        rightThreshold={40}
      >
        <View style={[styles.itemCard, { backgroundColor: isDarkMode ? '#1e1e1e' : '#fff' }]}>
          <View style={[styles.indicator, { backgroundColor: item.warna }]} />
          <View style={styles.itemContent}>
            <Text style={[styles.matkul, { color: isDarkMode ? '#ecf0f1' : '#2c3e50' }]}>{item.matkul}</Text>
            <View style={styles.infoRow}>
              <Ionicons name="time-outline" size={14} color={isDarkMode ? '#bdc3c7' : '#7f8c8d'} />
              <Text style={[styles.detail, { color: isDarkMode ? '#bdc3c7' : '#7f8c8d' }]}>{item.jam}</Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="location-outline" size={14} color={isDarkMode ? '#bdc3c7' : '#7f8c8d'} />
              <Text style={[styles.detail, { color: isDarkMode ? '#bdc3c7' : '#7f8c8d' }]}>{item.ruang}</Text>
            </View>
          </View>
          <Ionicons name="chevron-back" size={16} color={isDarkMode ? '#555' : '#ecf0f1'} style={styles.swipeHint} />
        </View>
      </Swipeable>
    </View>
  );

  const renderSectionHeader = ({ section }: { section: JadwalSection }) => (
    <View style={[styles.headerContainer, { 
      backgroundColor: isDarkMode ? '#000' : '#2c3e50',
      borderBottomWidth: isDarkMode ? 1 : 0,
      borderBottomColor: '#333'
    }]}>
      <Text style={[styles.headerText, { color: isDarkMode ? '#3498db' : '#fff' }]}>{section.title}</Text>
    </View>
  );

  return (
    <GestureHandlerRootView style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#f4f6f8' }]}>
      <SectionList
        sections={sectionsData}
        keyExtractor={(item: JoinedJadwalItem) => item.id}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        stickySectionHeadersEnabled={true} 
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={isDarkMode ? '#fff' : '#000'} />}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </GestureHandlerRootView>
  );
};

// ... (Bagian StyleSheet tetap sama dengan sebelumnya)
const styles = StyleSheet.create({
  container: { flex: 1 },
  headerContainer: { paddingVertical: 10, paddingHorizontal: 16, elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2 },
  headerText: { fontSize: 16, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1 },
  swipeableWrapper: { marginHorizontal: 16, marginTop: 12, borderRadius: 8, elevation: 2, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, backgroundColor: '#27ae60' },
  itemCard: { flexDirection: 'row', borderRadius: 8, overflow: 'hidden' },
  indicator: { width: 6 },
  itemContent: { padding: 16, flex: 1 },
  matkul: { fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  detail: { fontSize: 14, marginLeft: 6 },
  swipeHint: { alignSelf: 'center', marginRight: 16 },
  swipeActionBtn: { backgroundColor: '#27ae60', justifyContent: 'center', alignItems: 'center', width: 90, borderTopRightRadius: 8, borderBottomRightRadius: 8 },
  swipeActionText: { color: '#fff', fontWeight: 'bold', fontSize: 12, marginTop: 4 }
});

export default JadwalScreen;