// Funcionalidad de la barra fija al hacer scroll
window.addEventListener('scroll', function () {
    const catalogBar = document.getElementById('catalogBar');
    const megasearchDropdown = document.getElementById('megasearchDropdown');
    const scrollThreshold = 200;

    if (window.scrollY > scrollThreshold) {
        catalogBar.classList.add('show-bar');
    } else {
        catalogBar.classList.remove('show-bar');
        if (megasearchDropdown) {
            megasearchDropdown.classList.remove('show-dropdown');
        }
    }
});

// Comentario: Funcionalidad del carrusel de imágenes
const images = document.querySelectorAll('.carousel-image');
const prevArrow = document.querySelector('.prev-arrow');
const nextArrow = document.querySelector('.next-arrow');
let currentIndex = 0;
let isAnimating = false;
let autoSlideInterval;

function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        nextImage();
    }, 5000); 
}

function stopAutoSlide() {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
    }
}

function showImage(index) {
    if (isAnimating) return;
    isAnimating = true;

    if (index >= images.length) {
        index = 0;
    } else if (index < 0) {
        index = images.length - 1;
    }

    images.forEach(img => {
        img.classList.remove('active');
    });

    images[index].classList.add('active');
    currentIndex = index;

    setTimeout(() => {
        isAnimating = false;
        stopAutoSlide();
        startAutoSlide();
    }, 500); 
}

function nextImage() {
    showImage(currentIndex + 1);
}

function prevImage() {
    showImage(currentIndex - 1);
}

// Event Listeners para Carrusel
if (images.length > 0) {
    prevArrow.addEventListener('click', prevImage);
    nextArrow.addEventListener('click', nextImage);
    showImage(currentIndex);
}


// Comentario: Funcionalidad del Megabuscador
const megasearchDropdown = document.getElementById('megasearchDropdown');
const toggleMegasearch = document.getElementById('toggleMegasearch');
const catalogBar = document.getElementById('catalogBar');

if (toggleMegasearch && megasearchDropdown) {
    toggleMegasearch.addEventListener('click', function () {
        megasearchDropdown.classList.toggle('show-dropdown');

        if (catalogBar) {
            if (megasearchDropdown.classList.contains('show-dropdown')) {
                catalogBar.classList.add('show-bar-megasearch-open');
            } else {
                catalogBar.classList.remove('show-bar-megasearch-open');
                if (window.scrollY <= 200) {
                    catalogBar.classList.remove('show-bar');
                }
            }
        }
    });

    window.addEventListener('click', function (event) {
        if (!megasearchDropdown.contains(event.target) && event.target !== toggleMegasearch && megasearchDropdown.classList.contains('show-dropdown')) {
            if (!catalogBar || !catalogBar.contains(event.target)) {
                megasearchDropdown.classList.remove('show-dropdown');
            }
        }
    });

    window.addEventListener('scroll', function () {
        if (window.scrollY <= 200) {
            megasearchDropdown.classList.remove('show-dropdown');
            catalogBar.classList.remove('show-bar-megasearch-open');
        }
    });
}



// Funcionalidad de Modales Login, Register, Contacto, Ayuda, etc.

// Función genérica para abrir un modal
function openModal(modal) {
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; 
    }
}

function closeModal(modal) {
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = ''; 
    }
}

// Función para manejar la lógica de cambio de modal (Login <-> Register)
function setupModalSwitching(fromModal, toModal, switchLinks, closeBtnClass, cancelBtnClass) {
    switchLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            closeModal(fromModal);
            openModal(toModal);
        });
    });

    const closeButtons = fromModal.querySelectorAll(`.${closeBtnClass}, .${cancelBtnClass}`);
    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => closeModal(fromModal));
    });

    window.addEventListener('click', (event) => {
        if (event.target === fromModal) {
            closeModal(fromModal);
        }
    });
}

const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');
const contactoModal = document.getElementById('contactoModal');
const faqModal = document.getElementById('faqModal');
const comprasModal = document.getElementById('comprasModal');
const acercaModal = document.getElementById('acercaModal');
const politicasModal = document.getElementById('politicasModal');
const terminosModal = document.getElementById('terminosModal');
const descuentosModal = document.getElementById('descuentosModal');
const enviosModal = document.getElementById('enviosModal');
const pagosModal = document.getElementById('pagosModal');



document.addEventListener('DOMContentLoaded', () => {

    const goToRegisterLinks = document.querySelectorAll('#switchToRegisterFromLogin');
    const goToLoginLinks = document.querySelectorAll('#switchToLoginFromRegister');

    if (loginModal && registerModal) {
        setupModalSwitching(loginModal, registerModal, goToRegisterLinks, 'login-close', 'login-cancel');
        setupModalSwitching(registerModal, loginModal, goToLoginLinks, 'register-close', 'register-cancel');
    }

    function setupSimpleModal(modalId, openButtonId, closeBtnClass, cancelBtnClass) {
        const modal = document.getElementById(modalId);
        const openButtons = document.querySelectorAll(`#${openButtonId}`);
        const closeButtons = document.querySelectorAll(`.${closeBtnClass}, .${cancelBtnClass}`);

        if (modal) {
            openButtons.forEach(btn => {
                btn.addEventListener('click', () => openModal(modal));
            });
            closeButtons.forEach(btn => {
                btn.addEventListener('click', () => closeModal(modal));
            });
            window.addEventListener('click', (event) => {
                if (event.target === modal) {
                    closeModal(modal);
                }
            });
        }
    }

    // Botones que solo abren un modal (ej. Ingresar, Crear Cuenta)
    setupSimpleModal('loginModal', 'openLoginModal', 'login-close', 'login-cancel');
    setupSimpleModal('registerModal', 'openRegisterModal', 'register-close', 'register-cancel');

    // Modales de información general
    setupSimpleModal('contactoModal', 'openContactoModal', 'contact-close', 'contact-cancel');
    setupSimpleModal('faqModal', 'openFaqModal', 'faq-close', 'faq-cancel');
    setupSimpleModal('comprasModal', 'openComprasModal', 'compras-close', 'compras-cancel');
    setupSimpleModal('acercaModal', 'openAcercaModal', 'acerca-close', 'acerca-cancel');
    setupSimpleModal('politicasModal', 'openPoliticasModal', 'politicas-close', 'politicas-cancel');
    setupSimpleModal('terminosModal', 'openTerminosModal', 'terminos-close', 'terminos-cancel');

    // Modales de servicios en el footer (duplicados de botones principales)
    setupSimpleModal('contactoModal', 'openContactoModalFooter', 'contact-close', 'contact-cancel');
    setupSimpleModal('contactoModal', 'openContactoModalFooter2', 'contact-close', 'contact-cancel');
    setupSimpleModal('faqModal', 'openFaqModalFooter', 'faq-close', 'faq-cancel');
    setupSimpleModal('politicasModal', 'openPoliticasModal', 'politicas-close', 'politicas-cancel');
    setupSimpleModal('terminosModal', 'openTerminosModal', 'terminos-close', 'terminos-cancel');
    setupSimpleModal('comprasModal', 'openComprasModalFooter', 'compras-close', 'compras-cancel');
    setupSimpleModal('loginModal', 'footerOpenLogin', 'login-close', 'login-cancel');
    setupSimpleModal('registerModal', 'footerOpenRegister', 'register-close', 'register-cancel');
    setupSimpleModal('acercaModal', 'openAcercaModal', 'acerca-close', 'acerca-cancel');

    // --- NUEVA FUNCIONALIDAD PARA DESCUENTOS, ENVÍOS Y PAGOS (EJERCICIO5) ---
    setupSimpleModal('descuentosModal', 'openDescuentosModal', 'descuentos-close', 'descuentos-cancel');
    setupSimpleModal('enviosModal', 'openEnviosModal', 'envios-close', 'envios-cancel');
    setupSimpleModal('pagosModal', 'openPagosModal', 'pagos-close', 'pagos-cancel');
    // ----------------------------------------------------------------------


});

// --- Funcionalidad de Registro (Manejo de Errores) ---

const registerForm = document.getElementById('registerForm');
const registerMessage = document.getElementById('registerMessage');

/**
 * Muestra el mensaje de feedback (éxito o error) en el ventana modal.
 * @param {string} message 
 * @param {string} type 
 */
function handleRegistrationFeedback(message, type) {
    registerMessage.textContent = message;
    registerMessage.className = 'message ' + type;
    registerMessage.style.display = 'block';

    if (type === 'success') {
        setTimeout(() => {
            registerMessage.style.display = 'none';
            registerForm.reset();
        }, 5000);
    }
}

if (registerForm) {
    registerForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const password = document.getElementById('password_registro').value;
        const confirmPassword = document.getElementById('confirm_password_registro').value;

        // Validar contraseñas
        if (password !== confirmPassword) {
            handleRegistrationFeedback('Error: Las contraseñas no coinciden.', 'error');
            return;
        }

        if (password.length < 6) {
            handleRegistrationFeedback('Error: La contraseña debe tener al menos 6 caracteres.', 'error');
            return;
        }

        registerMessage.style.display = 'none';

        const formData = new FormData(registerForm);

        fetch('http://127.0.0.1:5000/registrar', {
            method: 'POST',
            body: formData,
        })
            .then(response => {
                return response.json().catch(() => {
                    return response.text().then(text => {
                        throw new Error(`Respuesta no válida del servidor. Contenido: ${text.substring(0, 50)}...`);
                    });
                })
                    // Devolvemos el objeto con el estado y los datos/error.
                    .then(data => ({
                        status: response.status,
                        ok: response.ok,
                        data: data
                    }));
            })
            .then(({ status, ok, data }) => {
                if (ok) {
                    // MANEJO DE ÉXITO (Código 200): Usamos el mensaje del servidor (data.message).
                    handleRegistrationFeedback(data.message || '¡Registro exitoso! Ya puedes ingresar.', 'success');

                    // Cierra el modal y abre el de login después de un breve retraso
                    setTimeout(() => {
                        closeModal(registerModal);
                        openModal(loginModal);
                    }, 2000);
                } else if (status === 400 || status === 500) {
                    // MANEJO DE FALLO (Código 400/500): Usamos el mensaje de error del servidor (data.error).
                    handleRegistrationFeedback(data.error || 'Error en el registro. Intenta más tarde.', 'error');
                } else {
                    // Manejo de códigos de estado no esperados (Ej. 404, 503)
                    handleRegistrationFeedback(`Error inesperado (Código ${status}).`, 'error');
                }
            })
            .catch(error => {
                // MANEJO DE FALLO DE RED/PROMESAS
                console.error('Error de red o interno durante el registro:', error);
                handleRegistrationFeedback(error.message, 'error');
            });
    });
}


// Funcionalidad de Login
const loginForm = document.getElementById('loginForm');

if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Simulación de envío de credenciales
        const email = loginForm.elements.email_login.value;
        const password = loginForm.elements.password_login.value;

        console.log(`Intentando ingresar con: ${email} / ${password}`);


        setTimeout(() => {
            alert(`¡Bienvenido, ${email}! Ingreso simulado exitoso.`);
            closeModal(loginModal);
        }, 1000);
    });
}

// Funcionalidad del Carrito de Compras

const shoppingCartPanel = document.getElementById('shoppingCartPanel');
const cartOverlay = document.getElementById('cart-overlay');
const openCartBtns = document.querySelectorAll('#openCartBtn, #openCartBtnMain');
const closeCartBtn = document.getElementById('closeCartBtn');
const cartCountBadges = document.querySelectorAll('.cart-count-badge');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');

// Estado del carrito
let cart = [
    { id: 1, nombre: "Remera Blanca Classic", precio: 8500, talle: "M", cantidad: 1 },
    { id: 2, nombre: "Jean Azul Urbano", precio: 15900, talle: "32", cantidad: 1 }
];

function updateCartDOM() {
    let total = 0;
    cartItemsContainer.innerHTML = ''; 

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Tu carrito está vacío.</p>';
    } else {
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');

            // Calcula el subtotal por artículo
            const subtotal = item.precio * item.cantidad;
            total += subtotal;

            itemElement.innerHTML = `
                <div>
                    <p><strong>${item.nombre}</strong></p>
                    <p>Talle: ${item.talle} - Cantidad: ${item.cantidad} x $${item.precio.toFixed(2)}</p>
                </div>
                <div>
                    <p><strong>$${subtotal.toFixed(2)} ARS</strong></p>
                    <button data-item-id="${item.id}" data-talle="${item.talle}" class="remove-from-cart-btn" 
                            style="background: none; border: none; color: red; cursor: pointer; font-size: 1.2em; transition: all 0.3s;">
                            &times;
                    </button>
                </div>
            `;
            cartItemsContainer.appendChild(itemElement);
        });
    }

    // Actualiza el total y el contador
    cartTotalElement.textContent = `$${total.toFixed(2)} ARS`;
    cartCountBadges.forEach(badge => {
        badge.textContent = cart.length;
    });

    document.querySelectorAll('.remove-from-cart-btn').forEach(button => {
        button.addEventListener('click', removeItemFromCart);
    });
}

function openCart() {
    shoppingCartPanel.classList.add('is-open');
    cartOverlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    updateCartDOM();
}

function closeCart() {
    shoppingCartPanel.classList.remove('is-open');
    cartOverlay.classList.remove('is-open');
    document.body.style.overflow = '';
}

function removeItemFromCart(event) {
    const itemId = parseInt(event.target.dataset.itemId);
    const itemTalle = event.target.dataset.talle;

    const initialLength = cart.length;
    cart = cart.filter(item => !(item.id === itemId && item.talle === itemTalle));

    if (cart.length < initialLength) {
        updateCartDOM();
    }
}

// Event Listeners para el Carrito
if (shoppingCartPanel) {
    openCartBtns.forEach(btn => btn.addEventListener('click', openCart));
    closeCartBtn.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);

    updateCartDOM();
}

document.querySelectorAll('.btn-comprar').forEach(button => {
    button.addEventListener('click', function (e) {
        e.preventDefault();

        const card = this.closest('.producto-card');
        const selectElement = card.querySelector('.select-talle-producto');

        if (!selectElement || selectElement.value === 'none') {
            alert('Por favor, selecciona un talle antes de comprar.');
            return;
        }

        const productoNombre = card.querySelector('h3').textContent.trim();
        const productoPrecioText = card.querySelector('.precio').textContent.replace('$', '').replace(' ARS', '').trim();
        const productoPrecio = parseFloat(productoPrecioText);
        const productoId = parseInt(card.dataset.productId || Math.floor(Math.random() * 1000)); // Usar un ID de dato o generar uno

        const talleSeleccionado = selectElement.value;

        const existingItem = cart.find(item => item.id === productoId && item.talle === talleSeleccionado);

        if (existingItem) {
            existingItem.cantidad += 1; 
        } else {
            cart.push({
                id: productoId,
                nombre: productoNombre,
                precio: productoPrecio,
                talle: talleSeleccionado,
                cantidad: 1
            });
        }

        updateCartDOM();
        openCart();
    });
});
