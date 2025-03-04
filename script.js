function calcolaDetrazioni() {
    // Recuperiamo i dati inseriti dall'utente
    let creditoImporto = parseFloat(document.getElementById("credito-importo").value);
    let fondoSvalutazione = parseFloat(document.getElementById("fondo-svalutazione").value);
    let svalutazioneBilancio = parseFloat(document.getElementById("svalutazione-bilancio").value);
    
    let beniMateriali = parseFloat(document.getElementById("beni-materiali").value);
    let beniManutenzione = parseFloat(document.getElementById("beni-manutenzione").value);
    let spesaBilancio = parseFloat(document.getElementById("spesa-bilancio").value);
    let speseEsercizio = parseFloat(document.getElementById("spese-esercizio").value);
    
    let totalePlusvalenze = parseFloat(document.getElementById("totale-plusvalenze").value);
    let anniRateizzazione = parseFloat(document.getElementById("anni-rateizzazione").value);

    // Calcolo per i crediti commerciali
    let cinquePercentoCredito = creditoImporto * 0.05;
    
    let detrazioneFiscaleInAumento = 0;
    let detrazioneFiscaleInDiminuzione = 0;

    if (fondoSvalutazione < cinquePercentoCredito) {
        let svalutazioneDeducibile = creditoImporto * 0.005;
        let differenzaSvalutazione = svalutazioneBilancio - svalutazioneDeducibile;
        
        // Detrazione fiscale in aumento
        detrazioneFiscaleInAumento = differenzaSvalutazione;

        // Detrazione fiscale in diminuzione (solo il valore della plusvalenza)
        detrazioneFiscaleInDiminuzione = totalePlusvalenze;
        
        // Calcolo per la manutenzione dei beni
        let beniSenzaManutenzione = beniMateriali - beniManutenzione;
        let cinquePercentoBeni = beniSenzaManutenzione * 0.05;
        let eccedenzaSpesa = spesaBilancio - speseEsercizio - cinquePercentoBeni;

        // Detrazione fiscale in aumento dalla manutenzione
        detrazioneFiscaleInAumento += eccedenzaSpesa;
    } else {
        // Se il fondo svalutazione è superiore al 5% dei crediti commerciali
        document.getElementById("msg-risultato").innerText = "Nessuna detrazione applicabile.";
        return;
    }

    // Calcolo della rateizzazione delle plusvalenze
    let plusvalenzaRateizzata = totalePlusvalenze / anniRateizzazione;

    // Detrazione fiscale in aumento dalla plusvalenza rateizzata
    let detrazionePlusvalenzaAumento = plusvalenzaRateizzata;

    // Aggiungiamo la rateizzazione alla detrazione fiscale in aumento
    detrazioneFiscaleInAumento += detrazionePlusvalenzaAumento;

    // Mostriamo i risultati
    document.getElementById("msg-risultato").innerHTML = `
        <strong>Detrazione Fiscale in Aumento:</strong> €${detrazioneFiscaleInAumento.toFixed(2)}<br>
        <strong>Detrazione Fiscale in Diminuzione (solo Plusvalenza):</strong> €${detrazioneFiscaleInDiminuzione.toFixed(2)}
    `;
}
