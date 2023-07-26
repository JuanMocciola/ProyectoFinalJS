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

//CASCOS
const productos = [
    //Full Face
    {
        id: "fullFace-01",
        titulo: "K6 S E2206 - MORBIDELLI 2021",
        imagen: "../assets/img/fullFace1.webp",
        categoria: {
            nombre: "Full face",
            id: "fullFace"
        },
        precio: 6000
    },
    {
        id: "fullFace-02",
        titulo: "RR E2206 DOT",
        imagen: "../assets/img/fullFace2.webp",
        categoria: {
            nombre: "Full face",
            id: "fullFace"
        },
        precio: 6000
    },
    {
        id: "fullFace-03",
        titulo: "CHALLENGER - EDITION",
        imagen: "../assets/img/fullFace3.webp",
        categoria: {
            nombre: "Full face",
            id: "fullFace"
        },
        precio: 6000
    },
    {
        id: "fullFace-04",
        titulo: "K5 S E2205 MONO - PEARL ",
        imagen: "../assets/img/fullFace4.webp",
        categoria: {
            nombre: "Full face",
            id: "fullFace"
        },
        precio: 6000
    },
    {
        id: "fullFace-05",
        titulo: "K5 S E2205 MULTI - TEMPEST BLACK",
        imagen: "../assets/img/fullFace5.webp",
        categoria: {
            nombre: "Full face",
            id: "fullFace"
        },
        precio: 6000
    },
    {
        id: "fullFace-06",
        titulo: "K3 E2206 - ROSSI WINTER TEST 2018",
        imagen: "../assets/img/fullFace6.webp",
        categoria: {
            nombre: "Full face",
            id: "fullFace"
        },
        precio: 6000
    },

    //MODULAR
    {
        id: "modular-01",
        titulo: "TOURMODULAR ECE2206 MONO - GALASSIA",
        imagen: "../assets/img/modular1.webp",
        categoria: {
            nombre: "Modular",
            id: "modular"
        },
        precio: 7000
    },
    {
        id: "modular-02",
        titulo: "TOURMODULAR ECE2206 MONO - LUNA",
        imagen: "../assets/img/modular2.webp",
        categoria: {
            nombre: "Modular",
            id: "modular"
        },
        precio: 7000
    },
    {
        id: "modular-03",
        titulo: "SPORTMODULAR MONO E2205 - CARBON",
        imagen: "../assets/img/modular3.webp",
        categoria: {
            nombre: "Modular",
            id: "modular"
        },
        precio: 7000
    },
    {
        id: "modular-04",
        titulo: "TOURMODULAR ECE2206 MONO - MATT BLACK ",
        imagen: "../assets/img/modular4.webp",
        categoria: {
            nombre: "Modular",
            id: "modular"
        },
        precio: 7000
    },
    {
        id: "modular-05",
        titulo: "TOURMODULAR ECE2206 MULTI - BALANCE",
        imagen: "../assets/img/modular5.webp",
        categoria: {
            nombre: "Modular",
            id: "modular"
        },
        precio: 7000
    },
    {
        id: "modular-06",
        titulo: "TOURMODULAR E2206 - TEXTOUR MATT BLACK",
        imagen: "../assets/img/modular6.webp",
        categoria: {
            nombre: "Modular",
            id: "modular"
        },
        precio: 7000
    },

    //OFF ROAD
    {
        id: "off Road-01",
        titulo: "X-FORCE - MX703",
        imagen: "../assets/img/offRoad1.avif",
        categoria: {
            nombre: "Off road",
            id: "offRoad"
        },
        precio: 7000
    },
    {
        id: "off Road-02",
        titulo: "SUBVERTER EVO - MX700",
        imagen: "../assets/img/offRoad2.avif",
        categoria: {
            nombre: "Off road",
            id: "offRoad"
        },
        precio: 7000
    },
    {
        id: "off Road-03",
        titulo: "FAST EVO - MX437",
        imagen: "../assets/img/offRoad3.avif",
        categoria: {
            nombre: "Off road",
            id: "offRoad"
        },
        precio: 7000
    },
    {
        id: "off Road-04",
        titulo: "EXPLORER CARBON - MX701",
        imagen: "../assets/img/offRoad4.avif",
        categoria: {
            nombre: "Off road",
            id: "offRoad"
        },
        precio: 7000
    },
    {
        id: "off Road-05",
        titulo: "EXPLORER - MX701",
        imagen: "../assets/img/offRoad5.avif",
        categoria: {
            nombre: "Off road",
            id: "offRoad"
        },
        precio: 7000
    },
    {
        id: "off Road-06",
        titulo: "PIONEER EVO - MX436",
        imagen: "../assets/img/offRoad6.avif",
        categoria: {
            nombre: "Off road",
            id: "offRoad"
        },
        precio: 7000
    },
];

//Elementos del DOM
const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria")
const tituloSeccion = document.querySelector("#titulo-seccion");

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
            <button id="${producto.id}" ><i class="fa-solid fa-basket-shopping"></i>Agregar</button>
        </div>
        `;

        contenedorProductos.append(div);
    })
}

cargarProductos(productos);

//Le agrego un evento a mis botones de tipos de casco para que filtren los tipos
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
