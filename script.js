function calcolaDetrazioni() {
    // Recuperiamo i dati inseriti dall'utente
    let creditoImporto = parseFloat(document.getElementById("credito-importo").value);
    let fondoSvalutazione = parseFloat(document.getElementById("fondo-svalutazione").value);
    let svalutazioneBilancio = parseFloat(document.getElementById("svalutazione-bilancio").value);
    
    let beniMateriali = parseFloat(document.getElementById("beni-materiali").value);
    let beniManutenzione = parseFloat(document.getElementById("beni-manutenzione").value);
    let spesaBilancio = parseFloat(document.getElementById("spesa-bilancio").value);
    let speseEsercizio = parseFloat(document.getElementById("spese-esercizio").value);

    // Calcolo per i crediti commerciali
    let cinquePercentoCredito = creditoImporto * 0.05;
    
    if (fondoSvalutazione < cinquePercentoCredito) {
        let svalutazioneDeducibile = creditoImporto * 0.005;
        let differenzaSvalutazione = svalutazioneBilancio - svalutazioneDeducibile;
        
        // Calcolo dell'imponibile IRES per i crediti commerciali
        let imponibileIRES = differenzaSvalutazione;
        
        // Calcolo per la manutenzione dei beni
        let beniSenzaManutenzione = beniMateriali - beniManutenzione;
        let cinquePercentoBeni = beniSenzaManutenzione * 0.05;
        let eccedenzaSpesa = spesaBilancio - speseEsercizio - cinquePercentoBeni;
        
        // Calcolo dell'imponibile IRES per le manutenzioni
        let imponibileIRESManutenzione = eccedenzaSpesa;

        // Mostriamo i risultati
        document.getElementById("msg-risultato").innerHTML = `
            <strong>Imponibile IRES Crediti Commerciali:</strong> €${imponibileIRES.toFixed(2)}<br>
            <strong>Imponibile IRES Manutenzione Beni:</strong> €${imponibileIRESManutenzione.toFixed(2)}
        `;
    } else {
        // Se il fondo svalutazione è superiore al 5% dei crediti commerciali
        document.getElementById("msg-risultato").innerText = "Nessuna detrazione applicabile.";
    }
}
