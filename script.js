let carrito = []; 
let listadoProductos = []; 


const botonesAgregar = document.querySelectorAll(".btm-agregar");
const listaCarrito = document.getElementById("lista-carrito");
const totalCarrito = document.getElementById("total");
const botonVaciar = document.getElementById("vaciar-carrito");

document.addEventListener("DOMContentLoaded", () => {
    const carritoGuardado = localStorage.getItem("carrito");

    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        renderCarrito();
    }
});


function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}



function renderCarrito() {
    listaCarrito.innerHTML = "";

    carrito.forEach((item, index) => {
        const div = document.createElement("div");
        div.classList.add("item-carrito");

        div.innerHTML = `
            <p><strong>${item.nombre}</strong></p>
            <p>Precio: $${item.precio}</p>
            <p>Cantidad: 
                <button class="menos" data-index="${index}">-</button>
                <span>${item.cantidad}</span>
                <button class="mas" data-index="${index}">+</button>
            </p>
            <p>Total: $${item.precio * item.cantidad}</p>
            <button class="eliminar" data-index="${index}">Eliminar</button>
            <hr>
        `;

        listaCarrito.appendChild(div);
    });

    actualizarEventosCarrito();
    calcularTotal();
}

function calcularTotal() {
    let total = 0;

    carrito.forEach(item => {
        total += item.precio * item.cantidad;
    });

    totalCarrito.textContent = total;
}

function actualizarEventosCarrito() {
   
    document.querySelectorAll(".mas").forEach(btn => {
        btn.addEventListener("click", (e) => {
            let i = e.target.dataset.index;
            carrito[i].cantidad++;
            guardarCarrito();
            renderCarrito();
        });
    });

   
    document.querySelectorAll(".menos").forEach(btn => {
        btn.addEventListener("click", (e) => {
            let i = e.target.dataset.index;

            if (carrito[i].cantidad > 1) {
                carrito[i].cantidad--;
            }

            guardarCarrito();
            renderCarrito();
        });
    });

    
    document.querySelectorAll(".eliminar").forEach(btn => {
        btn.addEventListener("click", (e) => {
            let i = e.target.dataset.index;

            carrito.splice(i, 1);

            guardarCarrito();
            renderCarrito();
        });
    });
}



botonesAgregar.forEach((boton, index) => {
    boton.addEventListener("click", () => {
        const tarjeta = boton.parentElement;

        const nombre = tarjeta.querySelector("h3").textContent;
        const precioTexto = tarjeta.querySelector(".precio").textContent.replace("$", "");
        const precio = parseInt(precioTexto);

        
        let existe = carrito.find(item => item.nombre === nombre);

        if (existe) {
            existe.cantidad++;
        } else {
            carrito.push({
                nombre: nombre,
                precio: precio,
                cantidad: 1
            });
        }

        guardarCarrito();
        renderCarrito();
    });
});



botonVaciar.addEventListener("click", () => {
    carrito = [];
    guardarCarrito();
    renderCarrito();
});




cargarProductos();



const formulario = document.querySelector("form");

formulario.addEventListener("submit", (e) => {
    const nombre = formulario.nombre.value.trim();
    const email = formulario.email.value.trim();
    const mensaje = formulario.mensaje.value.trim();

    if (nombre === "" || email === "" || mensaje === "") {
        alert("Todos los campos son obligatorios.");
        e.preventDefault();
        return;
    }

    if (!email.includes("@")) {
        alert("El email no es válido.");
        e.preventDefault();
        return;
    }

   
});

