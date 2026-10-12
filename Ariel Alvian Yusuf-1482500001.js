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

const byId = (id) => document.getElementById(id);

const tbodyNilai = byId("tbodyNilai");
const tbodySmt3 = byId("tbodySmt3");
const inputCari = byId("cari");
const selSmt = byId("filterSmt");
const selNilaiFilter = byId("filterNilai");
const form = byId("formTambah");

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

    byId("footSKS").textContent = hitungTotalSKS(data);
    byId("infoHasil").textContent = `Menampilkan ${data.length} dari ${matakuliah.length} matakuliah`;
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
    byId("statIPK").textContent = hitungIPK(matakuliah).toFixed(2);
    byId("sideIPK").textContent = hitungIPK(matakuliah).toFixed(2);
    byId("statSKS").textContent = hitungTotalSKS(matakuliah) + hitungTotalSKS(semesterBerjalan);
    byId("statMK").textContent = matakuliah.length + semesterBerjalan.length;
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
    byId("inNilai").appendChild(o2);
});

inputCari.addEventListener("input", refresh);
selSmt.addEventListener("change", refresh);
selNilaiFilter.addEventListener("change", refresh);

byId("btnReset").addEventListener("click", function () {
    inputCari.value = "";
    selSmt.value = "all";
    selNilaiFilter.value = "all";
    refresh();
});

byId("btnTema").addEventListener("click", function () {
    document.body.classList.toggle("light");
    this.textContent = "tema: " + (document.body.classList.contains("light") ? "terang" : "gelap");
});

$("#tbodyNilai").on("click", ".btn-del", function () {
    // .attr dipakai (bukan .data) agar kode tetap berupa string, bukan angka
    const kode = $(this).attr("data-kode");

    $(this).closest("tr").fadeOut(300, function () {
        matakuliah = matakuliah.filter(mk => mk.kode !== kode);
        refresh();
    });
});

$("#toggleSmt3").on("click", function () {
    $("#wrapSmt3").slideToggle(300, function () {
        // Ubah tanda [-] / [+] sesuai kondisi tabel
        $("#arrowSmt3").text($(this).is(":visible") ? "[-]" : "[+]");
    });
});

function tampilPesan(teks, sukses) {
    $("#pesanForm")
        .stop(true, true)                        
        .removeClass("hidden ok fail")
        .addClass(sukses ? "ok" : "fail")
        .text(teks)
        .hide()
        .fadeIn(300)
        .delay(3500)
        .fadeOut(400);
}

function setError(idInput, pesan) {
    const el = byId(idInput);
    const box = document.querySelector(`[data-err="${idInput}"]`);
    box.textContent = pesan;
    el.classList.toggle("is-invalid", pesan !== "");
    el.classList.toggle("is-valid", pesan === "");
    return pesan === "";
}

function validasiForm() {
    const kode = byId("inKode").value.trim();
    const nama = byId("inNama").value.trim();
    const smt = byId("inSmt").value;
    const sks = byId("inSks").value;
    const nilai = byId("inNilai").value;

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

form.addEventListener("submit", function (e) {
    e.preventDefault(); // cegah halaman reload

    if (!validasiForm()) {
        tampilPesan("Data belum valid, periksa kembali isian di atas.", false);
        return;
    }

    const baru = {
        kode: byId("inKode").value.trim(),
        nama: byId("inNama").value.trim(),
        smt: Number(byId("inSmt").value),
        sks: Number(byId("inSks").value),
        nilai: byId("inNilai").value
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