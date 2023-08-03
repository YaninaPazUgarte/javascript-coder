let productos = [
    {
    id: 0,
    nombreProducto: "Premium",
    precio: 3900,
    estaEnPromo: false
    },

    {
    id: 1,
    nombreProducto: "Tradicional",
    precio: 3100,
    estaEnPromo: true
    },

    {
    id: 2,
    nombreProducto: "Veggie",
    precio: 2500,
    estaEnPromo: false
    }
];

let producto = []

if (localStorage.getItem("producto")) {
    producto = JSON.parse(localStorage.getItem("producto"))
}else{
    producto.push('id:0, id:1, id:2')
    localStorage.setItem("producto", JSON.stringify(producto))
}

let carrito = [];
let porcentajePromo = 20

let productosEnCarrito = []

if (localStorage.getItem("carrito")) {
    console.log('hay carrito');
    productosEnCarrito = JSON.parse(localStorage.getItem("carrito"))
} else {
    console.log('NO hay carrito');
    localStorage.setItem("carrito", JSON.stringify(productosEnCarrito))
}

function buscarProducto(buscado, array) {
    let busqueda = array.filter(
        (producto) => nombreProducto.toLowerCase().includes(buscado.toLowerCase())
            
    )
    
    if (busqueda.length == 0) {
        coincidencia.innerHTML = ""
        let nuevoDiv = document.createElement("div")
        nuevoDiv.innerHTML = `<p> No hay coincidencias</p>`
        coincidencia.appendChild(nuevoDiv)

    } else {
        coincidencia.innerHTML = ""
        mostrarCatalogo(busqueda)
    }
}

/* 2do paso, traer el elemento al js */
let divProductos = document.getElementById("productos")
let btnGuardar = document.getElementById("guardarBtn")
let buscador = document.getElementById("buscador")
let btnVerCatalogo = document.getElementById("verCatalogo")
let btnOcultarCatalogo = document.getElementById("ocultarCatalogo")
let modalBody = document.getElementById("modal-body") 
let botonCarrito = document.getElementById("botonCarrito")
let coincidencia = document.getElementById("coincidencia")
let selectOrden = document.getElementById("selectOrden")


function mostrarCatalogo(array) {
    divProductos.innerHTML = ""
        for (const producto of array) {
            let nuevoProducto = document.createElement("div")
            nuevoProducto.innerHTML = 
            `<div 
            <button id="agregarBtn${producto.id}" class="btn btn-outline-success">Agregar al carrito</button>
            </div>
        </div>`
        divProductos.appendChild(nuevoProducto)

        let btnAgregar = document.getElementById(`agregarBtn${producto.id}`)

        btnAgregar.addEventListener("click", () => {
            agregarAlCarrito(producto)
        })

}
}

function agregarAlCarrito(producto) {
    productosEnCarrito.push(producto)
    localStorage.setItem("carrito", JSON.stringify(productosEnCarrito))
}

function cargarProductosCarrito(array) {
    modalBody.innerHTML = ""

    array.forEach(productoCarrito => {
        modalBody.innerHTML += 
        `<div class="card border-primary mb-3" id ="productoCarrito${productoCarrito.id}" style="max-width: 540px;">
            <img class="card-img-top" height="300px" src="assets/${productoCarrito.imagen}" alt="${productoCarrito.nombreProducto}">
            <div class="card-body">
                <h4 class="card-title">${productoCarrito.nombreProducto}</h4>
        
                <p class="card-text">$${productoCarrito.precio}</p> 
                <button class= "btn btn-danger" id="botonEliminar${productoCarrito.id}"><i class="fas fa-trash-alt"></i></button>
            </div>    
        </div>
        `
    });

    array.forEach((productoCarrito, indice) => {
        document.getElementById(`botonEliminar${productoCarrito.id}`).addEventListener("click", () => {
            let cardProducto = document.getElementById(`productoCarrito${productoCarrito.id}`)
            cardProducto.remove()
            productosEnCarrito.splice(indice, 1)
            localStorage.setItem("carrito", JSON.stringify(productosEnCarrito))


        })

    });

}

function cargarLibro(array) {
    let inputAutor = document.getElementById("autorInput")
    let inputTitulo = document.getElementById("tituloInput")
    let inputPrecio = document.getElementById("precioInput")

    let libroCreado = new Libro(array.length + 1, inputAutor.value, inputTitulo.value, parseInt(inputPrecio.value), "libroNuevo.jpg")
    array.push(libroCreado)
    localStorage.setItem("estanteria", JSON.stringify(array))
    mostrarCatalogo(array)
    inputAutor.value = ""
    inputTitulo.value = ""
    inputPrecio.value = ""
}

btnGuardarProducto.addEventListener("click", () => {
    cargarProducto(producto)
})
/* 3er agregar capacidad de escucha al elemento y agregar el evento */
buscador.addEventListener("input", () => {
    buscarInfo(buscador.value, productos)
    
    // Para picadas
    // buscarProducto(buscador.value, productos)
})

botonCarrito.addEventListener("click", () => {
    cargarProductosCarrito(productosEnCarrito)
})


mostrarCatalogo(productos)

/* function buscarProducto() {
    let seleccion = prompt("Ingrese el nombre de la picada que desea seleccionar: (Premium, Tradicional, Veggie)");
    producto = productos.find((p) => p.nombreProducto.toLowerCase() === seleccion.toLowerCase());
}

function agregarCarrito() {

    if (producto) {
    let cantidad = parseInt(prompt("Ingrese la cantidad que desea seleccionar:"));
    let quierePromo

    if (producto.estaEnPromo) {
        quierePromo = confirm(`Este producto está en promo! Desea agregar una unidad más al ${porcentajePromo}%?`)
    }
    let subtotal
    if (quierePromo) {
    subtotal = (producto.precio * cantidad ) + producto.precio * (1-porcentajePromo/100)
    cantidad++ 
    } else {
        subtotal = producto.precio * cantidad 
    }

    carrito.push({
    producto: producto.nombreProducto,
    cantidad: cantidad,
    subtotal: subtotal
    });
} else {
    alert("El producto que ingresaste no existe")
}
}

function confirmarCarrito() {
    while (true) {
    buscarProducto();
    agregarCarrito();

    if (!confirm("¿Desea agregar otro producto al carrito?")) {
        break;
    }
    }
}
function calcularTotal() {
    console.log("Carrito de compras:");
    carrito.forEach((item) => {
    console.log(`- ${item.cantidad} ${item.producto}: ${item.subtotal} ${item.estaEnPromo ? "Aprovechaste la promo!" : ""} `);
});

let total = carrito.reduce((sum, item) => sum + item.subtotal, 0);
console.log(`Total a pagar: ${total}`);
}

function vaciarCarrito() {
carrito = [];
console.log("El carrito ha sido vaciado.");
}

confirmarCarrito();

if (carrito.length > 0) {
if (confirm("¿Desea vaciar el carrito?")) {
vaciarCarrito();
}
}

calcularTotal(); */
