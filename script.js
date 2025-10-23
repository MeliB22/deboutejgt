// Fonction pour formater un nombre en devise (Euro)
const formaterEuro = (nombre) => {
    return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
    }).format(nombre);
};

document.addEventListener('DOMContentLoaded', () => {
    const formulaire = document.getElementById('formulaireCalcul');
    const resultatsSection = document.getElementById('resultats');
    const resultatLoyersChargesDiv = document.getElementById('resultatLoyersCharges');
    const resultatReparationsDiv = document.getElementById('resultatReparations');
    const resultatFraisProcedureDiv = document.getElementById('resultatFraisProcedure');
    const resultatTotalDiv = document.getElementById('resultatTotal');

    formulaire.addEventListener('submit', function(e) {
        e.preventDefault(); // Empêche le rechargement de la page

        // 1. Récupération des valeurs du formulaire (converties en nombre décimal)
        const demandeLC = parseFloat(document.getElementById('demandeLoyersCharges').value) || 0;
        const demandeRL = parseFloat(document.getElementById('demandeReparations').value) || 0;
        const demandeFP = parseFloat(document.getElementById('demandeFraisProcedure').value) || 0;

        const condamnationLC = parseFloat(document.getElementById('condamnationLoyersCharges').value) || 0;
        const condamnationRL = parseFloat(document.getElementById('condamnationReparations').value) || 0;
        const condamnationFP = parseFloat(document.getElementById('condamnationFraisProcedure').value) || 0;

        // 2. Calcul du "Débouté" pour chaque poste
        const debouteLC = Math.max(0, demandeLC - condamnationLC);
        const debouteRL = Math.max(0, demandeRL - condamnationRL);
        const debouteFP = Math.max(0, demandeFP - condamnationFP);

        // 3. Calcul du total du débouté
        const debouteTotal = debouteLC + debouteRL + debouteFP;

        // 4. Affichage des résultats
        
        // Affichage des loyers et charges
        resultatLoyersChargesDiv.innerHTML = 
            `**Débouté Loyers et charges :** <span>${formaterEuro(debouteLC)}</span>`;

        // Affichage des réparations locatives
        resultatReparationsDiv.innerHTML = 
            `**Débouté Réparations locatives :** <span>${formaterEuro(debouteRL)}</span>`;

        // Affichage des frais de procédure
        resultatFraisProcedureDiv.innerHTML = 
            `**Débouté Frais de procédure :** <span>${formaterEuro(debouteFP)}</span>`;

        // MODIFICATION ICI : Remplacement de "Somme à soustraire" par "Somme à passer en Rubrique 686"
        resultatTotalDiv.innerHTML = 
            `**TOTAL du Débouté (Somme à passer en Rubrique 686) :** <span>${formaterEuro(debouteTotal)}</span>`;
        
        // Rendre la section de résultats visible
        resultatsSection.classList.remove('hidden');

        // Mettre à jour l'en-tête pour l'impression (optionnel mais clair)
        const totalAjustement = debouteTotal > 0 ? ` (${formaterEuro(debouteTotal)} à passer en Rubrique 686)` : '';
        document.querySelector('h2').textContent = `Résultats du Débouté${totalAjustement}`;

    });
});