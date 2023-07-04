let carrito = "";
let nuevoOperacion = true;

function hacerCarrito() {
    do {
        let producto = prompt("Ingrese el nombre de la picada que desea comprar (Premium, Tradicional, Veggie):");
        let cantidad = parseInt(prompt(`Ingrese la cantidad de ${producto} que desea comprar:`));

        seleccionarProducto(producto, cantidad);
        nuevoOperacion = confirm("¿Desea agregar otro producto al carrito?");

    } while (nuevoOperacion);

    console.log("Productos en el carrito:");
    console.log(carrito);
}

function seleccionarProducto(producto, cantidad) {
    switch (producto.toLowerCase()) {
        case "premium":
            carrito += `Premium - Cantidad: ${cantidad} - Precio Total: ${3900 * cantidad} pesos\n`;
            break;
        case "tradicional":
            carrito += `Tradicional - Cantidad: ${cantidad} - Precio Total: ${3100 * cantidad} pesos\n`;
            break;
        case "veggie":
            carrito += `Veggie - Cantidad: ${cantidad} - Precio Total: ${2500 * cantidad} pesos\n`;
            break;
        default:
            alert("El producto ingresado no está disponible.");
            break;
    }
}

hacerCarrito(); 



