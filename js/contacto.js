let form = document.querySelector('#contactForm');
let submitButton = form.querySelector('button[type="submit"]')

form.addEventListener('submit', function(e) {
e.preventDefault ()

let nombreApellido = form.querySelector('#nombreApellido').value
let telefono = form.querySelector('#telefono').value
let email = form.querySelector('#email').value
let consulta = form.querySelector('#consulta').value

let datosUsuario = {
    nombreApellido: nombreApellido,
    telefono: telefono,
    email: email,
    consulta: consulta
}

let registros = [];
registros.push(datosUsuario)

console.log(registros)

Swal.fire(
    'Pronto nos contactaremos!',
    
)

form.reset()

})
