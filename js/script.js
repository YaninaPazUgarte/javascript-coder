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
    estaEnPromo: true
    },

    {
    id: 3,
    nombreProducto: "Veggie",
    precio: 2500,
    estaEnPromo: false
    }
];

let carrito = [];
let producto
let porcentajePromo = 20

function buscarProducto() {
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

calcularTotal();
