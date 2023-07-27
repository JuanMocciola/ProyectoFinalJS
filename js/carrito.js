//LocalStorage
let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito);
//DOM
const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll("#eliminar-producto");
const botonVaciar = document.querySelector(".accion-vaciar");
const contenedorTotal = document.querySelector("#total-carrito");
const botonComprar = document.querySelector(".accion-comprar");

//Cuando el carrito tenga contenido muestra los items agregados y cuando este vacio muestra solamente un texto.
function cargarProductosCarrito() {
    if (productosEnCarrito && productosEnCarrito.length > 0) {
        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    
        contenedorCarritoProductos.innerHTML = "";
    
        productosEnCarrito.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.titulo}">
            <div class="carrito-producto-titulo">
                <p>Titulo</p>
                <h4>${producto.titulo}</h4>
            </div>
            <div class="carrito-producto-cantidad">
                <p>Cantidad</p>
                <strong>${producto.cantidad}</strong>
            </div>
            <div class="carrito-producto-precio">
                <p>$${producto.precio}</p>
            </div>
            <div class="carrito-producto-subtotal">
                <p>Subtotal</p>
                <strong>$${producto.precio * producto.cantidad}</strong>
            </div>
            <button id="eliminar-producto" class="carrito-producto-eliminar" id="${producto.id}"><i class="fa-solid fa-trash"></i></button>
            `;
    
            contenedorCarritoProductos.append(div);
        })
    
    } else {
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    }
    actualizarBotonesEliminar();
    actualizarTotal();
}

cargarProductosCarrito();


//Eliminar producto (icono)
function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll("#eliminar-producto");
    botonesEliminar.forEach (boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

function eliminarDelCarrito(e) {
    let idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
    productosEnCarrito.splice(index, 1);
    //Llamo a la funcion para que se actualize el carrito
    cargarProductosCarrito();
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

}

//Evento boton vaciar carrito
botonVaciar.addEventListener("click", vaciarCarrito);

//Funcionalidad boton vaciar carrito
function vaciarCarrito () {
    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    //Llamo a la funcion para que se actualize el carrito
    cargarProductosCarrito();
}

//Precio Total
function actualizarTotal() {
    const totalCompra = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0 );
    contenedorTotal.innerText = `$${totalCompra}`;
}

//Evento boton comprar
botonComprar.addEventListener("click", comprarCarrito);
//Funcionalidad boton comprar
function comprarCarrito () {
    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.remove("disabled");
}