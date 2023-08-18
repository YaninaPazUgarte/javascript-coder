let productos

function cargarProductos() {
    fetch("https://64dfca7f71c3335b25830f7e.mockapi.io/Productos")
    .then((res) => res.json())
    .then((data) => {
        productos = data
        mostrarLista(productos)
    })
}

cargarProductos()

var productCards = document.getElementById("product-cards");

// Mostramos todos los productos

let carrito = []

if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"))
}else{
    localStorage.setItem("carrito", JSON.stringify(carrito))
}

let inputBusqueda = document.getElementById("busqueda")
let botonDeBusqueda = document.getElementById("botonDeBusqueda")
let modalBody = document.getElementById("modal-body")
let btnGuardarPicada = document.getElementById("guardarPicadaBtn")
let coincidencia = document.getElementById("coincidencia")
let inicio = document.getElementById("inicio")
let verCarrito = document.getElementById("verCarrito")
let modalCarrito = document.getElementById("modalCarrito")
let botonCerrarCarrito = document.getElementById("cerrarCarrito")
let botonVaciarCarrito = document.getElementById("vaciarCarrito")
let botonFinalizarCompra = document.getElementById("finalizarCompra")
// El carrito comienza oculto
modalCarrito.hidden = true
let buscado

// Escondemos el carrito y mostramos todos los productos
botonCerrarCarrito.addEventListener("click", () => {
    modalCarrito.hidden = true
    mostrarLista(productos)
})

// Mostramos carrito y ocultamos los productos
verCarrito.addEventListener("click", () => {
    cargarProductosCarrito()
    modalCarrito.hidden = false
    mostrarLista([])
})

// Vaciamos carrito, borramos el storage, mostramos mensaje de carrito vacio
botonVaciarCarrito.addEventListener("click", () => {
    carrito = []
    localStorage.setItem("carrito", JSON.stringify([]))
    modalBody.innerHTML = `<p> No tenés productos en el carrito </p>`
})

// Por ahora cerramos el carrito y mostramos todos los productos
botonFinalizarCompra.addEventListener("click", () => {
    modalCarrito.hidden = true
    mostrarLista(productos)
})

// Mostramos todo y cerramos carrito al apretar inicio
inicio.addEventListener("click", () => {
    productCards.innerHTML = ""
    modalCarrito.hidden = true
    mostrarLista(productos)
})

inputBusqueda.addEventListener("input", () => {
    console.log (busqueda.value)
    buscado = busqueda.value
})

botonDeBusqueda.addEventListener("click", () => {
    buscarInfo(buscado)
})

function buscarInfo(buscado) {
    //Filtro en el arreglo de productos los que incluyen lo buscado en su nombre
    let busqueda = productos.filter(
        (picada) => picada.nombre.toLowerCase().includes(buscado.toLowerCase()) 
    )

    if (busqueda.length == 0) {
        coincidencia.innerHTML = "";
        let nuevoDiv = document.createElement("div");
        nuevoDiv.innerHTML = `<p> No hay coincidencias</p>`;
        coincidencia.appendChild(nuevoDiv);
        mostrarLista(productos);
    } else {
        coincidencia.innerHTML = "";
        mostrarLista(busqueda);
    }
}

function mostrarLista(array) {
    productCards.innerHTML = "";

    for (const picada of array) {
        let nuevaPicada = document.createElement("div");
        nuevaPicada.classList.add("col-12", "col-md-6", "col-lg-4", "my-4");
        nuevaPicada.innerHTML = `
        <div id="${picada.id}" class="card" style="width: 18rem;">
            <img class="card-img-top img-fluid" style="height: 200px;" src="${picada.imagen}" alt="${picada.nombreProducto}">
            <div class="card-body">
                <h4 class="card-title">${picada.nombre}</h4>
                <p class="">Precio: ${picada.precio}</p>
                <button id="agregarBtn${picada.id}" class="btn btn-outline-success">Agregar al carrito</button>
            </div>
        </div>`;
        
        productCards.appendChild(nuevaPicada);
        let btnAgregar = document.getElementById(`agregarBtn${picada.id}`);

        btnAgregar.addEventListener("click", () => {
            agregarAlCarrito(picada);
        });
    }
}

function agregarAlCarrito(picada) {
    carrito.push(picada);
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function cargarProductosCarrito() {
    modalBody.innerHTML = "";

    if (carrito.length == 0) {
        modalBody.innerHTML = `<p> No tenés productos en el carrito </p>`
    }

    carrito.forEach(productoCarrito => {
        console.log("Producto en el carro")
        modalBody.innerHTML += `
        <div class="card border-primary mb-3" id="productoCarrito${productoCarrito.id}" style="max-width: 540px;">
            <img class="card-img-top" height="300px" src="${productoCarrito.imagen}" alt="${productoCarrito.nombreProducto}">
            <div class="card-body">
                <h4 class="card-title">${productoCarrito.nombre}</h4>
                <p class="card-text">$${productoCarrito.precio}</p> 
                <button class="btn btn-danger" id="botonEliminar${productoCarrito.id}">
                    Eliminar del carrito
                </button>
            </div>    
        </div>`;
    });

    carrito.forEach((productoCarrito, indice) => {
        document.getElementById(`botonEliminar${productoCarrito.id}`).addEventListener("click", () => {
            let cardProducto = document.getElementById(`productoCarrito${productoCarrito.id}`);
            cardProducto.remove();
            carrito.splice(indice, 1);
            localStorage.setItem("carrito", JSON.stringify(carrito));
        });
    });
}

