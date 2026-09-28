const matakuliah = [
    { kode: "14823153", nama: "Teknologi Informasi dan Aplikasi Bisnis Berkembang", smt: 2, sks: 3, nilai: "B" },
    { kode: "14823372", nama: "Statistika dan Probabilitas", smt: 2, sks: 2, nilai: "A" },
    { kode: "14823313", nama: "Sistem Basis Data", smt: 2, sks: 2, nilai: "AB" },
    { kode: "14823274", nama: "Pemrograman Berorientasi Objek", smt: 2, sks: 4, nilai: "AB" },
    { kode: "14823393", nama: "Interaksi Manusia Komputer", smt: 2, sks: 3, nilai: "B" },
    { kode: "14823333", nama: "Algoritma dan Struktur Data", smt: 2, sks: 3, nilai: "AB" },
    { kode: "14823192", nama: "Arsitektur dan Organisasi Komputer", smt: 2, sks: 2, nilai: "B" },
    { kode: "14823532", nama: "Bahasa Inggris", smt: 1, sks: 2, nilai: "AB" },
    { kode: "14823103", nama: "Konsep dan Fondasi Sistem Informasi", smt: 1, sks: 3, nilai: "AB" },
    { kode: "14823202", nama: "Sistem Operasi", smt: 1, sks: 2, nilai: "AB" },
    { kode: "14823342", nama: "Aljabar Linier", smt: 1, sks: 2, nilai: "A" },
    { kode: "14823362", nama: "Kalkulus", smt: 1, sks: 2, nilai: "B" },
    { kode: "14823352", nama: "Matematika Diskrit", smt: 1, sks: 2, nilai: "B" },
    { kode: "14823323", nama: "Dasar Pemrograman", smt: 1, sks: 3, nilai: "B" },
    { kode: "14823012", nama: "Etika Pengembangan Teknologi Siber", smt: 1, sks: 2, nilai: "B" }
];

const bobot = { "A": 4, "AB": 3.5, "B": 3 };

function hitungTotalSKS(data) {
    let total = 0;
    for (const mk of data) {
        total += mk.sks;
    }
    return total;
}

function hitungIPK(data) {
    let totalNK = 0;
    let totalSKS = 0;
    for (let i = 0; i < data.length; i++) {
        totalNK += bobot[data[i].nilai] * data[i].sks;
        totalSKS += data[i].sks;
    }
    return totalSKS > 0 ? totalNK / totalSKS : 0;
}

function filterMatakuliah(data, semester, nilaiMin) {
    const hasil = [];
    data.forEach(function (mk) {
        if (mk.smt === semester && bobot[mk.nilai] >= bobot[nilaiMin]) {
            hasil.push(mk);
        }
    });
    return hasil;
}

function cariMatakuliah(data, kataKunci) {
    return data.filter(mk => mk.nama.toLowerCase().includes(kataKunci.toLowerCase()));
}

console.log("=== DATA NILAI MATAKULIAH ===");
matakuliah.forEach(function (mk, index) {
    console.log((index + 1) + ". " + mk.nama + " | SKS: " + mk.sks + " | Nilai: " + mk.nilai);
});

console.log("\n=== HASIL PERHITUNGAN ===");
console.log("Jumlah matakuliah :", matakuliah.length);
console.log("Total SKS         :", hitungTotalSKS(matakuliah));
console.log("IPK (dari data ini):", hitungIPK(matakuliah).toFixed(2));

console.log("\n=== FILTER: Semester 2 dengan nilai minimal AB ===");
filterMatakuliah(matakuliah, 2, "AB").forEach(mk => {
    console.log("-", mk.nama, "(" + mk.nilai + ")");
});

console.log("\n=== CARI: 'pemrograman' ===");
cariMatakuliah(matakuliah, "pemrograman").forEach(mk => {
    console.log("-", mk.kode, mk.nama);
});

console.log("\n=== MATAKULIAH BERNILAI A ATAU SKS >= 4 ===");
for (const mk of matakuliah) {
    if (mk.nilai === "A" || mk.sks >= 4) {
        console.log("-", mk.nama, "| Nilai:", mk.nilai, "| SKS:", mk.sks);
    }
}