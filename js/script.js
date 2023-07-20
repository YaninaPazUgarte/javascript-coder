
let productos = [
    {
    id: 1,
    nombreProducto: "Premium",
    precio: 3900,
    estaEnPromo: false
    },

    {
    id: 2,
    nombreProducto: "Tradicional",
    precio: 3100,
    estaEnPromo: false
    },

    {
    id: 3,
    nombreProducto: "Veggie",
    precio: 2500,
    estaEnPromo: false
    },
];

let carrito = [];

function buscarProducto() {
    let seleccion = prompt("Ingrese el nombre de la picada que desea seleccionar: (Premium, Tradicional, Veggie)");
    

    producto = productos.find((p) => p.nombreProducto.toLowerCase() === seleccion.toLowerCase());
    }

function agregarCarrito() {
    }

if (productos) {
    let cantidad = parseInt(prompt("Ingrese la cantidad que desea seleccionar:"));
    let quierePromo
}

if (productos.estaEnPromo) {
    quierePromo = confirm("Este producto está en promo! Desea agregar una unidad más al 50%?")
}

let subtotal
    if (quierePromo) {
        subtotal = ((productos.precio * cantidad) - 1) + productos.precio * 50/100 
    } else {
        subtotal = productos.precio * cantidad 
    }

    carrito.push({
    producto: productos.nombreProducto,
    cantidad: cantidad,
    subtotal: subtotal
});


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

calcularTotal();

