document.addEventListener('DOMContentLoaded', () => {    
// --- LÓGICA DEL ACORDEÓN DE PREGUNTAS FRECUENTES ---
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-icon');

        question.addEventListener('click', () => {
            // Comprobar si está abierto
            const isOpen = answer.style.display === 'block';

            // Cerrar todos primero (opcional, para que solo haya 1 abierto)
            document.querySelectorAll('.faq-answer').forEach(a => a.style.display = 'none');
            document.querySelectorAll('.faq-icon').forEach(i => i.textContent = '+');
            document.querySelectorAll('.faq-item').forEach(i => i.style.borderColor = '#e5e7eb');

            // Si no estaba abierto, abrir el actual
            if (!isOpen) {
                answer.style.display = 'block';
                icon.textContent = '×'; // Cambia el más por una equis
                item.style.borderColor = '#485fc7'; // Remarca el borde
            }
        });
    });

    // --- LÓGICA DEL SWITCH MENSUAL / ANUAL ---
    const btnMonthly = document.getElementById('btnMonthly');
    const btnAnnual = document.getElementById('btnAnnual');
    const priceAmounts = document.querySelectorAll('.price-amount');
    const annualSavings = document.querySelectorAll('.annual-saving');

    if(btnMonthly && btnAnnual) {
        btnMonthly.addEventListener('click', () => {
            // Estilos de botones
            btnMonthly.classList.replace('is-ghost', 'is-white');
            btnMonthly.classList.add('has-shadow');
            btnAnnual.classList.replace('is-white', 'is-ghost');
            btnAnnual.classList.remove('has-shadow');

            // Actualizar textos de precios
            priceAmounts.forEach(price => {
                price.textContent = price.getAttribute('data-monthly');
            });
            // Ocultar texto de ahorro
            annualSavings.forEach(saving => {
                saving.classList.add('is-hidden');
            });
        });

        btnAnnual.addEventListener('click', () => {
            // Estilos de botones
            btnAnnual.classList.replace('is-ghost', 'is-white');
            btnAnnual.classList.add('has-shadow');
            btnMonthly.classList.replace('is-white', 'is-ghost');
            btnMonthly.classList.remove('has-shadow');

            // Actualizar textos de precios
            priceAmounts.forEach(price => {
                price.textContent = price.getAttribute('data-annual');
            });
            // Mostrar texto de ahorro
            annualSavings.forEach(saving => {
                saving.classList.remove('is-hidden');
            });
        });
    }
});

// --- LÓGICA DE SUBIDA DE VIDEO (Simulación) ---
    const uploadZone = document.getElementById('uploadZone');
    const uploadInitial = document.getElementById('uploadInitial');
    const uploadProgress = document.getElementById('uploadProgress');
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const cancelUpload = document.getElementById('cancelUpload');
    
    let uploadInterval;

    function startUploadSimulation() {
        if(!uploadInitial || !uploadProgress) return;
        
        // Cambiar interfaces
        uploadInitial.classList.add('is-hidden');
        uploadProgress.classList.remove('is-hidden');
        uploadZone.style.cursor = 'default';
        
        let progress = 0;
        uploadInterval = setInterval(() => {
            progress += 4; // Velocidad de carga
            if (progress > 100) progress = 100;
            
            progressBar.value = progress;
            progressText.textContent = `${progress}%`;
            
            if(progress >= 100) {
                clearInterval(uploadInterval);
                // Redirigir al dashboard tras medio segundo de llegar al 100%
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 500);
            }
        }, 100);
    }

    if (uploadZone) {
        // Al arrastrar
        uploadZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadZone.classList.add('is-dragging');
        });
        uploadZone.addEventListener('dragleave', () => {
            uploadZone.classList.remove('is-dragging');
        });
        // Al soltar el archivo
        uploadZone.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadZone.classList.remove('is-dragging');
            startUploadSimulation();
        });
        // Al hacer clic
        uploadZone.addEventListener('click', (e) => {
            // Evitamos que inicie si le dieron click a "Cancelar"
            if(e.target.id === 'cancelUpload' || uploadProgress.classList.contains('is-hidden') === false) return;
            startUploadSimulation();
        });
    }

    // Lógica para el botón de Cancelar
    if (cancelUpload) {
        cancelUpload.addEventListener('click', (e) => {
            e.stopPropagation(); // Evita que dispare el clic de la zona de subida
            clearInterval(uploadInterval);
            // Restaurar interfaz
            uploadInitial.classList.remove('is-hidden');
            uploadProgress.classList.add('is-hidden');
            progressBar.value = 0;
            progressText.textContent = '0%';
            uploadZone.style.cursor = 'pointer';
        });
    }

    // --- LÓGICA DEL WORKSPACE ---
    const closeFeedbackBtn = document.getElementById('closeFeedback');
    const feedbackBox = document.getElementById('feedbackBox');

    if (closeFeedbackBtn && feedbackBox) {
        closeFeedbackBtn.addEventListener('click', () => {
            // Oculta la caja de feedback con una pequeña transición
            feedbackBox.style.opacity = '0';
            setTimeout(() => {
                feedbackBox.style.display = 'none';
            }, 300);
        });
    }


// --- LÓGICA DE DARK / LIGHT MODE ---
    const themeToggleBtn = document.getElementById('themeToggle');
    const iconsLight = document.querySelectorAll('.theme-icon-light');
    const iconsDark = document.querySelectorAll('.theme-icon-dark');

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        if (theme === 'dark') {
            iconsLight.forEach(icon => icon.classList.add('is-hidden'));
            iconsDark.forEach(icon => icon.classList.remove('is-hidden'));
        } else {
            iconsDark.forEach(icon => icon.classList.add('is-hidden'));
            iconsLight.forEach(icon => icon.classList.remove('is-hidden'));
        }
    }

    const currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    applyTheme(currentTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            applyTheme(newTheme);
        });
    }