// app/index.tsx
import React, { useState, useCallback, useEffect, useRef, useContext } from 'react';
import { View, Text, ScrollView, StyleSheet, RefreshControl, Animated } from 'react-native';
import { tabelMatkul, MatkulDB } from '../data/dummyData';
import { ThemeContext } from '../context/ThemeContext'; // Import Context

const AnimatedCard: React.FC<{ item: MatkulDB; index: number; isDarkMode: boolean }> = ({ item, index, isDarkMode }) => {
  const translateY = useRef(new Animated.Value(50)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, { toValue: 0, duration: 500, delay: index * 150, useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 1, duration: 500, delay: index * 150, useNativeDriver: true }),
    ]).start();
  }, [opacity, translateY, index]);

  return (
    <Animated.View 
      style={[
        styles.card, 
        { 
          borderLeftColor: item.warna,
          backgroundColor: isDarkMode ? '#2c3e50' : '#fff', // Card background berubah
          shadowColor: isDarkMode ? '#000' : '#bdc3c7',
        },
        { opacity: opacity, transform: [{ translateY: translateY }] }
      ]}
    >
      <Text style={[styles.matkulTitle, { color: isDarkMode ? '#ecf0f1' : '#34495e' }]}>{item.nama}</Text>
      <Text style={[styles.desc, { color: isDarkMode ? '#bdc3c7' : '#7f8c8d' }]}>{item.kode} - {item.sks} SKS</Text>
      <Text style={[styles.dosen, { color: isDarkMode ? '#64b5f6' : '#3498db' }]}>{item.dosen}</Text>
    </Animated.View>
  );
};

const RingkasanScreen: React.FC = () => {
  const [refreshing, setRefreshing] = useState(false);
  
  // Mengambil state isDarkMode dari Context
  const { isDarkMode } = useContext(ThemeContext);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  }, []);

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#f4f6f8' }]} // Background utama berubah
      refreshControl={
        <RefreshControl 
          refreshing={refreshing} 
          onRefresh={onRefresh} 
          tintColor={isDarkMode ? '#fff' : '#000'} // Warna loading indikator
        />
      }
    >
      <Text style={[styles.pageTitle, { color: isDarkMode ? '#ecf0f1' : '#2c3e50' }]}>
        Mata Kuliah Semester Ini
      </Text>
      
      {tabelMatkul.map((item: MatkulDB, index: number) => (
        <AnimatedCard key={item.id} item={item} index={index} isDarkMode={isDarkMode} />
      ))}
      
      <View style={{ height: 20 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  pageTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  card: { 
    padding: 16, 
    marginBottom: 12, 
    borderRadius: 8, 
    borderLeftWidth: 6,
    elevation: 3, 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  matkulTitle: { fontSize: 16, fontWeight: 'bold' },
  desc: { fontSize: 14, marginTop: 4 },
  dosen: { fontSize: 14, marginTop: 4, fontWeight: '500' }
});

export default RingkasanScreen;