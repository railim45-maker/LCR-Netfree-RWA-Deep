// ========================================
// DASHBOARD - Funzionalità specifiche
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // Carica dati utente
    const user = getCurrentUser();
    if (user) {
        // Aggiorna nome
        const nameEl = document.getElementById('user-name');
        if (nameEl) {
            nameEl.textContent = user.name || 'Utente';
        }
        
        // Aggiorna statistiche (esempio)
        updateStats();
    }
});

// Funzione per aggiornare le statistiche
function updateStats() {
    // In una implementazione reale, questi dati verrebbero dal backend
    // Per ora usiamo dati fittizi di esempio
    
    // NFT in portafoglio
    const nftValue = document.querySelector('.stat-value');
    if (nftValue) {
        // Qui potresti caricare dati reali dal localStorage o API
        console.log('📊 Statistiche aggiornate');
    }
}

// Funzione per caricare le notifiche
function loadNotifications() {
    // Esempio di notifiche (in produzione: da API)
    const notifications = [
        { text: 'Nuovo webinar disponibile - 28 Luglio', time: 'Oggi', isNew: true },
        { text: 'Aggiornati gli scenari di rendimento', time: 'Ieri', isNew: false },
        { text: 'Benvenuto nel progetto! Inizia il tuo percorso', time: '3 giorni fa', isNew: false }
    ];
    
    const list = document.querySelector('.notification-list');
    if (list) {
        list.innerHTML = notifications.map(n => `
            <div class="notification-item">
                <span class="notif-dot ${n.isNew ? 'new' : ''}"></span>
                <p>${n.text}</p>
                <span class="notif-time">${n.time}</span>
            </div>
        `).join('');
    }
}

// Inizializza dashboard
if (document.querySelector('.dashboard-main')) {
    loadNotifications();
}