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
   📅 GENERA LE CASELLE DEL CALENDARIO (1–24) + CASELLA 25 SPECIALE
============================================================ */

const grid = document.getElementById("calendar-grid");

function dataApertura(giorno) {
    // Giorno 25 lo facciamo aprire solo il 25
    if (giorno == 25) {
        return new Date(`2025-12-25T00:00:00`);
    }
    return new Date(`2025-12-${String(giorno).padStart(2, '0')}T00:00:00`);
}

// 🔹 Prima inseriamo 1 → 24
for (let i = 1; i <= 24; i++) {
    const box = document.createElement("div");
    box.className = "day-box";

    box.innerHTML = `
        <img src="immagini/giorni/${i}.png" alt="Giorno ${i}" class="day-image">
    `;

    box.addEventListener("click", () => gestisciClick(i));
    grid.appendChild(box);
}

// 🔹 Ora inseriamo la CASELLA 25 (sotto la 23)
const box25 = document.createElement("div");
box25.className = "day-box day-special";

box25.innerHTML = `
    <img src="immagini/giorni/25.png" alt="Giorno 25" class="day-image">
`;

box25.addEventListener("click", () => gestisciClick(25));

// -> posizione sotto la 23 = dopo la casella 23 = index 23 (0-based)
grid.insertBefore(box25, grid.children[24]);


/* ============================================================
   ⏳ GESTIONE CLICK + POPUP CONTO ALLA ROVESCIA
============================================================ */

const popup = document.getElementById("popup");
const closeBtn = document.getElementById("close-popup");
const countdownEl = document.getElementById("countdown");

let timerInterval;

function gestisciClick(giorno) {
    const adesso = new Date();
    const apertura = dataApertura(giorno);

    // Se il giorno è disponibile → apri pagina
    if (adesso >= apertura) {
        const pagina = giorno === 25 ? "speciale.html" : `${giorno}.html`;
        window.location.href = `giornate/${pagina}`;
        return;
    }

    // Mostra popup
    mostraPopup(apertura);
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

        const giorni = Math.floor(diff / (1000 * 60 * 60 * 24));
        const ore = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minuti = Math.floor((diff / (1000 * 60)) % 60);
        const secondi = Math.floor((diff / 1000) % 60);

        countdownEl.textContent =
            `${giorni} g : ${ore} h : ${minuti} m : ${secondi} s`;
    }, 1000);
}


// 🔘 chiudi popup
closeBtn.addEventListener("click", () => {
    popup.classList.add("hidden");
    clearInterval(timerInterval);
});
