function hitungUmur(tahunIni, tahunLahir){
    return tahunIni - tahunLahir;
}
function hitungMateri(arrayMateri){
    return arrayMateri.length;
}

var myProfile = {
    nama:"Ridwan",
    kota:"Semarang",
    lahir:2001,
    tinggi:165,
    materi:["JAVA","ReactJS","React Native"]
};

document.getElementById("nama").innerHTML = myProfile.nama;
document.getElementById("kota-asal").innerHTML = myProfile.kota;
document.getElementById("usia").innerHTML = hitungUmur(2021, myProfile.lahir);
document.getElementById("tinggi-badan").innerHTML = myProfile.tinggi;
document.getElementById("jumlah-materi").innerHTML = hitungMateri(myProfile.materi);
document.getElementById("materi-1").innerHTML = myProfile.materi[0];
document.getElementById("materi-2").innerHTML = myProfile.materi[1];
document.getElementById("materi-3").innerHTML = myProfile.materi[2];