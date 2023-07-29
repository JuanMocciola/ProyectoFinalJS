//NAV-BAR inicia
const nav = document.querySelector("#nav");
const abrir = document.querySelector("#abrir");
const cerrar = document.querySelector("#cerrar");

abrir.addEventListener("click", () => {
    nav.classList.add("visible");
})

cerrar.addEventListener("click", () => {
    nav.classList.remove("visible");
})
//NAV-BAR termina


//Mis productos desde el JSON
let productos = [];

fetch("./js/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargarProductos(productos);
    })

//Elementos del DOM
const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria")
const tituloSeccion = document.querySelector("#titulo-seccion");
let botonesAgregar = document.querySelectorAll(".boton-agregar");
const numero = document.querySelector("#numero");

//Agrego productos al HTML
function cargarProductos(productosElegidos) {
    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("card");
        div.innerHTML = `
        <div class="card-img">
            <img src="${producto.imagen}" alt="${producto.titulo}">
        </div>
        <div class="card-text">
            <h3>${producto.titulo}</h3>
            <p>$${producto.precio}</p>
            <button class="boton-agregar" id="${producto.id}" ><i class="fa-solid fa-basket-shopping"></i>Agregar</button>
        </div>
        `;

        contenedorProductos.append(div);

        actualizarBotonesAgregar();
    })
}

//Le agrego un evento a mis botones de tipos de casco
botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {
        if(e.currentTarget.id != "todos"){
            //Para que se cambie el titulo dependiente de el tipo de casco
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloSeccion.innerText = productoCategoria.categoria.nombre;

            //Para que se filtre los tipos de casco
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        }else{
            tituloSeccion.innerText = "Todos los productos"
            cargarProductos(productos);
        }
    })
});

//Botones Agregar
function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".boton-agregar");

    botonesAgregar.forEach (boton => {
        boton.addEventListener("click", agregarAlCarrito)
    });
}

//Productos en carrito al Local storage
let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("procuctos-en-carrito");

if(productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumero ();
}else {
    productosEnCarrito= [];
}

//Agregar al carrito
function agregarAlCarrito (e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    }else{
    productoAgregado.cantidad = 1;
    productosEnCarrito.push(productoAgregado);
    }

    //Alerta cuando toco agregar
    Toastify({
        text: "Producto agregado!",
        duration: 3000,
        destination: "./carrito.html",
        newWindow: false,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
        background: "linear-gradient(to right, #000000, #808080)",
        },
        onClick: function(){}
      }).showToast();

    actualizarNumero ();

    //Local storage
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

}

//Se suma la cantidad de productos en carrito
function actualizarNumero () {
    let Nuevonumero = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numero.innerText = Nuevonumero;
}