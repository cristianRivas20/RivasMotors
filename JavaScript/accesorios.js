document.addEventListener('DOMContentLoaded', function() {
    const btnCart = document.querySelector('.container-cart-icon');
    const containerCardProducts = document.querySelector('.container-cart-products');
    const rowProduct = document.querySelector('.row-product');
    const productsList = document.querySelector('.container-items');
    const valorTotal = document.querySelector('.total-pagar');
    const countProducts = document.querySelector('#contador-productos');
    const cartTotal = document.querySelector('.total-pagar'); // Selección del elemento .total-pagar directamente
    let nextProductId = 1; // Identificador único para los productos
    let allProducts = [];

    // Event listener para el botón del carrito
    btnCart.addEventListener('click', () => {
        containerCardProducts.classList.toggle('hidden-cart');
    });

    // Event listener para el botón "Añadir al carrito"
    productsList.addEventListener('click', e => {
        if (e.target.classList.contains('btn-add-cart')) {
            const product = e.target.closest('.item');
            const productId = product.dataset.productId;

            // Verificar si el producto ya está en el carrito
            const existingProductIndex = allProducts.findIndex(p => p.id === productId);
            if (existingProductIndex !== -1) {
                allProducts[existingProductIndex].quantity++;
            } else {
                const infoProduct = {
                    id: productId,
                    quantity: 1,
                    title: product.querySelector('h2').textContent,
                    price: product.querySelector('.price').textContent,
                };
                allProducts.push(infoProduct);
            }
            showHTML();
        }
    });

    // Event listener para el botón de cierre del producto en el carrito
    containerCardProducts.addEventListener('click', e => {
        if (e.target.classList.contains('icon-close')) {
            const productId = e.target.closest('.cart-product').dataset.productId;
            allProducts = allProducts.filter(item => item.id !== productId);
            console.log('Productos en el carrito después de eliminar:', allProducts);
            showHTML();
        }
    });

    function showHTML() {
        containerCardProducts.innerHTML = ''; // Limpiar el contenedor antes de agregar productos nuevamente
        rowProduct.innerHTML = '';
        let total = 0;
        let totalOfProducts = 0;

        if (allProducts.length === 0) {
            containerCardProducts.innerHTML = `<p class="cart-empty">El carrito está vacío</p>`;
        } else {
            allProducts.forEach(product => {
                const containerProduct = document.createElement('div');
                containerProduct.classList.add('cart-product');
                containerProduct.dataset.productId = product.id; // Agregar el identificador único
                containerProduct.innerHTML = `
                    <div class="info-cart-product">
                        <span class="cantidad-producto-carrito">${product.quantity}</span>
                        <p class="titulo-producto-carrito">${product.title}</p>
                        <span class="precio-producto-carrito">${product.price}</span>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 icon-close">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>`;
                containerCardProducts.appendChild(containerProduct);
                total += parseInt(product.quantity) * parseInt(product.price.slice(1));
                totalOfProducts += product.quantity;
            });
        }

        valorTotal.innerText = `$${total}`;
        countProducts.innerText = totalOfProducts;
        cartTotal.innerText = `$${total}`; // Mostrar el total en el carrito
    }

    // Asignar identificadores únicos a los productos
    productsList.querySelectorAll('.item').forEach(product => {
        product.dataset.productId = nextProductId++;
    });

    // Mostrar los productos inicialmente
    showHTML();
});
// Añadir un producto al

function buscarProducto() {
    // Obtener el texto de búsqueda
    var textoBusqueda = document.getElementById("searchInput").value.toLowerCase();
    // Obtener todos los elementos de productos
    var productos = document.querySelectorAll(".item");
    
    // Iterar sobre los elementos de productos
    productos.forEach(function(producto) {
        // Obtener el nombre del producto y convertirlo a minúsculas
        var nombreProducto = producto.querySelector("h2").textContent.toLowerCase();
        
        // Mostrar u ocultar el producto según si coincide con el texto de búsqueda
        if (nombreProducto.includes(textoBusqueda)) {
            producto.style.display = "block";
        } else {
            producto.style.display = "none";
        }
    });
}

// Asignar un evento de escucha al campo de búsqueda
document.getElementById("searchInput").addEventListener("input", buscarProducto);