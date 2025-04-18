const VALID_IDS = Array.from({length: 25}, (_, i) => (i + 1).toString());

const HINTOVI = [
  "Idi do crvene klupe u parku.", "Pogledaj iza znaka stop.", "Provjeri ispod stepenica.",
  "Oko fontane ima nešto zanimljivo.", "Stablo kod škole skriva nešto.",
  "Pogledaj ispod klupe kod muzeja.", "Idi prema glavnom ulazu crkve.",
  "Pogledaj ispod mosta.", "Idi do trafike kod doma zdravlja.",
  "Kod biblioteke potraži trag.", "Idi do sportskog terena.",
  "Kod autobuske stanice se nešto krije.", "Provjeri kod apoteke.",
  "Idi do ulaza stadiona.", "Stablo na raskršću ima trag.",
  "Ispod znaka 'Izlaz' se nešto krije.", "Kod škole pod rampom.",
  "Stara česma skriva trag.", "Idi do zadnje klupe u parku.",
  "Ispod poštanskog sandučića.", "Kanta za smeće kod trgovine.",
  "Kod dječijeg igrališta.", "Ispod prozora doma kulture.",
  "Kod ograde igrališta.", "Kod stare zgrade općine."
];

let korisnici = JSON.parse(localStorage.getItem('korisnici')) || {};

const urlParams = new URLSearchParams(window.location.search);
const kodID = urlParams.get('id');

function startGame() {
  const imePrezime = document.getElementById("imePrezime").value.trim();
  if (!imePrezime || !kodID) {
    alert("Unesi ime i prezime i pristupi putem QR koda.");
    return;
  }

  if (!VALID_IDS.includes(kodID)) {
    alert("QR kod nije ispravan.");
    return;
  }

  if (!korisnici[imePrezime]) {
    korisnici[imePrezime] = [];
  }

  const vecSkenirano = korisnici[imePrezime];

  if (vecSkenirano.includes(kodID)) {
    alert("Ovaj QR kod si već skenirao!");
    return;
  }

  vecSkenirano.push(kodID);
  localStorage.setItem('korisnici', JSON.stringify(korisnici));

  document.getElementById("rezultat").style.display = "block";
  document.getElementById("brojKodova").innerText = vecSkenirano.length;
  document.getElementById("hint").innerText =
    `Tvoj trag: "${HINTOVI[Math.floor(Math.random() * HINTOVI.length)]}"`;
}
