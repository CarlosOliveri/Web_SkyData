import initMenuHamburguesa from "./menuHamburguesa.js";
import Proyecto from "./clases/Proyecto.js";
import Servicio from "./clases/Servicio.js";
import "./animaciones.js";

initMenuHamburguesa();//viene de menuHamburguesa.js

const path = window.location.pathname;

Proyecto.get_proyectos().then(data => {
    const proyectosContainer = document.querySelector(".contenido-proyectos"); 
    let limit = Infinity;
    if (path == "/") {
        limit = 3;
    }
    data.forEach((element,index) => {
        if(index >= limit) return; // Limitar a 3 proyectos

        const proyectoDiv = document.createElement("div");
        proyectoDiv.classList.add("proyecto");

        const imgProyecto = document.createElement("div");
        imgProyecto.classList.add("imagen-proyecto");
        imgProyecto.style.position = "relative";
        proyectoDiv.appendChild(imgProyecto);

        const proyectoImg = document.createElement("img");
        proyectoImg.src = `assets/proyectos/${element["imagenes"][0]}`;
        proyectoImg.alt = "Imagen del proyecto";
        imgProyecto.appendChild(proyectoImg);

        const descriptionTag = document.createElement("p");
        descriptionTag.classList.add("tag");
        descriptionTag.textContent = element["tag"];
        imgProyecto.appendChild(descriptionTag);

        const proyectoText = document.createElement("div");
        proyectoText.classList.add("texto-proyecto"); 
        const titulo = document.createElement("h3");
        titulo.textContent = element["titulo"];
        proyectoText.appendChild(titulo);

        const descripcion = document.createElement("p");
        descripcion.classList.add("subtitulo");
        const palabras = element["descripcion"].split(' ');
        const limite = 30; // máximo de palabras permitidas
        if (palabras.length > limite) {
            descripcion.textContent = palabras.slice(0, limite).join(' ') + ' ...';
        }else{
            descripcion.textContent = element["descripcion"];
        }
        proyectoText.appendChild(descripcion);

        const boton = document.createElement("a");
        boton.classList.add("boton-claro");
        boton.textContent = "Ver Proyecto >";
        boton.href = `proyecto.html?id=${element["id"]}`
        //proyectoText.appendChild(boton);

        proyectoDiv.appendChild(proyectoText);

        if(path == "/" | path == "/proyectos.html")
        proyectosContainer.appendChild(proyectoDiv);
    });
});

if(path != "/"){
    let header = document.querySelector(".header");
    header.style.height = "unset";
    let barra = document.querySelector(".barra");
    barra.style.justifyContent = "space-between";
}

