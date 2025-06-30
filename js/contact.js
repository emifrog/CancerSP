document.addEventListener('DOMContentLoaded', function() {
    // Gestion du formulaire de contact
    const contactForm = document.getElementById('contactForm');
    const formResponse = document.getElementById('formResponse');
    const submitBtn = document.getElementById('submitBtn');
    const loadingSpinner = document.getElementById('loadingSpinner');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Afficher le spinner de chargement
            submitBtn.style.display = 'none';
            loadingSpinner.style.display = 'block';
            
            // Récupérer les données du formulaire
            const formData = new FormData(contactForm);
            
            // Envoyer les données via AJAX
            fetch('../process_form.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                // Afficher la réponse
                formResponse.style.display = 'block';
                
                if (data.status === 'success') {
                    formResponse.className = 'form-response success';
                    formResponse.innerHTML = '<i class="fas fa-check-circle"></i> ' + data.message;
                    contactForm.reset(); // Réinitialiser le formulaire en cas de succès
                } else {
                    formResponse.className = 'form-response error';
                    let errorMessage = '<i class="fas fa-exclamation-circle"></i> ' + data.message;
                    
                    // Afficher les erreurs spécifiques s'il y en a
                    if (data.errors && data.errors.length > 0) {
                        errorMessage += '<ul>';
                        data.errors.forEach(error => {
                            errorMessage += '<li>' + error + '</li>';
                        });
                        errorMessage += '</ul>';
                    }
                    
                    formResponse.innerHTML = errorMessage;
                }
                
                // Faire défiler jusqu'à la réponse
                formResponse.scrollIntoView({ behavior: 'smooth', block: 'start' });
                
                // Cacher le spinner et réafficher le bouton
                loadingSpinner.style.display = 'none';
                submitBtn.style.display = 'block';
            })
            .catch(error => {
                console.error('Erreur:', error);
                formResponse.className = 'form-response error';
                formResponse.innerHTML = '<i class="fas fa-exclamation-circle"></i> Une erreur est survenue lors de l\'envoi du formulaire. Veuillez réessayer plus tard.';
                formResponse.style.display = 'block';
                
                // Cacher le spinner et réafficher le bouton
                loadingSpinner.style.display = 'none';
                submitBtn.style.display = 'block';
            });
        });
    }
});