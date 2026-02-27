/**
 * Mamisha Restaurant - Interacciones JS
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mobile Menu Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Cerrar menú al hacer clic en un enlace (móvil)
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });

    // 2. Smooth Scrolling para enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Offset para el header fijo
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. Header transparente al inicio, con fondo al hacer scroll
    const header = document.getElementById('header');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(249, 246, 240, 0.98)';
            header.style.boxShadow = '0 4px 6px rgba(26, 26, 26, 0.08)';
        } else {
            header.style.backgroundColor = 'rgba(249, 246, 240, 0.85)';
            header.style.boxShadow = 'none';
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initialize on load

    // 4. Animaciones al hacer scroll (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // 15% del elemento visible para desencadenar
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Dejar de observar una vez que ya apareció
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Seleccionar elementos con la clase fade-up
    const fadeElements = document.querySelectorAll('.fade-up');
    fadeElements.forEach(el => {
        scrollObserver.observe(el);
    });

    // 5. Manejo del Formulario de Reservas
    const reservationForm = document.getElementById('reservation-form');
    const formMessage = document.getElementById('form-message');

    if (reservationForm) {
        reservationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simular el envío de datos
            const name = document.getElementById('name').value;
            const date = document.getElementById('date').value;
            const btn = reservationForm.querySelector('button[type="submit"]');
            
            // Estado de carga
            const originalText = btn.textContent;
            btn.textContent = 'Procesando...';
            btn.disabled = true;
            
            setTimeout(() => {
                // Restaurar botón
                btn.textContent = originalText;
                btn.disabled = false;
                
                // Mostrar mensaje de éxito
                formMessage.textContent = `¡Reserva confirmada, ${name}! Te esperamos el ${date}.`;
                formMessage.classList.remove('hidden');
                formMessage.classList.add('success');
                
                // Limpiar formulario
                reservationForm.reset();
                
                // Ocultar mensaje después de unos segundos
                setTimeout(() => {
                    formMessage.classList.add('hidden');
                    formMessage.classList.remove('success');
                }, 5000);
            }, 1500); // 1.5s delay falso
        });
    }

    // Asegurarse de que la fecha mínima en el input de fecha sea hoy
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
});
