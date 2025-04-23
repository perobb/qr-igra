const VALID_IDS = Array.from({ length: 25 }, (_, i) => (i + 1).toString());

const HINTOVI = [
  "Kolo sreće se okreće", "Srebro 2018", "Centar svega (bijelo)",
  "Stara dama", "Stablo kod škole skriva nešto.",
  "Pogledaj ispod klupe kod ulaza.", "Zaviri unutar kućice.",
  "Switch kutak.", "Kava za dobro jutro.",
  "Kao plava ptičica kućica.", "Inače im je dobra Cola.",
  "Switchev najbolji prijatelj.", "Bijela Sumit vrata",
  "Idi do ulaza stadiona.", "Pogledaj plavu ptičju kućicu još jednom.",
  "Vrati se na sam početak, što je bio prvi korak kada si došao?",
  "Broji četvrti sivi od kraja", "Pomoću mene ideš gore/dolje.",
  "Znak za toalet", "Pomična kuća hladnjače Ćavar.",
  "Kada ožedniš navrati po kaficu.", "Ako si ljubitelj knjiga lako ćeš me naći.",
  "Pogledaj e-bike i naći ćeš me.", "Kod ograde igrališta.",
  "Carnet - gdje muzika svira tu ćeš me naći."
];

let korisnici = JSON.parse(localStorage.getItem('korisnici')) || {};

const urlParams = new URLSearchParams(window.location.search);
const kodID = urlParams.get('id');

function startGame() {
  const imePrezime = document.getElementById("imePrezime").value.trim();

  if (!imePrezime || !kodID) {
    alert("Unesi svoj username i pristupi putem QR koda.");
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

  // Hint vezan uz kodID - bez ponavljanja
  const hintIndex = parseInt(kodID) - 1;
  document.getElementById("hint").innerText =
    `Tvoj trag: "${HINTOVI[hintIndex]}"`;
}
