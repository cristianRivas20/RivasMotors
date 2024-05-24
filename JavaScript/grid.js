import KEYS from "../BBDD/Keys.js"


// Obtener la lista de vehículos

const vehicleList = document.querySelectorAll('.grid-container .producto-busqueda');

// Obtener el input de búsqueda
const searchInput = document.getElementById('searchInput');

// Función para filtrar los vehículos
// Función para filtrar los vehículos
function filterVehicles() {
  const searchTerm = searchInput.value.toLowerCase();

  vehicleList.forEach(vehicle => {
    const title = vehicle.querySelector('h3').textContent.toLowerCase();

    if (title.includes(searchTerm)) {
      vehicle.style.display = 'block'; // Mostrar el elemento si coincide
    } else {
      vehicle.style.display = 'none'; // Ocultar el elemento si no coincide
    }
  });
}


// Escuchar el evento de entrada en el input de búsqueda
searchInput.addEventListener('input', filterVehicles);

// Mostrar todos los vehículos al cargar la página
filterVehicles();


document.addEventListener("DOMContentLoaded", function() {
  let carrito = [];

  function agregarAlCarrito(event) {
      const button = event.target;
      const producto = button.closest('.bg-white');
      const nombre = producto.querySelector('h3').textContent;
      const precio = producto.querySelector('p').textContent;

      carrito.push({
          id: carrito.length,
          nombre: nombre,
          precio: precio
      });

      actualizarCarritoCantidad();
      actualizarCarritoLista();
  }

  function actualizarCarritoCantidad() {
      const carritoCantidad = document.getElementById('carrito-cantidad');
      carritoCantidad.textContent = carrito.length;
  }

  function actualizarCarritoLista() {
      const carritoLista = document.getElementById('carrito-lista');
      carritoLista.innerHTML = '';

      carrito.forEach(item => {
          const li = document.createElement('li');
          li.textContent = `${item.nombre} - ${item.precio}`;
          const removeButton = document.createElement('button');
          removeButton.textContent = 'Eliminar';
          removeButton.onclick = () => eliminarDelCarrito(item.id);
          li.appendChild(removeButton);
          carritoLista.appendChild(li);
      });
  }

  function eliminarDelCarrito(id) {
      carrito = carrito.filter(item => item.id !== id);
      actualizarCarritoCantidad();
      actualizarCarritoLista();
  }

  function mostrarCarrito() {
      const carritoModal = document.getElementById('carrito-modal');
      carritoModal.style.display = 'block';
  }

  function cerrarCarrito() {
      const carritoModal = document.getElementById('carrito-modal');
      carritoModal.style.display = 'none';
  }

  document.querySelectorAll('.bg-white button').forEach(button => {
      button.addEventListener('click', agregarAlCarrito);
  });

  document.getElementById('carrito-icon').addEventListener('click', mostrarCarrito);
  document.getElementById('cerrar-carrito').addEventListener('click', cerrarCarrito);
});

// Obtener el contenedor de resultados de búsqueda
const contenedorResultados = document.getElementById('resultados-busqueda');




const $d = document;
const $arepas = $d.getElementById("arepas");
const $white = $d.getElementById("white").content; // Asegúrate de que "white" es un <template> y existe en el DOM
const $fragment = $d.createDocumentFragment();
const options = { headers: { Authorization: `Bearer ${KEYS.secret}` } }

const formatoDeMoneda = num => `€${num.slice(0, -2)}.${num.slice(-2)}`;

let products, prices;

Promise.all([
    fetch("https://api.stripe.com/v1/products", options),
    fetch("https://api.stripe.com/v1/prices", options)
])
    .then(responses => Promise.all(responses.map(res => res.json())))
    .then(json => {
        products = json[0].data;
        prices = json[1].data;
        prices.forEach(el => {
            let productData = products.filter(product => product.id === el.product);
            
            // Asegúrate de que el template existe y se está usando correctamente
            const $template = $white.querySelector("template");
            $template.querySelector(".white").setAttribute("data-price", el.id);
            $template.querySelector("img").src = productData[0].images[0]; // Cambié 'imagenes' por 'images'
            $template.querySelector("img").alt = productData[0].name;
            $template.querySelector("figcaption").innerHTML = `${productData[0].name} ${formatoDeMoneda(el.unit_amount_decimal)} ${(el.currency).toUpperCase()}`;

            let $clone = $d.importNode($template.content, true); // Cambié '$id' por '$d'
            $fragment.appendChild($clone);
        });
        $arepas.appendChild($fragment);
    })
    .catch(error => {
        let message = error.statusText || "Ocurrido un error en la petición";
        $arepas.innerHTML = `Error ${error.status}: ${message}`;
    });

$d.addEventListener("click", e => {
    if (e.target.matches(".white *")) {
        let priceId = e.target.parentElement.getAttribute("data-price"); // Cambié 'getAtribute' por 'getAttribute'
        stripe(KEYS.public).redirectToCheckout({
            lineItems: [{
                price: priceId,
                quantity: 1
            }],
            mode: "subscription",
            successUrl: "http://127.0.0.1:5501/Components/success.html",
            cancelUrl: "http://127.0.0.1:5501/Components/cancel.html"
        })
        .then(res => {
            if (res.error) {
                $arepas.innerHTML += `<p>${res.error.message}</p>`; // Asegúrate de manejar el error correctamente
            }
        });
    }
});