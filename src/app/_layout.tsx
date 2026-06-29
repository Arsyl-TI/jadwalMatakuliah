// app/_layout.tsx
import React, { useContext } from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, View } from 'react-native';
import { ThemeProvider, ThemeContext } from '../context/ThemeContext';

// Komponen navigasi yang sudah terhubung dengan ThemeContext
function TabNavigator() {
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: isDarkMode ? '#3498db' : 'tomato', // Biru saat dark, merah saat light
        tabBarInactiveTintColor: isDarkMode ? '#7f8c8d' : 'gray',
        tabBarStyle: { 
          backgroundColor: isDarkMode ? '#1e1e1e' : '#ffffff',
          borderTopColor: isDarkMode ? '#333' : '#e0e0e0' 
        },
        headerStyle: { 
          backgroundColor: isDarkMode ? '#1e1e1e' : '#ffffff' 
        },
        headerTintColor: isDarkMode ? '#ffffff' : '#2c3e50',
        
        // Menambahkan Tombol Toggle Dark Mode di Kanan Atas Header
        headerRight: () => (
          <TouchableOpacity onPress={toggleDarkMode} style={{ marginRight: 16 }}>
            <Ionicons 
              name={isDarkMode ? "sunny" : "moon"} 
              size={24} 
              color={isDarkMode ? "#f1c40f" : "#2c3e50"} // Kuning saat dark, biru dongker saat light
            />
          </TouchableOpacity>
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Ringkasan Matkul',
          tabBarIcon: ({ color, size }) => <Ionicons name="book" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="pertemuan"
        options={{
          title: 'Daftar Pertemuan',
          tabBarIcon: ({ color, size }) => <Ionicons name="list" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="jadwal"
        options={{
          title: 'Jadwal Mingguan',
          tabBarIcon: ({ color, size }) => <Ionicons name="calendar" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}

// Komponen Utama yang diekspor
export default function TabLayout() {
  return (
    <ThemeProvider>
      <TabNavigator />
    </ThemeProvider>
  );
}