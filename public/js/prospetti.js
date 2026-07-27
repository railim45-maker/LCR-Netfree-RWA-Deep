// ========================================
// PROSPETTI - Gestione dati e visualizzazione
// ========================================

// Dati dei prospetti (in produzione: caricati da API/JSON)
const prospettiData = {
    scenarioA: {
        name: 'Scenario A - Fee NFT 0,75%',
        fasce: [
            { id: 1, range: '0 - 10.000', rendimento: '12,5%', moltiplicatore: '1,25x' },
            { id: 2, range: '10.001 - 50.000', rendimento: '15,8%', moltiplicatore: '1,58x' },
            { id: 3, range: '50.001 - 100.000', rendimento: '18,2%', moltiplicatore: '1,82x' },
            { id: 4, range: '100.001 - 500.000', rendimento: '22,4%', moltiplicatore: '2,24x' }
        ]
    },
    scenarioB: {
        name: 'Scenario B - Fee NFT 0,75% con bonus',
        fasce: [
            { id: 1, range: '0 - 10.000', rendimento: '14,5%', moltiplicatore: '1,45x' },
            { id: 2, range: '10.001 - 50.000', rendimento: '17,8%', moltiplicatore: '1,78x' },
            { id: 3, range: '50.001 - 100.000', rendimento: '21,2%', moltiplicatore: '2,12x' },
            { id: 4, range: '100.001 - 500.000', rendimento: '26,4%', moltiplicatore: '2,64x' }
        ]
    }
};

// Funzione per renderizzare i prospetti
function renderProspetti() {
    renderScenario('scenario-a', prospettiData.scenarioA);
    renderScenario('scenario-b', prospettiData.scenarioB);
}

function renderScenario(containerId, data) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const tableHTML = `
        <div class="card prospetto-card">
            <h3>${data.name}</h3>
            <div class="table-responsive">
                <table class="prospetto-table">
                    <thead>
                        <tr>
                            <th>Fascia asset</th>
                            <th>Range (€)</th>
                            <th>Rendimento annuale</th>
                            <th>Moltiplicatore</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${data.fasce.map(f => `
                            <tr>
                                <td>Fascia ${f.id}</td>
                                <td>${f.range}</td>
                                <td>${f.rendimento}</td>
                                <td>${f.moltiplicatore}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
            <div class="prospetto-actions">
                <button class="btn btn-secondary" onclick="alert('📊 Grafico in sviluppo')">📊 Visualizza grafico</button>
                <button class="btn btn-secondary" onclick="alert('📥 Download PDF in sviluppo')">📥 Scarica PDF</button>
            </div>
        </div>
    `;
    
    container.innerHTML = tableHTML;
}

// Gestione tabs
function setupTabs() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            // Rimuovi active da tutti i tab
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            // Aggiungi active al tab cliccato
            btn.classList.add('active');
            
            // Nascondi tutti i contenuti
            document.querySelectorAll('.tab-content').forEach(c => c.style.display = 'none');
            
            // Mostra il contenuto selezionato
            const targetId = btn.dataset.tab;
            const target = document.getElementById(targetId);
            if (target) {
                target.style.display = 'block';
            }
        });
    });
}

// Inizializza quando il DOM è pronto
document.addEventListener('DOMContentLoaded', () => {
    renderProspetti();
    setupTabs();
});