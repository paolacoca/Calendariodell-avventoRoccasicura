/* ============================================================
   📌 CARICA NOME UTENTE
============================================================ */

let utente = localStorage.getItem("utente");

if (!utente) {
    // se il popup esiste lo apriamo, altrimenti fallback prompt
    const popup = document.getElementById("name-popup");

    if (popup) {
        popup.classList.remove("hidden");

        document.getElementById("btn-salva-nome").onclick = function () {
            const nomeInserito = document.getElementById("input-nome").value.trim();
            if (nomeInserito !== "") {
                localStorage.setItem("utente", nomeInserito);
                popup.classList.add("hidden");
                location.reload();
            }
        };
    } else {
        // fallback sicurezza
        utente = prompt("🎄 Inserisci il tuo nome:") || "Ospite";
        localStorage.setItem("utente", utente);
    }
}


/* ============================================================
   ✏️ CAMBIA NOME
============================================================ */

function cambiaNome() {
    const nuovo = prompt("Inserisci un nuovo nome:");
    if (nuovo && nuovo.trim() !== "") {
        localStorage.setItem("utente", nuovo.trim());
        location.reload();
    }
}


/* ============================================================
   📅 GENERA CASELLE 1-24 + POSIZIONAMENTO SPECIALE DEL 25
============================================================ */

const grid = document.getElementById("calendar-grid");

function dataApertura(giorno) {
    return new Date(`2025-12-${String(giorno).padStart(2, "0")}T00:00:00`);
}

/* ---- CREA I GIORNI 1 → 24 IN ORDINE NORMALE ---- */
for (let i = 1; i <= 24; i++) {
    const box = document.createElement("div");
    box.classList.add("day-box");

    box.innerHTML = `
        <img src="immagini/giorni/${i}.png" class="day-image" alt="Giorno ${i}">
    `;

    box.addEventListener("click", () => gestisciClick(i));
    grid.appendChild(box);
}

/* ---- CREA IL GIORNO 25 E LO METTE IN RIGA 8 - COLONNA 2 ---- */
const box25 = document.createElement("div");
box25.classList.add("day-box", "day-special");

box25.innerHTML = `
    <img src="immagini/giorni/25.png" class="day-image" alt="Giorno 25">
`;

box25.style.gridColumn = "2";   // colonna centrale
box25.style.gridRow = "8";      // dopo le prime 7 righe
box25.addEventListener("click", () => gestisciClick(25));

grid.appendChild(box25);


/* ============================================================
   ⏳ CLICK + POPUP CONTO ALLA ROVESCIA
============================================================ */

const popup = document.getElementById("popup");
const closeBtn = document.getElementById("close-popup");
const countdownEl = document.getElementById("countdown");

let timerInterval;

function gestisciClick(giorno) {
    const oggi = new Date();
    const apertura = dataApertura(giorno);

    if (oggi >= apertura) {
        window.location.href = `giornate/${giorno}.html`;
    } else {
        mostraPopup(apertura);
    }
}

function mostraPopup(apertura) {
    popup.classList.remove("hidden");

    clearInterval(timerInterval);

    timerInterval = setInterval(() => {
        const now = new Date();
        const diff = apertura - now;

        if (diff <= 0) {
            countdownEl.textContent = "Apertura disponibile!";
            clearInterval(timerInterval);
            return;
        }

        let giorni = Math.floor(diff / (1000 * 60 * 60 * 24));
        let ore = Math.floor((diff / (1000 * 60 * 60)) % 24);
        let minuti = Math.floor((diff / (1000 * 60)) % 60);
        let secondi = Math.floor((diff / 1000) % 60);

        countdownEl.textContent =
            `${giorni} g : ${ore} h : ${minuti} m : ${secondi} s`;
    }, 1000);
}

closeBtn.addEventListener("click", () => {
    popup.classList.add("hidden");
    clearInterval(timerInterval);
});
