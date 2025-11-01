document.addEventListener('DOMContentLoaded', () => {

    const productosHombres = [
        { id: 101, nombre: 'Buzo Liso Oversize', precio: 58000, talles: ['M', 'L', 'XL'], categoria: 'buzo', imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnYXWo8xyWQHoyVsrC6ZTXeWnsTh7z7MF2mg&s' },
        { id: 102, nombre: 'Buzo Canguro', precio: 65500, talles: ['S', 'M', 'L'], categoria: 'buzo', imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSm_27_ltFkKtfIi7v9O2RAFcXb-KyMPrYCQ&s' },
        { id: 103, nombre: 'Camisa', precio: 45000, talles: ['S', 'M', 'L', 'XL'], categoria: 'camisa', imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-LoPqrf1yXI1U9Qk2axJsbG9vzGKrhlModeUBBJW1DyIN7eDDxtT0_HKPcoO51uO3-aI&usqp=CAU' },
        { id: 104, nombre: 'Jogger Urbano', precio: 38000, talles: ['L', 'XL'], categoria: 'pantalon', imagen: 'https://saborstore.com/cdn/shop/files/Jogger-negro-1200x1200-1.jpg?v=1719342427' },
        { id: 105, nombre: 'Zapatillas Retro', precio: 85000, talles: ['40', '41', '42'], categoria: 'zapatillas', imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvBbKZm1QKAgTI2hAyM-GPKg-vKXLyFMwfaQ&s' },
    ];


    // Elementos de Navegación
    const megasearchDropdown = document.getElementById('megasearchDropdown');
    const catalogBar = document.getElementById('catalogBar');

    // Elementos del Catálogo
    const productosGrid = document.getElementById('productos-hombres');
    const ordenPrecioSelect = document.getElementById('orden-precio');
    const filtroTalleSelect = document.getElementById('filtro-talle');

    // Elementos del Carrito (Panel Lateral)
    const cartPanel = document.getElementById('shoppingCartPanel');
    const cartOverlay = document.getElementById('cartOverlay');
    const cartMenuButton = document.getElementById('cartMenuButton');
    const closeCartButton = document.getElementById('closeCartButton');
    const cartCountSpan = document.getElementById('cartCount');
    const cartItemsDiv = document.getElementById('cartItems');
    const cartTotalSpan = document.getElementById('cartTotal');

    // Almacén de productos del carrito
    let cart = [];

    const formatPrice = (price) => {
        return `$${price.toLocaleString('es-AR')} ARS`;
    };


    window.addEventListener('scroll', function () {
        if (catalogBar) {
            const scrollThreshold = 200;
            if (window.scrollY > scrollThreshold) {
                catalogBar.classList.add('show-bar');
            } else {
                catalogBar.classList.remove('show-bar');
                if (megasearchDropdown) {
                    megasearchDropdown.classList.remove('show-dropdown');
                }
            }
        }
    });


    // 4. LÓGICA DEL CARRITO

    function toggleCartPanel(open) {
        if (open === true) {
            cartPanel.classList.add('is-open');
            cartOverlay.classList.add('is-open');
        } else {
            cartPanel.classList.remove('is-open');
            cartOverlay.classList.remove('is-open');
        }
    }

    function addToCart(producto) {
        cart.push(producto);
        updateCartDisplay();
        toggleCartPanel(true);
    }

    function updateCartDisplay() {
        cartCountSpan.textContent = cart.length;

        if (cart.length === 0) {
            cartItemsDiv.innerHTML = '<p>Tu carrito está vacío.</p>';
            cartTotalSpan.textContent = formatPrice(0);
            return;
        }

        let total = 0;
        let itemsHTML = '';

        // 1. Crear el HTML de los items
        cart.forEach((item, index) => {
            total += item.precio;
            itemsHTML += `
            <div class="cart-item-detail" style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #eee; padding: 10px 0;">
                <div>
                    <p style="margin: 0; font-weight: 500;">${item.nombre}</p>
                    <p style="margin: 0; font-size: 0.85em; color: #666;">Talle: ${item.talle}</p>
                </div>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <p style="font-weight: bold; margin: 0; color: #ff5722;">${formatPrice(item.precio)}</p>
                    <button class="remove-from-cart-btn" data-index="${index}" style="background: none; border: none; color: red; font-size: 1.2em; cursor: pointer; line-height: 1; padding: 5px;">
                        &times;
                    </button>
                </div>
            </div>
        `;
        });

        cartItemsDiv.innerHTML = itemsHTML;
        cartTotalSpan.textContent = formatPrice(total);

        document.querySelectorAll('.remove-from-cart-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const clickedButton = event.target.closest('.remove-from-cart-btn');

                if (clickedButton) {
                    const indexToRemove = parseInt(clickedButton.dataset.index);
                    removeFromCart(indexToRemove);
                }
            });
        });
    }

    // Event Listeners para abrir/cerrar el carrito
    if (cartMenuButton) cartMenuButton.addEventListener('click', () => toggleCartPanel(true));
    if (closeCartButton) closeCartButton.addEventListener('click', () => toggleCartPanel(false));
    if (cartOverlay) cartOverlay.addEventListener('click', () => toggleCartPanel(false));


    // 5. LÓGICA DE PRODUCTOS, RENDERIZADO Y BOTÓN COMPRAR

    // Función para manejar el clic en los botones "Comprar":
    function agregarEventListenersComprar() {
        document.querySelectorAll('.btn-comprar').forEach(button => {
            button.addEventListener('click', (event) => {
                const productoId = parseInt(event.target.dataset.id);
                const producto = productosHombres.find(p => p.id === productoId);

                if (producto) {
                    addToCart(producto);
                } else {
                    console.error('Error: Producto no encontrado con ID:', productoId);
                }
            });
        });
    }

    function renderizarProductos(productos) {
        const productosGrid = document.getElementById('productos-hombres');
        if (!productosGrid) return;

        productosGrid.innerHTML = '';

        productos.forEach(producto => {
            const card = document.createElement('div');
            card.className = 'producto-card';

            let talleOptionsHTML = producto.talles.map(talle =>
                `<option value="${talle}">${talle}</option>`
            ).join('');

            card.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <div class="card-details">
                <h3>${producto.nombre}</h3>
                <p class="precio">${formatPrice(producto.precio)}</p>
                <div class="talle-selector">
                    <label for="talle-select-${producto.id}">Talle:</label>
                    <select id="talle-select-${producto.id}" class="select-talle-producto">
                        ${talleOptionsHTML}
                    </select>
                </div>
            </div>
            <button class="btn-comprar" data-id="${producto.id}">Comprar</button> 
        `;
            productosGrid.appendChild(card);
        });

        agregarEventListenersComprar();
    }


    // Función de Filtrado y Ordenamiento
    function aplicarFiltrosYOrden() {
        let productosFiltrados = [...productosHombres];
        const orden = ordenPrecioSelect.value;
        const talleSeleccionado = filtroTalleSelect.value;

        // FILTRAR POR TALLE
        if (talleSeleccionado !== 'all') {
            productosFiltrados = productosFiltrados.filter(producto =>
                producto.talles.includes(talleSeleccionado)
            );
        }

        // ORDENAR POR PRECIO
        if (orden === 'mayor') {
            productosFiltrados.sort((a, b) => b.precio - a.precio);
        } else if (orden === 'menor') {
            productosFiltrados.sort((a, b) => a.precio - b.precio);
        }

        renderizarProductos(productosFiltrados);
    }

    // 6. INICIALIZACIÓN

    if (productosGrid && ordenPrecioSelect && filtroTalleSelect) {
        ordenPrecioSelect.addEventListener('change', aplicarFiltrosYOrden);
        filtroTalleSelect.addEventListener('change', aplicarFiltrosYOrden);
        aplicarFiltrosYOrden(); 
    }

});


// Función para eliminar un producto del carrito por su índice
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartDisplay();
    if (cart.length === 0) {
        toggleCartPanel(false);
    }
}
