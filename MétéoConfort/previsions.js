// previsions.js
// programmation des fonctions dynamiques d'affichage
// programmation des prévisions avec API OpenWeatherMap
// programmation des graphiques d'évolutions statistiques avec Chart.js

// fonction de récupération des données depuis la BDD
async function chargementDataMeteo() {
	try {
		// Effectue une requête HTTP pour obtenir les prevision météo
		const reponse = await fetch('https://meteo.hugo-oval.fr/data-prevision');
		// Convertit la réponse JSON en objet JavaScript
		const meteoDataInit = await reponse.json();
		// Extrait les données météo les plus récentes
		const data = meteoDataInit;
		// Met à jour l'affichage des données sur la page
		return data;
	} catch (error) {
		// Capture et affiche les erreurs éventuelles
		console.error('Erreur lors de la récupération des données météo:', error);
	}
}

let chartInstance = null; //variable de BDD inchangeable

// fonction de mise-à-jour des graphiques dynamiques
async function updateGraphique(type) {
    const data = await chargementDataMeteo();
    const dataMeteoMain = data.hourly

    if (!dataMeteoMain) return;

    const labels = dataMeteoMain.map(hour => {
        const date = new Date(hour.dt * 1000);
        return `${date.getHours()}h`; // Affichage des heures
    });
    
    const dataset = dataMeteoMain.map(hour => hour[type]);
    const labelMap = {
		// variables inchangeables de la BDD
        temp: 'Température (°C)',
        humidity: 'Humidité (%)',
        pressure: 'Pression (hPa)'
    };
    const couleurMap = {
        temp: 'red',
        humidity: 'blue',
        pressure: 'green'
    };

    const ctx = document.getElementById('graphique-dynamique').getContext('2d');
    if (chartInstance) {
        chartInstance.destroy();
    }

    chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: labelMap[type],
                data: dataset,
                borderColor: couleurMap[type],
                fill: false,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Heures'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: labelMap[type]
                    },
                    beginAtZero: false
                }
            }
        }
    });
}

// Charger par défaut le graphique de la température au lancement de la page
updateGraphique('temp');

// fonction mettant-à-jour et affichant initialement les prévisions météo de température
async function updateCartesMeteo() {
    const Data = await chargementDataMeteo();
    const dataMeteoMain = Data.daily
    const contenu = document.getElementById('contenu-previsions');
    contenu.innerHTML = '';

    dataMeteoMain.forEach(day => {
        const carte = document.createElement('div');
        carte.className = 'cartes';

        const date = new Date(day.dt * 1000);
        const options = { weekday: 'long' };
        const nomJour = date.toLocaleDateString('fr-FR', options);

        const iconUrl = `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;

        carte.innerHTML = `
            <h4>${nomJour}</h4>
            <p><img src="${iconUrl}" alt="${day.weather[0].description}"></p>
            <div class="temperature">
                <span class="froid">${day.temp.min.toFixed(0)}</span>
                <span class="chaud">${day.temp.max.toFixed(0)}</span>
            </div>
        `;

        contenu.appendChild(carte);
    });

    // Préparer les données pour le graphique
    const labels = dataMeteoMain.map(day => {
        const date = new Date(day.dt * 1000);
        const options = { weekday: 'short' };
        return date.toLocaleDateString('fr-FR', options);
    });
    const minTemps = dataMeteoMain.map(day => day.temp.min);
    const maxTemps = dataMeteoMain.map(day => day.temp.max);

    // Configurer le graphique
    const ctx = document.getElementById('temperature-max-min').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Température Minimale',
                    data: minTemps,
                    borderColor: 'blue',
                    fill: false,
                    tension: 0.3
                },
                {
                    label: 'Température Maximale',
                    data: maxTemps,
                    borderColor: 'red',
                    fill: false,
                    tension: 0.3
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Chargement par défaut au lancement
updateCartesMeteo();