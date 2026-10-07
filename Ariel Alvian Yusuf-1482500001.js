let matakuliah = [
    { kode: "14823153", nama: "Teknologi Informasi dan Aplikasi Bisnis Berkembang", smt: 2, sks: 3, nilai: "B" },
    { kode: "14823372", nama: "Statistika dan Probabilitas", smt: 2, sks: 2, nilai: "A" },
    { kode: "14823313", nama: "Sistem Basis Data", smt: 2, sks: 3, nilai: "AB" },
    { kode: "14823274", nama: "Pemrograman Berorientasi Objek", smt: 2, sks: 4, nilai: "AB" },
    { kode: "14823393", nama: "Interaksi Manusia Komputer", smt: 2, sks: 3, nilai: "B" },
    { kode: "14823333", nama: "Algoritma dan Struktur Data", smt: 2, sks: 3, nilai: "AB" },
    { kode: "14823192", nama: "Arsitektur dan Organisasi Komputer", smt: 2, sks: 2, nilai: "AB" },
    { kode: "14823532", nama: "Bahasa Inggris", smt: 1, sks: 2, nilai: "AB" },
    { kode: "14823103", nama: "Konsep dan Fondasi Sistem Informasi", smt: 1, sks: 3, nilai: "AB" },
    { kode: "14823202", nama: "Sistem Operasi", smt: 1, sks: 2, nilai: "AB" },
    { kode: "14823342", nama: "Aljabar Linier", smt: 1, sks: 2, nilai: "A" },
    { kode: "14823362", nama: "Kalkulus", smt: 1, sks: 2, nilai: "B" },
    { kode: "14823352", nama: "Matematika Diskrit", smt: 1, sks: 2, nilai: "B" },
    { kode: "14823323", nama: "Dasar Pemrograman", smt: 1, sks: 3, nilai: "B" },
    { kode: "14823012", nama: "Etika Pengembangan Teknologi Siber", smt: 1, sks: 2, nilai: "B" }
];
 
const semesterBerjalan = [
    { kode: "14823213", nama: "Desain Jaringan Komputer dan Komunikasi Data", smt: 3, sks: 3 },
    { kode: "14823383", nama: "Manajemen Data dan Keamanan Siber", smt: 3, sks: 3 },
    { kode: "14823032", nama: "Manajemen Sistem Informasi", smt: 3, sks: 2 },
    { kode: "1003124202", nama: "Pendidikan Agama Islam", smt: 3, sks: 2 },
    { kode: "1003124102", nama: "Pendidikan Pancasila", smt: 3, sks: 2 },
    { kode: "14823293", nama: "Pengembangan Sistem Berbasis Web", smt: 3, sks: 3 },
    { kode: "14823083", nama: "Rekayasa Kebutuhan Perangkat Lunak", smt: 3, sks: 3 },
    { kode: "14823123", nama: "Sistem Enterprise", smt: 3, sks: 3 }
];
 
const bobot = { "A": 4, "AB": 3.5, "B": 3, "BC": 2.5, "C": 2, "D": 1, "E": 0 };
 
function hitungTotalSKS(data) {
    let total = 0;
    for (const mk of data) total += mk.sks;
    return total;
}
 
function hitungIPK(data) {
    let totalNK = 0, totalSKS = 0;
    for (let i = 0; i < data.length; i++) {
        totalNK += bobot[data[i].nilai] * data[i].sks;
        totalSKS += data[i].sks;
    }
    return totalSKS > 0 ? totalNK / totalSKS : 0;
}
 
function cariMatakuliah(data, kataKunci) {
    const q = kataKunci.toLowerCase();
    return data.filter(mk => mk.nama.toLowerCase().includes(q) || mk.kode.includes(q));
}
 
const $ = (id) => document.getElementById(id);
const tbodyNilai = $("tbodyNilai");
const tbodySmt3 = $("tbodySmt3");
const inputCari = $("cari");
const selSmt = $("filterSmt");
const selNilaiFilter = $("filterNilai");
const form = $("formTambah");
const pesanForm = $("pesanForm");
 
let kodeBaru = null; 
 
function renderNilai(data) {
    tbodyNilai.innerHTML = "";
 
    if (data.length === 0) {
        tbodyNilai.innerHTML = `<tr class="empty-row"><td colspan="8">Tidak ada matakuliah yang cocok.</td></tr>`;
    }
 
    data.forEach((mk, i) => {
        const nk = (bobot[mk.nilai] * mk.sks).toFixed(2);
        const tr = document.createElement("tr");
        if (mk.kode === kodeBaru) tr.classList.add("row-new");
        tr.innerHTML = `
            <td>${i + 1}</td>
            <td class="mono">${mk.kode}</td>
            <td>${mk.nama}</td>
            <td>${mk.smt}</td>
            <td>${mk.sks}</td>
            <td><span class="grade-pill grade-${mk.nilai}">${mk.nilai}</span></td>
            <td class="mono">${nk}</td>
            <td><button type="button" class="btn-x btn-del" data-kode="${mk.kode}">Hapus</button></td>
        `;
        tbodyNilai.appendChild(tr);
    });
 
    $("footSKS").textContent = hitungTotalSKS(data);
    $("infoHasil").textContent = `Menampilkan ${data.length} dari ${matakuliah.length} matakuliah`;
}
 
function renderSemester3() {
    tbodySmt3.innerHTML = "";
    semesterBerjalan.forEach((mk, i) => {
        const tr = document.createElement("tr");
        const isi = [i + 1, mk.kode, mk.nama, mk.smt, mk.sks];
        isi.forEach((val, idx) => {
            const td = document.createElement("td");
            td.textContent = val;
            if (idx === 1) td.classList.add("mono");
            tr.appendChild(td);
        });
        tbodySmt3.appendChild(tr);
    });
}
 
function renderRingkasan() {
    $("statIPK").textContent = hitungIPK(matakuliah).toFixed(2);
    $("sideIPK").textContent = hitungIPK(matakuliah).toFixed(2);
    $("statSKS").textContent = hitungTotalSKS(matakuliah) + hitungTotalSKS(semesterBerjalan);
    $("statMK").textContent = matakuliah.length + semesterBerjalan.length;
}
 
function dataTerfilter() {
    let hasil = cariMatakuliah(matakuliah, inputCari.value.trim());
    if (selSmt.value !== "all") {
        hasil = hasil.filter(mk => mk.smt === Number(selSmt.value));
    }
    if (selNilaiFilter.value !== "all") {
        hasil = hasil.filter(mk => mk.nilai === selNilaiFilter.value);
    }
    return hasil;
}
 
function refresh() {
    renderNilai(dataTerfilter());
    renderRingkasan();
}
 
Object.keys(bobot).forEach(n => {
    const o1 = document.createElement("option");
    o1.value = n; o1.textContent = n;
    selNilaiFilter.appendChild(o1);
 
    const o2 = document.createElement("option");
    o2.value = n; o2.textContent = n;
    $("inNilai").appendChild(o2);
});
 
inputCari.addEventListener("input", refresh);
selSmt.addEventListener("change", refresh);
selNilaiFilter.addEventListener("change", refresh);
 
$("btnReset").addEventListener("click", function () {
    inputCari.value = "";
    selSmt.value = "all";
    selNilaiFilter.value = "all";
    refresh();
});
 
tbodyNilai.addEventListener("click", function (e) {
    const btn = e.target.closest(".btn-del");
    if (!btn) return;
    matakuliah = matakuliah.filter(mk => mk.kode !== btn.dataset.kode);
    refresh();
});
 
$("toggleSmt3").addEventListener("click", function () {
    const wrap = $("wrapSmt3");
    wrap.classList.toggle("hidden");
    $("arrowSmt3").textContent = wrap.classList.contains("hidden") ? "[+]" : "[-]";
});
 
$("btnTema").addEventListener("click", function () {
    document.body.classList.toggle("light");
    this.textContent = "tema: " + (document.body.classList.contains("light") ? "terang" : "gelap");
});
 
function setError(idInput, pesan) {
    const el = $(idInput);
    const box = document.querySelector(`[data-err="${idInput}"]`);
    box.textContent = pesan;
    el.classList.toggle("is-invalid", pesan !== "");
    el.classList.toggle("is-valid", pesan === "");
    return pesan === "";
}
 
function validasiForm() {
    const kode = $("inKode").value.trim();
    const nama = $("inNama").value.trim();
    const smt = $("inSmt").value;
    const sks = $("inSks").value;
    const nilai = $("inNilai").value;
 
    let ok = true;
 
    if (!/^\d{8}$/.test(kode)) ok = setError("inKode", "Kode harus tepat 8 digit angka.") && ok;
    else if (matakuliah.some(mk => mk.kode === kode)) ok = setError("inKode", "Kode sudah terdaftar.") && ok;
    else setError("inKode", "");
 
    if (nama.length < 3) ok = setError("inNama", "Nama minimal 3 karakter.") && ok;
    else setError("inNama", "");
 
    if (smt === "" || !Number.isInteger(Number(smt)) || Number(smt) < 1 || Number(smt) > 8)
        ok = setError("inSmt", "Isi semester 1 - 8.") && ok;
    else setError("inSmt", "");
 
    if (sks === "" || !Number.isInteger(Number(sks)) || Number(sks) < 1 || Number(sks) > 6)
        ok = setError("inSks", "Isi SKS 1 - 6.") && ok;
    else setError("inSks", "");
 
    if (nilai === "") ok = setError("inNilai", "Pilih nilai.") && ok;
    else setError("inNilai", "");
 
    return ok;
}
 
function tampilPesan(teks, sukses) {
    pesanForm.textContent = teks;
    pesanForm.classList.remove("hidden", "ok", "fail");
    pesanForm.classList.add(sukses ? "ok" : "fail");
}
 
form.addEventListener("submit", function (e) {
    e.preventDefault(); 
 
    if (!validasiForm()) {
        tampilPesan("Data belum valid, periksa kembali isian di atas.", false);
        return;
    }
 
    const baru = {
        kode: $("inKode").value.trim(),
        nama: $("inNama").value.trim(),
        smt: Number($("inSmt").value),
        sks: Number($("inSks").value),
        nilai: $("inNilai").value
    };
    matakuliah.push(baru);
    kodeBaru = baru.kode;
 
    form.reset();
    form.querySelectorAll(".ctrl").forEach(el => el.classList.remove("is-valid", "is-invalid"));
    form.querySelectorAll(".err-msg").forEach(el => (el.textContent = ""));
 
    inputCari.value = "";
    selSmt.value = "all";
    selNilaiFilter.value = "all";
 
    refresh();
    tampilPesan(`"${baru.nama}" berhasil ditambahkan.`, true);
    kodeBaru = null;
});
 
renderSemester3();
refresh();