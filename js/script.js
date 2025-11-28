// Recupera l'utente salvato
let utente = localStorage.getItem("utente");

// Se non esiste → chiedilo
if (!utente) {
    utente = prompt("🎄 Benvenuto! Inserisci il tuo nome:");
    if (!utente || utente.trim() === "") {
        utente = "Ospite";
    }
    localStorage.setItem("utente", utente);
}

// Funzione bottone ENTRA
function entra() {
    window.location.href = "calendario.html";
}

// Funzione CAMBIA NOME
function cambiaNome() {
    let nuovoNome = prompt("Inserisci il nuovo nome:");
    if (nuovoNome && nuovoNome.trim() !== "") {
        localStorage.setItem("utente", nuovoNome.trim());
        alert("Nome aggiornato!");
    }
}

// GENERA AUTOMATICAMENTE LE 24 CASELLE
const grid = document.getElementById("calendar-grid");

for (let i = 1; i <= 24; i++) {
    const box = document.createElement("div");
    box.className = "day-box";

    box.innerHTML = `
        <img src="immagini/giorni/${i}.png" class="day-img" alt="Giorno ${i}">
        <span class="day-number">${i}</span>
    `;

    // Clic su un giorno → apri pagina dedicata
    box.addEventListener("click", () => {
        window.location.href = `giornate/${i}.html`;
    });

    grid.appendChild(box);
}
