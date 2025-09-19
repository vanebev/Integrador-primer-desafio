/* ......................................... */
/*          Importacion                      */
/* .......................................... */
import inicio from "./inicio.js"
import alta from "./alta.js"
import carrito from "./carrito.js"
import contacto from "./contacto.js"
import nosotros from "./nosotros.js"
import otra from "./otra.js"



// -------------------------------------
//         variables globales
// -------------------------------------



// -------------------------------------
//        funciones globales
// -------------------------------------

function cargarPlantilla(id){
    const main = document.querySelector('main')
    if(!id) id = 'inicio'
    const url = 'plantillas/' + id + '.html'
    
    //const startFn = [startInicio, startAlta, startCarrito, startContacto, startNosotros, startOtra]
    const startFn = {
        'inicio'  : inicio.startInicio, 
        'alta'    : alta.startAlta, 
        'carrito' : carrito.startCarrito, 
        'contacto': contacto.startContacto, 
        'nosotros': nosotros.startNosotros, 
        'otra'    : otra.startOtra
    }

    const xhr = new XMLHttpRequest()
    xhr.open('get', url)
    xhr.addEventListener('load',()=>{
        if(xhr.status ==200){
            const plantilla = xhr.response 
    
            
            //cargo la plantilla html seleccionada en el main
            main.innerHTML = plantilla
            //ejecuto las funciones del script correspondiente a esa plantilla cargada
          

            startFn[id]()
    }
})

  xhr.send()  
}

function cargarPlantillas (){
    //carga de la vista inicial de navegacion (estatica inicial)
    const id = location.hash.slice(1)
    cargarPlantilla(id)

    //carga de la vista inicial de navegacion (dinamica)
    const links = document.querySelectorAll('header nav a')

    links.forEach ( link => {
       // console.log(link)

        link.addEventListener('click',e=>{
            e.preventDefault()

            
             const id = link.id   
             // cargarPlantilla(id)
            

             //inyectamos la navegacion nueva en el historial
             location.hash = id

        })

    })
    
    window.addEventListener('hashchange', ()=>{
        //console.log('Cambio el hash (#) en la url')
    
        const id = location.hash.slice(1)
        cargarPlantilla(id)
    })
}

function start(){
    console.error(document.querySelector('title').textContent)
    
   cargarPlantillas()
}



// -------------------------------------
//          punto de entrada
// -------------------------------------
window.onload = start


/* ......................................... */
/*          Exportacion                      */
/* .......................................... */


