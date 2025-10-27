// scripts/main.js
document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Add fade-in animation to elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe all talent cards and sections
    document.querySelectorAll('.talent-card, .display-4, .lead').forEach(el => {
        observer.observe(el);
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Talent card click effects
    document.querySelectorAll('.talent-card').forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // Form validation enhancement
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const inputs = this.querySelectorAll('input[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    input.style.borderColor = 'var(--hololive-pink)';
                    isValid = false;
                } else {
                    input.style.borderColor = 'var(--hololive-green)';
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                // Add shake animation to invalid fields
                inputs.forEach(input => {
                    if (!input.value.trim()) {
                        input.classList.add('shake');
                        setTimeout(() => input.classList.remove('shake'), 500);
                    }
                });
            }
        });
    });

    // Add loading states to buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.type === 'submit' || this.getAttribute('type') === 'submit') {
                const originalText = this.innerHTML;
                this.innerHTML = '<span class="loading-spinner"></span> Loading...';
                this.disabled = true;
                
                // Reset after 2 seconds (for demo)
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.disabled = false;
                }, 2000);
            }
        });
    });
});

// Add to your custom.css
.shake {
    animation: shake 0.5s ease-in-out;
}

@keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
}