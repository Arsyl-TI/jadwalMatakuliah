// data/dummyData.ts

// 1. Definisi Tipe Data (Tabel)
export interface MatkulDB {
  id: string;
  nama: string;
  kode: string;
  sks: number;
  dosen: string;
  warna: string; // Tambahan Color-Coding
}

export interface PertemuanDB {
  id: string;
  id_matkul: string; // Relasi ke MatkulDB
  pertemuan_ke: number;
  topik: string;
  tanggal: string;
}

export interface JadwalDB {
  id: string;
  id_matkul: string;
  hari: string;
  ruang: string;
  jam: string;
}

// 2. Data Hardcode (Simulasi Database Lokal)
export const tabelMatkul: MatkulDB[] = [
  { id: 'm1', nama: 'Pemrograman Mobile', kode: 'STI2546142', sks: 3, dosen: 'M. Rizki Fadhilah', warna: '#3498db' }, // Biru
  { id: 'm2', nama: 'Big Data', kode: 'STI2546168', sks: 3, dosen: 'Dr. EVIZAL, ST., M.Eng', warna: '#e74c3c' },   // Merah
  { id: 'm3', nama: 'Machine Learning', kode: 'STI2546141', sks: 3, dosen: 'ANGGI HANAFIAH, S.Kom., M.Kom', warna: '#9b59b6' }, // Ungu
  { id: 'm4', nama: 'Switching Routing', kode: 'STI2546143', sks: 3, dosen: 'Apri Siswanto', warna: '#f1c40f' }, // Kuning
  { id: 'm5', nama: 'Implementasi dan Pengujian Perangkat Lunak', kode: 'STI2545167', sks: 3, dosen: 'Dr. AKMAR EFENDI, S.Kom., M.Kom', warna: '#2ecc71' }, // Hijau
  { id: 'm6', nama: 'Sensor Jaringan Nirkabel', kode: 'STI2546258', sks: 3, dosen: 'Dr. EVIZAL, ST., M.Eng', warna: '#2e3ecc' }, // Biru Tua
  { id: 'm7', nama: 'KERJA PRAKTEK', kode: 'STI2540165', sks: 2, dosen: 'TEAM TEACHING,', warna: '#0f111d' }, // Hitam
];

const tabelPertemuan: PertemuanDB[] = [
  { id: 'p1', id_matkul: 'm1', pertemuan_ke: 1, topik: 'Pengenalan React Native', tanggal: '23 Feb 2026' },
  { id: 'p2', id_matkul: 'm2', pertemuan_ke: 1, topik: '5V', tanggal: '14 Apr 2025' },
  { id: 'p3', id_matkul: 'm3', pertemuan_ke: 2, topik: 'Intro AI & Machine Learning', tanggal: '10 Apr 2026' },
  { id: 'p4', id_matkul: 'm1', pertemuan_ke: 4, topik: 'PROPS & STATE: Managing Chaos', tanggal: '16 Mar 2026' },
  { id: 'p5', id_matkul: 'm4', pertemuan_ke: 4, topik: 'Inter VLAN Routing', tanggal: '8 Apr 2026' },
  { id: 'p6', id_matkul: 'm5', pertemuan_ke: 5, topik: 'SDLC', tanggal: '15 Mei 2025' },
  { id: 'p7', id_matkul: 'm2', pertemuan_ke: 8, topik: 'HDFS (Hadoop Distributed File System', tanggal: '5 Jun 2026' },
  { id: 'p8', id_matkul: 'm3', pertemuan_ke: 9, topik: 'Algoritma Pencarian', tanggal: '29 Mei 2026' },
  { id: 'p9', id_matkul: 'm1', pertemuan_ke: 11, topik: 'Global State Management', tanggal: '25 May 2026' },
  { id: 'p10', id_matkul: 'm4', pertemuan_ke: 12, topik: 'WLAN Consepts', tanggal: '10 Jun 2026' },
  { id: 'p11', id_matkul: 'm6', pertemuan_ke: 1, topik: 'Introduction to WSN', tanggal: '3 Mar 2026' },
  { id: 'p12', id_matkul: 'm6', pertemuan_ke: 2, topik: 'IoT Vs WSN', tanggal: '10 Mar 2026' },
];

const tabelJadwal: JadwalDB[] = [
  { id: 'j1', id_matkul: 'm1', hari: 'Senin', ruang: '3A.1.08', jam: '14.45 - 16.25' },
  { id: 'j2', id_matkul: 'm2', hari: 'Selasa', ruang: '3C.2.05', jam: '13.00 - 14.45' },
  { id: 'j3', id_matkul: 'm7', hari: '-', ruang: '-', jam: '-' },
  { id: 'j4', id_matkul: 'm4', hari: 'Rabu', ruang: '3C.2.05', jam: '13:00 - 14.45' },
  { id: 'j5', id_matkul: 'm5', hari: 'Jumat', ruang: '3C.2.06', jam: '08:45 - 11.15' },
  { id: 'j6', id_matkul: 'm3', hari: 'Jumat', ruang: '3C.1.04', jam: '13.30 - 15.10' },
  { id: 'j7', id_matkul: 'm6', hari: 'Jumat', ruang: '3C.2.06', jam: '15:15 - 17.00' },
];

// 3. Helper: Menyatukan (Join) data agar siap dirender UI
export const getJoinedPertemuan = () => {
  return tabelPertemuan.map(pertemuan => {
    const matkul = tabelMatkul.find(m => m.id === pertemuan.id_matkul);
    return { ...pertemuan, matkul: matkul?.nama || 'Unknown', warna: matkul?.warna || '#ccc' };
  });
};

export const getJadwalPerHari = () => {
  const hariList = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'];
  const sectionData = hariList.map(hari => {
    const jadwalHariIni = tabelJadwal
      .filter(j => j.hari === hari)
      .map(jadwal => {
        const matkul = tabelMatkul.find(m => m.id === jadwal.id_matkul);
        return { ...jadwal, matkul: matkul?.nama || 'Unknown', warna: matkul?.warna || '#ccc' };
      });
    return { title: hari, data: jadwalHariIni };
  });
  // Hanya kembalikan hari yang ada jadwalnya
  return sectionData.filter(section => section.data.length > 0);
};

export type JoinedPertemuan = ReturnType<typeof getJoinedPertemuan>[0];
export type JoinedJadwalItem = ReturnType<typeof getJadwalPerHari>[0]['data'][0];
export type JadwalSection = ReturnType<typeof getJadwalPerHari>[0];