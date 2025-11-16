/* ============================================
GESTION DU FORMULAIRE DE CONTACT
============================================ */

// Attendre que le DOM soit complètement chargé avant d'exécuter le script
document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // 1. RÉCUPÉRATION DES ÉLÉMENTS DU DOM
    // ============================================
    
    const contactForm = document.getElementById('contactForm');
    const confirmationMessage = document.getElementById('confirmationMessage');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    
    
    // ============================================
    // 2. FONCTION DE VALIDATION D'EMAIL
    // ============================================
    
    /**
     * Vérifie si l'email est au bon format
     * @param {string} email - L'adresse email à valider
     * @returns {boolean} - true si l'email est valide, false sinon
     */
    function isValidEmail(email) {
        // Expression régulière pour valider le format de l'email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    
    // ============================================
    // 3. FONCTION DE VALIDATION DU FORMULAIRE
    // ============================================
    
    /**
     * Valide tous les champs du formulaire
     * @returns {boolean} - true si tous les champs sont valides, false sinon
     */
    function validateForm() {
        let isValid = true;
        
        // Validation du champ Nom
        if (nameInput.value.trim() === '') {
            showError(nameInput, 'Veuillez entrer votre nom');
            isValid = false;
        } else {
            removeError(nameInput);
        }
        
        // Validation du champ Email
        if (emailInput.value.trim() === '') {
            showError(emailInput, 'Veuillez entrer votre email');
            isValid = false;
        } else if (!isValidEmail(emailInput.value.trim())) {
            showError(emailInput, 'Veuillez entrer un email valide');
            isValid = false;
        } else {
            removeError(emailInput);
        }
        
        // Validation du champ Message
        if (messageInput.value.trim() === '') {
            showError(messageInput, 'Veuillez entrer un message');
            isValid = false;
        } else if (messageInput.value.trim().length < 10) {
            showError(messageInput, 'Le message doit contenir au moins 10 caractères');
            isValid = false;
        } else {
            removeError(messageInput);
        }
        
        return isValid;
    }
    
    
    // ============================================
    // 4. FONCTIONS D'AFFICHAGE DES ERREURS
    // ============================================
    
    /**
     * Affiche un message d'erreur sous un champ
     * @param {HTMLElement} input - Le champ concerné
     * @param {string} message - Le message d'erreur à afficher
     */
    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        formGroup.classList.add('error');
        
        // Vérifie si un message d'erreur existe déjà
        let errorMessage = formGroup.querySelector('.error-message');
        
        // Si aucun message d'erreur n'existe, on le crée
        if (!errorMessage) {
            errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            formGroup.appendChild(errorMessage);
        }
        
        // Affiche le message d'erreur
        errorMessage.textContent = message;
        errorMessage.classList.add('show');
    }
    
    /**
     * Supprime le message d'erreur d'un champ
     * @param {HTMLElement} input - Le champ concerné
     */
    function removeError(input) {
        const formGroup = input.closest('.form-group');
        formGroup.classList.remove('error');
        
        const errorMessage = formGroup.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.classList.remove('show');
        }
    }
    
    
    // ============================================
    // 5. GESTION DE LA SOUMISSION DU FORMULAIRE
    // ============================================
    
    /**
     * Gère l'événement de soumission du formulaire
     */
    contactForm.addEventListener('submit', function(event) {
        // Empêche le rechargement de la page (comportement par défaut)
        event.preventDefault();
        
        // Valide le formulaire
        if (validateForm()) {
            // Récupère les valeurs du formulaire
            const formData = {
                nom: nameInput.value.trim(),
                email: emailInput.value.trim(),
                message: messageInput.value.trim(),
                date: new Date().toLocaleString('fr-FR')
            };
            
            // Affiche les données dans la console (pour le développement)
            console.log('Données du formulaire :', formData);
            
            // Simule l'envoi du formulaire (délai de 1 seconde)
            setTimeout(function() {
                // Cache le formulaire
                contactForm.classList.add('hidden');
                
                // Affiche le message de confirmation
                confirmationMessage.classList.add('show');
                
                // Réinitialise le formulaire
                contactForm.reset();
                
                // Optionnel : Réaffiche le formulaire après 5 secondes
                setTimeout(function() {
                    confirmationMessage.classList.remove('show');
                    contactForm.classList.remove('hidden');
                }, 5000);
                
            }, 1000);
        }
    });
    
    
    // ============================================
    // 6. VALIDATION EN TEMPS RÉEL (OPTIONNEL)
    // ============================================
    
    /**
     * Supprime les erreurs lorsque l'utilisateur commence à taper
     */
    nameInput.addEventListener('input', function() {
        if (this.value.trim() !== '') {
            removeError(this);
        }
    });
    
    emailInput.addEventListener('input', function() {
        if (this.value.trim() !== '' && isValidEmail(this.value.trim())) {
            removeError(this);
        }
    });
    
    messageInput.addEventListener('input', function() {
        if (this.value.trim().length >= 10) {
            removeError(this);
        }
    });
    
});