// ============================================================
// 1. DARK MODE
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.getElementById('darkModeToggle');
    const body = document.body;

    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        toggle.innerHTML = '<i class="bi bi-sun"></i>';
    }

    toggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            toggle.innerHTML = '<i class="bi bi-sun"></i>';
        } else {
            localStorage.setItem('theme', 'light');
            toggle.innerHTML = '<i class="bi bi-moon"></i>';
        }
    });
});

// ============================================================
// 2. NAVBAR DYNAMIQUE
// ============================================================
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('mainNav');
    if (window.scrollY > 80) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ============================================================
// 3. MENU HAMBURGER
// ============================================================
document.getElementById('navToggle').addEventListener('click', function() {
    const menu = document.getElementById('navMenu');
    menu.classList.toggle('open');
    this.innerHTML = menu.classList.contains('open') ? '<i class="bi bi-x"></i>' : '<i class="bi bi-list"></i>';
});

// ============================================================
// 4. RETOUR EN HAUT
// ============================================================
const backBtn = document.getElementById('backToTop');
window.addEventListener('scroll', function() {
    backBtn.classList.toggle('show', window.scrollY > 300);
});
backBtn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ============================================================
// 5. ANNÉE DYNAMIQUE
// ============================================================
document.querySelectorAll('#currentYear').forEach(el => el.textContent = new Date().getFullYear());

// ============================================================
// 6. COMPTE À REBOURS
// ============================================================
const target = new Date('2026-12-15T09:00:00').getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const diff = target - now;

    if (diff <= 0) {
        ['days','hours','minutes','seconds'].forEach(id => document.getElementById(id).textContent = '00');
        return;
    }

    document.getElementById('days').textContent = String(Math.floor(diff / (1000*60*60*24))).padStart(2,'0');
    document.getElementById('hours').textContent = String(Math.floor((diff % (1000*60*60*24)) / (1000*60*60))).padStart(2,'0');
    document.getElementById('minutes').textContent = String(Math.floor((diff % (1000*60*60)) / (1000*60))).padStart(2,'0');
    document.getElementById('seconds').textContent = String(Math.floor((diff % (1000*60)) / 1000)).padStart(2,'0');
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ============================================================
// 7. COMPTEURS ANIMÉS
// ============================================================
document.querySelectorAll('.counter').forEach(c => {
    const target = parseInt(c.dataset.target);
    let current = 0;
    const step = target / 60;
    let count = 0;

    const animate = () => {
        count++;
        current += step;
        c.textContent = count < 60 ? Math.ceil(current) : target;
        if (count < 60) requestAnimationFrame(animate);
    };

    new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            animate();
            this.disconnect();
        }
    }, { threshold: 0.5 }).observe(c);
});

// ============================================================
// 8. FADE-IN
// ============================================================
document.querySelectorAll('.fade-in').forEach(el => {
    new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            el.classList.add('visible');
            this.disconnect();
        }
    }, { threshold: 0.1 }).observe(el);
});

// ============================================================
// 9. ONGLETS DU PROGRAMME
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.tab-btn');
    const contents = document.querySelectorAll('.tab-content');

    if (tabs.length === 0) return;

    tabs.forEach(function(tab) {
        tab.addEventListener('click', function() {
            // Enlever la classe active de tous les onglets
            tabs.forEach(function(t) {
                t.classList.remove('active');
            });

            // Cacher tous les contenus
            contents.forEach(function(c) {
                c.classList.remove('active');
            });

            // Activer l'onglet cliqué
            this.classList.add('active');

            // Afficher le contenu correspondant
            const day = this.getAttribute('data-day');
            const targetContent = document.getElementById('day' + day);
            
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
});

// ============================================================
// 10. FILTRAGE DES INTERVENANTS
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    const filters = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.speaker-card');

    if (filters.length === 0 || cards.length === 0) return;

    filters.forEach(function(filter) {
        filter.addEventListener('click', function() {
            // Enlever la classe active de tous les filtres
            filters.forEach(function(f) {
                f.classList.remove('active');
            });

            // Activer le filtre cliqué
            this.classList.add('active');

            const category = this.getAttribute('data-category');

            cards.forEach(function(card) {
                const cardCategory = card.getAttribute('data-category');
                if (category === 'all' || category === cardCategory) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});

// ============================================================
// 11. VALIDATION DU FORMULAIRE DE CONTACT
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const successMsg = document.getElementById('successMessage');

    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;

        // Liste des champs à vérifier
        const fields = ['nom', 'email', 'telephone', 'participant', 'pays', 'message'];

        // 1. Vérifier que tous les champs sont remplis
        fields.forEach(function(id) {
            const input = document.getElementById(id);
            const error = document.getElementById(id + 'Error');
            
            if (!input.value.trim()) {
                input.classList.add('is-invalid');
                input.classList.remove('is-valid');
                if (error) {
                    error.textContent = 'Ce champ est requis.';
                    error.classList.add('show');
                }
                isValid = false;
            } else {
                input.classList.remove('is-invalid');
                input.classList.add('is-valid');
                if (error) {
                    error.classList.remove('show');
                }
            }
        });

        // 2. Vérifier le format de l'email
        const email = document.getElementById('email');
        const emailError = document.getElementById('emailError');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (email.value.trim() && !emailRegex.test(email.value.trim())) {
            email.classList.add('is-invalid');
            email.classList.remove('is-valid');
            if (emailError) {
                emailError.textContent = 'Veuillez entrer une adresse email valide.';
                emailError.classList.add('show');
            }
            isValid = false;
        }

        // 3. Vérifier le téléphone (minimum 8 chiffres)
        const tel = document.getElementById('telephone');
        const telError = document.getElementById('telephoneError');
        const digits = tel.value.replace(/\D/g, '');
        
        if (tel.value.trim() && digits.length < 8) {
            tel.classList.add('is-invalid');
            tel.classList.remove('is-valid');
            if (telError) {
                telError.textContent = 'Le téléphone doit contenir au moins 8 chiffres.';
                telError.classList.add('show');
            }
            isValid = false;
        }

        // 4. Vérifier le message (minimum 20 caractères)
        const msg = document.getElementById('message');
        const msgError = document.getElementById('messageError');
        
        if (msg.value.trim() && msg.value.trim().length < 20) {
            msg.classList.add('is-invalid');
            msg.classList.remove('is-valid');
            if (msgError) {
                msgError.textContent = 'Le message doit contenir au moins 20 caractères.';
                msgError.classList.add('show');
            }
            isValid = false;
        }

        // 5. Afficher le message de succès ou d'erreur
        if (isValid) {
            if (successMsg) {
                successMsg.className = 'success';
                successMsg.textContent = '✅ Votre demande a été envoyée avec succès !';
                successMsg.style.display = 'block';
            }
            
            // Réinitialiser le formulaire
            form.reset();
            
            // Enlever les classes de validation
            document.querySelectorAll('.is-valid').forEach(function(el) {
                el.classList.remove('is-valid');
            });
            
            // Cacher le message après 5 secondes
            setTimeout(function() {
                if (successMsg) {
                    successMsg.style.display = 'none';
                }
            }, 5000);
            
        } else {
            if (successMsg) {
                successMsg.className = 'error';
                successMsg.textContent = '❌ Veuillez corriger les erreurs ci-dessus.';
                successMsg.style.display = 'block';
            }
            
            // Faire défiler jusqu'au premier champ invalide
            const firstInvalid = form.querySelector('.is-invalid');
            if (firstInvalid) {
                firstInvalid.focus();
            }
        }
    });
});