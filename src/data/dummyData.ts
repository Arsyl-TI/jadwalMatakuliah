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
  { id: 'm1', nama: 'Pemrograman Mobile', kode: 'IF-401', sks: 3, dosen: 'Dr. Ahmad Fauzi', warna: '#3498db' }, // Biru
  { id: 'm2', nama: 'Basis Data Lanjut', kode: 'IF-312', sks: 3, dosen: 'Dr. Sari Dewi', warna: '#e74c3c' },   // Merah
  { id: 'm3', nama: 'Kecerdasan Buatan', kode: 'IF-405', sks: 3, dosen: 'Dr. Rizal Hakim', warna: '#9b59b6' }, // Ungu
  { id: 'm4', nama: 'Jaringan Komputer', kode: 'IF-308', sks: 2, dosen: 'Dr. Putri Indah', warna: '#f1c40f' }, // Kuning
  { id: 'm5', nama: 'Rekayasa Perangkat Lunak', kode: 'IF-402', sks: 3, dosen: 'Dr. Hendra Putra', warna: '#2ecc71' }, // Hijau
];

const tabelPertemuan: PertemuanDB[] = [
  { id: 'p1', id_matkul: 'm1', pertemuan_ke: 1, topik: 'Pengenalan React Native', tanggal: '4 Sep 2025' },
  { id: 'p2', id_matkul: 'm2', pertemuan_ke: 1, topik: 'Review SQL Dasar', tanggal: '5 Sep 2025' },
  { id: 'p3', id_matkul: 'm3', pertemuan_ke: 1, topik: 'Intro AI & Machine Learning', tanggal: '6 Sep 2025' },
  { id: 'p4', id_matkul: 'm1', pertemuan_ke: 2, topik: 'Komponen & Props', tanggal: '11 Sep 2025' },
  { id: 'p5', id_matkul: 'm4', pertemuan_ke: 1, topik: 'Topologi Jaringan', tanggal: '12 Sep 2025' },
  { id: 'p6', id_matkul: 'm5', pertemuan_ke: 1, topik: 'SDLC', tanggal: '13 Sep 2025' },
  { id: 'p7', id_matkul: 'm2', pertemuan_ke: 2, topik: 'Normalisasi Data', tanggal: '14 Sep 2025' },
  { id: 'p8', id_matkul: 'm3', pertemuan_ke: 2, topik: 'Algoritma Pencarian', tanggal: '15 Sep 2025' },
  { id: 'p9', id_matkul: 'm1', pertemuan_ke: 3, topik: 'State & Lifecycle', tanggal: '18 Sep 2025' },
  { id: 'p10', id_matkul: 'm4', pertemuan_ke: 2, topik: 'OSI Layer', tanggal: '19 Sep 2025' },
];

const tabelJadwal: JadwalDB[] = [
  { id: 'j1', id_matkul: 'm1', hari: 'Senin', ruang: 'Ruang A201', jam: '08.00 - 10.30' },
  { id: 'j2', id_matkul: 'm3', hari: 'Senin', ruang: 'Ruang B102', jam: '13.00 - 15.30' },
  { id: 'j3', id_matkul: 'm2', hari: 'Selasa', ruang: 'Ruang C301', jam: '09.00 - 11.30' },
  { id: 'j4', id_matkul: 'm4', hari: 'Selasa', ruang: 'Lab Jaringan', jam: '13.00 - 14.40' },
  { id: 'j5', id_matkul: 'm5', hari: 'Rabu', ruang: 'Ruang A301', jam: '10.00 - 12.30' },
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