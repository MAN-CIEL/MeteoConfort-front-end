//direct.js
//affichages dynamiques des données météo en direct, création de graphiques d'évolutions (Chart.js), et programmation d'autres éléments dynamiques associés aux données météo

// Fonction asynchrone pour récupérer les données météo
async function chargementDataMeteo() {
	try {
		// Effectue une requête HTTP pour obtenir les données météo
		const reponse = await fetch('https://meteo.hugo-oval.fr/data-all-live');
		// Convertit la réponse JSON en objet JavaScript
		const meteoData = await reponse.json();
		// Extrait les données météo les plus récentes
		const data = meteoData.meteo[0];
		// Met à jour l'affichage des données sur la page
		updateDirect(data);
	} catch (error) {
		// Capture et affiche les erreurs éventuelles
		console.error('Erreur lors de la récupération des données météo:', error);
	}
}

// Fonction pour mettre à jour l'affichage des données météo
function updateDirect(data) {
	// Mise à jour des valeurs affichées dans l'interface utilisateur
	document.getElementById("temperature").textContent = `${data.data.temperature.toFixed(2)}°C`;
	document.getElementById("humidite").textContent = `${data.data.humidite.toFixed(2)}%`;
	document.getElementById("pression-locale").textContent = `${data.data.pression.toFixed(2)} hPa`;
	document.getElementById("pression-mer").textContent = `${data.data.pression_niveau_mer.toFixed(2)} hPa`;
	document.getElementById("point-rosee").textContent = `${data.data.data_point_rosee.toFixed(2)}°C`;
	document.getElementById("humidex").textContent = `${data.data.data_humidex.toFixed(0)}`;
	
	// Affichage de la date de dernière mise-à-jour des données
	const dateStr = new Date(data.data_time * 1000).toLocaleString();
	document.getElementById('time').innerHTML = `<h4><mark>Dernière mise à jour : ${dateStr}</mark></h4>`;

	// Mise à jour des jauges graphiques
	updateJaugeT("jauge-temperature", data.data.temperature, -10, 50);
	updateJaugeHe("jauge-humidite", data.data.humidite, 0, 100);
	updateJaugeP("jauge-pression-locale", data.data.pression, 900, 1100);
	updateJaugeP("jauge-pression-mer", data.data.pression_niveau_mer, 900, 1100);
	updateJaugePtR("jauge-point-rosee", data.data.data_point_rosee, -10, 30);
	updateJaugeHx("jauge-humidex", data.data.data_humidex, 5, 50);
	
	// Mise à jour des textes dynamiques
	updateInfoTextP("info-pression-locale", data.data.pression, 900, 1100);
	updateInfoTextP("info-pression-mer", data.data.pression_niveau_mer, 975, 1175);
	updateInfoTextHx("info-humidex", data.data.data_humidex, 5, 50);
}

// Fonction pour mettre à jour la jauge de température
function updateJaugeT(jaugeId, valeur, min, max) { //température
	const jauge = document.getElementById(jaugeId);
	if (!jauge) return;
	
	// Calcul du pourcentage par rapport aux valeurs min et max
	const pourcentage = ((valeur - min) / (max - min)) * 100;
	jauge.style.width = `${Math.min(Math.max(pourcentage, 0), 100)}%`;

	// Définir la couleur en fonction de la valeur
	if (pourcentage < 17) {
		jauge.style.background = "blue";
	} else if (pourcentage < 42) {
		jauge.style.background = "green";
	} else if (pourcentage < 58) {
		jauge.style.background = "yellow";
	} else if (pourcentage < 75) {
		jauge.style.background = "orange";
	} else {
		jauge.style.background = "red";
	}
}

// Fonction pour mettre à jour la jauge du taux d'humdidité
function updateJaugeHe(jaugeId, valeur, min, max) { //Humidité
	const jauge = document.getElementById(jaugeId);
	if (!jauge) return;

	const pourcentage = ((valeur - min) / (max - min)) * 100;
	jauge.style.width = `${Math.min(Math.max(pourcentage, 0), 100)}%`;

	// Définir la couleur en fonction de la valeur
	if (pourcentage < 25) {
		jauge.style.background = "red";
	} else if (pourcentage < 50) {
		jauge.style.background = "orange";
	} else if (pourcentage < 75) {
		jauge.style.background = "yellow";
	} else if (pourcentage < 90) {
		jauge.style.background = "green";
	} else {
		jauge.style.background = "blue";
	}
}

// Fonction pour mettre à jour la jauge de pression locale et niveau mer
function updateJaugeP(jaugeId, valeur, min, max) { //Pression locale et niveau mer
	const jauge = document.getElementById(jaugeId);
	if (!jauge) return;

	const pourcentage = ((valeur - min) / (max - min)) * 100;
	jauge.style.width = `${Math.min(Math.max(pourcentage, 0), 100)}%`;

	// Définir la couleur en fonction de la valeur
	if (pourcentage < 25) {
		jauge.style.background = "green";
	} else if (pourcentage < 50) {
		jauge.style.background = "yellow";
	} else if (pourcentage < 75) {
		jauge.style.background = "orange";
	} else {
		jauge.style.background = "red";
	}
}

// Fonction pour mettre à jour la jauge du point de rosée
function updateJaugePtR(jaugeId, valeur, min, max) { //Point rosée
	const jauge = document.getElementById(jaugeId);
	if (!jauge) return;

	const pourcentage = ((valeur - min) / (max - min)) * 100;
	jauge.style.width = `${Math.min(Math.max(pourcentage, 0), 100)}%`;

	// Définir la couleur en fonction de la valeur
	if (pourcentage < 25) {
		jauge.style.background = "blue";
	} else if (pourcentage < 50) {
		jauge.style.background = "green";
	} else if (pourcentage < 63) {
		jauge.style.background = "yellow";
	} else if (pourcentage < 75) {
		jauge.style.background = "orange";
	} else {
		jauge.style.background = "red";
	}
}

// Fonction pour mettre à jour la jauge de l'humidex
function updateJaugeHx(jaugeId, valeur, min, max) { //Humidex
	const jauge = document.getElementById(jaugeId);
	if (!jauge) return;

	const pourcentage = ((valeur - min) / (max - min)) * 100;
	jauge.style.width = `${Math.min(Math.max(pourcentage, 0), 100)}%`;

	// Définir la couleur en fonction de la valeur
	if (pourcentage < 25) {
		jauge.style.background = "green";
	} else if (pourcentage < 50) {
		jauge.style.background = "yellow";
	} else if (pourcentage < 75) {
		jauge.style.background = "orange";
	} else if (pourcentage < 88) {
		jauge.style.background = "red";
	} else {
		jauge.style.background = "black";
	}
}

// Fonction pour mettre à jour le texte affiché dans la fenêtre pop up dynamique d'informations (pression locale et niveau mer)
function updateInfoTextP(infoTextId, valeur, min, max) {
    const infoText = document.getElementById(infoTextId);
    if (!infoText) return;

    if (min === max) {
        console.error("Les valeurs min et max ne peuvent pas être égales.");
        return;
    }

    let pourcentage = ((valeur - min) / (max - min)) * 100;
    pourcentage = Math.max(0, Math.min(100, pourcentage)); // S'assurer que le pourcentage reste entre 0 et 100
	
	// Définir le texte à afficher en fonction de la valeur
    if (pourcentage < 25) {
        infoText.textContent = "Potentiel de formation nuageuse quasi nul : Ensoleillement garanti";
    } else if (pourcentage < 50) {
        infoText.textContent = "Bas potentiel de formation nuageuse : Ensoleillement favorable";
    } else if (pourcentage < 75) {
        infoText.textContent = "Haut potentiel de formation nuageuse : Ensoleillement défavorable";
    } else {
        infoText.textContent = "Potentiel de formation nuageuse quasi garanti : Ensoleillement médiocre";
    }
}

// Fonction pour mettre à jour le texte affiché dans la fenêtre pop up dynamique d'informations (humidex)
function updateInfoTextHx(infoTextId, valeur, min, max) {
    const infoText = document.getElementById(infoTextId);
    if (!infoText) return;

    if (min === max) {
        console.error("Les valeurs min et max ne peuvent pas être égales.");
        return;
    }

    let pourcentage = ((valeur - min) / (max - min)) * 100;
    pourcentage = Math.max(0, Math.min(100, pourcentage)); // S'assurer que le pourcentage reste entre 0 et 100

	// Définir le texte à afficher en fonction de la valeur
    if (pourcentage < 25) {
        infoText.textContent = "Confortable, aucune sensation d’inconfort";
    } else if (pourcentage < 50) {
        infoText.textContent = "Sensation agréable, peu d’inconfort";
    } else if (pourcentage < 75) {
        infoText.textContent = "Inconfort modéré, la chaleur commence à être lourde";
    } else if (pourcentage < 88) {
        infoText.textContent = "Inconfort important, risque de coup de chaleur accru";
    } else {
        infoText.textContent = "Danger extrême, chaleur difficilement supportable";
    }
}	

// Fonction pour faire apparaître une fenêtre pop up dynamique d'informations
function popUp(id) {
    const info = document.getElementById(id);
    info.classList.add('show');
    info.style.display = 'block';

    setTimeout(() => {
        info.classList.remove('show');
        setTimeout(() => {
            info.style.display = 'none';
        }, 300);
    }, 3000);
}

const chartInstances = {};

// Fonction pour mettre à jour les graphiques des données météo
async function chargementGraphiqueData(type, graphiqueId, label, couleur, timestampMin, timestampMax, nbPoint, secondType = null, secondLabel = null, secondeCouleur = null) {
    try {
        // Requête pour récupérer les données de la première courbe
        const reponse = await fetch(`https://meteo.hugo-oval.fr/data-graf?timestampMin=${timestampMin}&timestampMax=${timestampMax}&nbPoint=${nbPoint}&val=${type}`);
		console.log(reponse);
        const graphiqueData = await reponse.json();

        const labels = graphiqueData.meteo[0].data_list_point.map((_, index) => `Point ${index + 1}`);
        const dataPoints = graphiqueData.meteo[0].data_list_point;

		if (chartInstances[graphiqueId]) {
            chartInstances[graphiqueId].destroy();
        }

        // Configuration de base pour le graphique
        const datasets = [{
            label: label,
            data: dataPoints,
            borderColor: couleur,
            backgroundColor: couleur.replace('1)', '0.2)'),
            borderWidth: 2,
            tension: 0.3
        }];

        // Ajout de la deuxième courbe si un secondType est fourni
        if (secondType) {
            const secondReponse = await fetch(`https://meteo.hugo-oval.fr/data-graf?timestampMin=${timestampMin}&timestampMax=${timestampMax}&nbPoint=${nbPoint}&val=${secondType}`);
            const secondGraphiqueData = await secondReponse.json();
            const secondDataPoints = secondGraphiqueData.meteo[0].data_list_point;

            datasets.push({
                label: secondLabel,
                data: secondDataPoints,
                borderColor: secondeCouleur,
                backgroundColor: secondeCouleur.replace('1)', '0.2)'),
                borderWidth: 2,
                tension: 0.3
            });
        }

        // Récupération du contexte du canvas pour afficher le graphique
        const ctx = document.getElementById(graphiqueId).getContext('2d');
        chartInstances[graphiqueId] = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: datasets
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top'
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false
                    }
                },
                scales: {
                    x: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Points'
                        }
                    },
                    y: {
                        display: true,
                        title: {
                            display: true,
                            text: label
                        }
                    }
                }
            }
        });
    } catch (error) {
        console.error(`Erreur lors de la récupération des données pour ${label}:`, error);
    }
}
// Exécute certaines fonctions une fois que la page est chargée
let graphRefreshInterval;

// Chargement initial des données météo
chargementDataMeteo();

// Rafraîchissement automatique des données météo toutes les 60 secondes
setInterval(chargementDataMeteo, 60000);

// Fonction pour charger les graphiques avec des timestamps mis à jour
function loadGraphs() {
    const timestampMax = Math.floor(Date.now() / 1000);
    const timestampMin = timestampMax - (3600 * 6);
    const nbPoint = 100;

    // Chargement des graphiques avec les timestamps mis à jour
    chargementGraphiqueData('temperature', 'graphTemperature', 'Température (°C)', 'rgba(255, 0, 0, 1)', timestampMin, timestampMax, nbPoint);
    chargementGraphiqueData('humidite', 'graphHumidite', 'Humidité (%)', 'rgba(0, 0, 255, 1)', timestampMin, timestampMax, nbPoint);
    chargementGraphiqueData('pressionmer', 'graphPression', 'Pression Locale (hPa)', 'rgba(0, 128, 0, 1)', timestampMin, timestampMax, nbPoint);
    chargementGraphiqueData('pdr', 'graphPDR', 'Point de rosée (°C)', 'rgb(255, 102, 0)', timestampMin, timestampMax, nbPoint);
}

// Chargement initial des graphiques
loadGraphs();

// Rafraîchissement automatique des graphiques toutes les 60 secondes
graphRefreshInterval = setInterval(loadGraphs, 60000);

// Fonction pour arrêter le rafraîchissement automatique des graphiques
function stopGraphRefresh() {
    if (graphRefreshInterval) {
        clearInterval(graphRefreshInterval);
        graphRefreshInterval = null;
    }
}

// Fonction pour réactiver le rafraîchissement automatique des graphiques
function startGraphRefresh() {
    if (!graphRefreshInterval) {
        graphRefreshInterval = setInterval(loadGraphs, 60000);
    }
}

// Fonction pour récupérer les données et arrêter le rafraîchissement des graphiques
window.recupererDonnees = function() {
    // Arrêter le rafraîchissement automatique des graphiques
    stopGraphRefresh();

    // Récupérer les valeurs des champs
    const dateDebut = document.getElementById('dateDebut').value;
    const dateFin = document.getElementById('dateFin').value;
    const nbPoint = parseInt(document.getElementById('nombrePoints').value, 10);

    const timestampMin = new Date(dateDebut).getTime() / 1000;
    const timestampMax = new Date(dateFin).getTime() / 1000;

    chargementGraphiqueData('temperature', 'graphTemperature', 'Température (°C)', 'rgba(255, 0, 0, 1)', timestampMin, timestampMax, nbPoint);
    chargementGraphiqueData('humidite', 'graphHumidite', 'Humidité (%)', 'rgba(0, 0, 255, 1)', timestampMin, timestampMax, nbPoint);
    chargementGraphiqueData('pressionmer', 'graphPression', 'Pression Locale (hPa)', 'rgba(0, 128, 0, 1)', timestampMin, timestampMax, nbPoint);
    chargementGraphiqueData('pdr', 'graphPDR', 'Point de rosée (°C)', 'rgb(255, 102, 0)', timestampMin, timestampMax, nbPoint);
}