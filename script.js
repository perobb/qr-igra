// Definiraj dozvoljene ID-eve QR kodova
const VALID_IDS = Array.from({ length: 25 }, (_, i) => (i + 1).toString());

// Definiraj listu hintova koje će korisnici nasumično dobijati
const HINTOVI = [
  "Kolo sreće se okreće.", "Provjeri ispod stepenica.",
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
  "Kod ograde igrališta.", "Kod stare zgrade općine.",
  "Ispod table dobrodošlice u školu."
];

// Učitaj podatke iz lokalne memorije ili kreiraj prazan objekt ako ne postoji
let korisnici = JSON.parse(localStorage.getItem('korisnici')) || {};

// Iz URL-a uzmi ID QR koda (npr. ?id=5)
const urlParams = new URLSearchParams(window.location.search);
const kodID = urlParams.get('id');

// Funkcija koja se pokreće kad korisnik klikne na "Potvrdi"
function startGame() {
  const imePrezime = document.getElementById("imePrezime").value.trim();

  // Validacija
  if (!imePrezime || !kodID) {
    alert("Unesi ime i prezime i pristupi putem QR koda.");
    return;
  }

  if (!VALID_IDS.includes(kodID)) {
    alert("QR kod nije ispravan.");
    return;
  }

  // Ako korisnik još ne postoji, dodaj ga
  if (!korisnici[imePrezime]) {
    korisnici[imePrezime] = [];
  }

  const vecSkenirano = korisnici[imePrezime];

  // Provjeri da li je korisnik već skenirao isti kod
  if (vecSkenirano.includes(kodID)) {
    alert("Ovaj QR kod si već skenirao!");
    return;
  }

  // Dodaj novi sken u listu
  vecSkenirano.push(kodID);
  localStorage.setItem('korisnici', JSON.stringify(korisnici));

  // Prikaz rezultata
  document.getElementById("rezultat").style.display = "block";
  document.getElementById("brojKodova").innerText = vecSkenirano.length;

  // Nasumičan hint
  const nasumicanHint = HINTOVI[Math.floor(Math.random() * HINTOVI.length)];
  document.getElementById("hint").innerText = `Tvoj trag: "${nasumicanHint}"`;
}
