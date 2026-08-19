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