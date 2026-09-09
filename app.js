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

    // --- LÓGICA DEL MENÚ DESPLEGABLE DE USUARIO ---
    const userMenuDropdown = document.getElementById('userMenuDropdown');
    const userMenuEmail = document.getElementById('userMenuEmail');

    if (userMenuDropdown) {
        const trigger = userMenuDropdown.querySelector('.dropdown-trigger button');
        
        // 1. Abrir/Cerrar al hacer clic en el botón
        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            userMenuDropdown.classList.toggle('is-active');
        });

        // 2. Cerrar el menú si haces clic en cualquier otro lado de la pantalla
        document.addEventListener('click', (e) => {
            if (!userMenuDropdown.contains(e.target)) {
                userMenuDropdown.classList.remove('is-active');
            }
        });

        // 3. Extraer el correo del Token de sesión y mostrarlo
        const token = localStorage.getItem('token');
        if (token && userMenuEmail) {
            try {
                
                const payload = JSON.parse(atob(token.split('.')[1]));
                userMenuEmail.textContent = payload.email || 'Usuario';
            } catch (error) {
                console.error('Error al leer el token:', error);
                userMenuEmail.textContent = 'Usuario';
            }
        }
    }
    
    // --- LÓGICA DE CONEXIÓN AL BACKEND (De prueba) ---
    function checkBackendConnection() {
        console.log('Verificando conexión con el backend...');
        
        // Hacemos una petición a la ruta que acabamos de crear en Node
        fetch('http://localhost:5000/api/status')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la respuesta del servidor');
                }
                return response.json();
            })
            .then(data => {
                console.log('¡Conexión exitosa!');
                console.log('Mensaje del servidor:', data.message);
            })
            .catch(error => {
                console.error('No se pudo conectar al backend');
            });
    }

    // Ejecutamos la verificación al cargar la página
    checkBackendConnection();



    // --- LÓGICA PARA EL FORMULARIO DE REGISTRO ---
    const registerForm = document.querySelector('form'); // Busca el formulario
    
    // Verificamos si estamos en la página de registro
    if (window.location.pathname.includes('register.html') && registerForm) {
        
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Evita que la página recargue

            // Obtenemos los valores de los inputs
            const inputs = registerForm.querySelectorAll('input');
            const email = inputs[0].value;
            const password = inputs[1].value;
            const confirmPassword = inputs[2].value;

            // Validación básica
            if (password !== confirmPassword) {
                alert('Las contraseñas no coinciden');
                return;
            }

            try {
                // Hacemos el request a nuestro servidor
                const response = await fetch('http://localhost:5000/api/auth/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();

                if (response.ok) {
                    alert('¡' + data.message + ' Ahora inicia sesión.');
                    window.location.href = 'login.html'; // Lo mandamos al login
                } else {
                    alert('Error: ' + data.message);
                }
            } catch (error) {
                console.error('Error:', error);
                alert('No se pudo conectar con el servidor.');
            }
        });
    }
      // --- LÓGICA PARA EL FORMULARIO DE LOGIN ---
    
    if (window.location.href.includes('login.html')) {
        console.log('Modo Login detectado');
        const loginForm = document.querySelector('form');
        
        if (loginForm) {
            loginForm.addEventListener('submit', async (e) => {
                e.preventDefault(); 
                console.log('Botón presionado, enviando datos...');

                const inputs = loginForm.querySelectorAll('input');
                const email = inputs[0].value;
                const password = inputs[1].value;

                console.log(`Intentando entrar con: ${email}`); // Para ver si está atrapando los textos

                try {
                    const response = await fetch('http://localhost:5000/api/auth/login', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email, password })
                    });

                    const data = await response.json();

                    if (response.ok) {
                        console.log('Login exitoso, guardando token...');
                        localStorage.setItem('token', data.token);
                        window.location.href = 'dashboard.html';
                    } else {
                        console.warn(' Error de credenciales:', data.message);
                        alert('Error: ' + data.message);
                    }
                } catch (error) {
                    console.error('Error de red:', error);
                    alert('No se pudo conectar con el servidor.');
                }
            });
        } else {
            console.error('No se encontró el formulario en login.html');
        }
    }

    // --- LÓGICA DE PROTECCIÓN DEL DASHBOARD ---
    if (window.location.href.includes('dashboard.html') || window.location.href.includes('workspace.html')) {
        const token = localStorage.getItem('token');
        
        // Si no hay token guardado, lo mandamos al login
        if (!token) {
            console.warn('Acceso denegado. Redirigiendo al login...');
            window.location.href = 'login.html';
        } else {
            console.log('Usuario autenticado. Bienvenido a la zona privada.');
            // (En el futuro, aquí usaremos el token para pedirle al backend la lista de videos de este usuario)
        }
    }

    // --- LÓGICA PARA CERRAR SESIÓN ---
    const logoutBtn = document.getElementById('btnLogout');

    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // 1. Destruimos el gafete VIP de la memoria
            localStorage.removeItem('token');
            console.log('👋 Sesión cerrada exitosamente');
            // 2. Lo mandamos de regreso a la pantalla de login
            window.location.href = 'login.html';
        });
    }

    // --- LÓGICA DE SUBIDA DE VIDEO (Dashboard) ---
    const dashUploadZone = document.getElementById('dashUploadZone');
    const videoInput = document.getElementById('videoInput');

    if (dashUploadZone && videoInput) {
        
        // 1. Si hacen clic en la zona, abrimos el explorador de archivos
        dashUploadZone.addEventListener('click', () => {
            videoInput.click();
        });

        // 2. Efecto visual al arrastrar un archivo por encima
        dashUploadZone.addEventListener('dragover', (e) => {
            e.preventDefault(); // Necesario para permitir el "drop"
            dashUploadZone.classList.add('is-dragging');
        });

        dashUploadZone.addEventListener('dragleave', () => {
            dashUploadZone.classList.remove('is-dragging');
        });

        // 3. Atrapamos el archivo cuando lo sueltan
        dashUploadZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dashUploadZone.classList.remove('is-dragging');
            
            if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                handleVideoFile(e.dataTransfer.files[0]);
            }
        });

        // 4. Atrapamos el archivo si lo seleccionan desde la ventana de clic
        videoInput.addEventListener('change', (e) => {
            if (e.target.files && e.target.files.length > 0) {
                handleVideoFile(e.target.files[0]);
            }
        });


        // Función principal para procesar el archivo atrapado
        async function handleVideoFile(file) {
            if (!file.type.startsWith('video/')) {
                alert('Por favor, selecciona un archivo de video válido (MP4, MOV, WEBM).');
                return;
            }

            const maxSize = 100 * 1024 * 1024; 
            if (file.size > maxSize) {
                alert('El archivo es demasiado grande para esta prueba. Límite: 100MB.');
                return;
            }

            // Cambiamos el texto para que el usuario sepa que está cargando
            const originalText = dashUploadZone.innerHTML;
            dashUploadZone.innerHTML = `<div class="has-text-centered"><span class="loader is-size-2 mb-3" style="border-width: 4px; color: #485fc7;"></span><p class="has-text-white mt-3">Subiendo video al servidor...</p></div>`;

            // Empaquetamos el archivo
            const formData = new FormData();
            formData.append('video', file);

            try {
                // Recuperamos el token para demostrar que el usuario tiene permiso
                const token = localStorage.getItem('token');

                const response = await fetch('http://localhost:5000/api/upload', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}` // Mandamos el gafete VIP
                        // Nota: NO se pone 'Content-Type': 'multipart/form-data', fetch lo hace solo
                    },
                    body: formData
                });

                const data = await response.json();

                if (response.ok) {
                    alert('¡Subida exitosa! El archivo ya está en tu backend.');
                    console.log('Respuesta del servidor:', data);
                    // Aquí luego pondremos el código para redirigir al workspace
                } else {
                    alert('Error al subir: ' + data.message);
                }
            } catch (error) {
                console.error('Error de red:', error);
                alert('Fallo la conexión con el servidor.');
            } finally {
                // Restauramos la interfaz original
                dashUploadZone.innerHTML = originalText;
            }
        }
    }

    // --- LÓGICA PARA CARGAR VIDEOS EN EL DASHBOARD ---
    const videosGrid = document.getElementById('videosGrid');

    if (videosGrid && window.location.href.includes('dashboard.html')) {
        
        async function loadUserVideos() {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('http://localhost:5000/api/videos', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (response.ok) {
                    const videos = await response.json();
                    renderVideos(videos);
                } else {
                    console.error('Error al obtener videos');
                }
            } catch (error) {
                console.error('Error de red:', error);
            }
        }

        function renderVideos(videos) {
            videosGrid.innerHTML = ''; // Limpiamos el grid

            if (videos.length === 0) {
                videosGrid.innerHTML = '<p class="has-text-grey ml-3">Aún no has subido ningún video.</p>';
                return;
            }

            videos.forEach(video => {
                // Formateamos la fecha (ej. "15 Oct 2026")
                const date = new Date(video.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short' });

                // Construimos la tarjeta HTML inyectando los datos de la base de datos
                const cardHTML = `
                <div class="column is-6">
                    <div class="dash-video-card ready-card" onclick="window.location.href='workspace.html?video=${video._id}'">
                        <div class="video-thumbnail" style="background-color: #2a2a2a;">
                            <!-- Botón de eliminar (Preparamos el ID para el futuro) -->
                            <button class="delete-btn" title="Delete video" data-id="${video._id}" onclick="event.stopPropagation(); deleteVideo('${video._id}');"> 
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                            </button>
                        </div>
                        <div class="p-3 has-background-dark-card">
                            <div class="is-flex is-justify-content-space-between is-align-items-center mb-1">
                                <span class="is-size-7 has-text-grey">${date}</span>
                                <span class="is-size-7 has-text-success">Ready</span>
                            </div>
                            <p class="has-text-weight-bold has-text-white is-size-6 is-truncated">${video.originalName}</p>
                            <a href="workspace.html?video=${video._id}" class="is-size-7 has-text-link mt-2 is-block">Open in Workspace →</a>
                        </div>
                    </div>
                </div>
                `;
                videosGrid.insertAdjacentHTML('beforeend', cardHTML);
            });
        }

        // Ejecutamos la carga al iniciar la página
        loadUserVideos();
        // Función para eliminar el video desde la interfaz
        window.deleteVideo = async function(videoId) {
            // Confirmación de seguridad
            if (!confirm('¿Estás seguro de que quieres eliminar este video? El archivo se borrará para siempre.')) {
                return;
            }

            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`http://localhost:5000/api/videos/${videoId}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (response.ok) {
                    console.log('Video eliminado con éxito');
                    loadUserVideos(); 
                } else {
                    const data = await response.json();
                    alert('Error: ' + data.message);
                }
            } catch (error) {
                console.error('Error al conectar con el servidor:', error);
            }
        };
    
    }