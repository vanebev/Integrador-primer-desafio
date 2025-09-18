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
        'inicio'  : startInicio, 
        'alta'    : startAlta, 
        'carrito' : startCarrito, 
        'contacto': startContacto, 
        'nosotros': startNosotros, 
        'otra'    : startOtra
    }

    const xhr = new XMLHttpRequest()
    xhr.open('get', url)
    xhr.addEventListener('load',()=>{
        if(xhr.status ==200){
            const plantilla = xhr.response 
            //console.log(plantilla)
            
            //cargo la plantilla html seleccionada en el main
            main.innerHTML = plantilla
            //ejecuto las funciones del script correspondiente a esa plantilla cargada
           /*  
           if(id == 'inicio') startInicio()
           else if (id == 'alta') startAlta()
           else if (id == 'carrito') startCarrito()
           else if (id == 'contacto') startContacto()
           else if (id == 'nosotros') startNosotros()
           else if (id == 'otra') startOtra() */
           
           /* switch(id){
            case 'inicio' : startInicio(); break
            case 'alta' : startAlta(); break
            case 'carrito' : startCarrito(); break
            case 'contacto' : startContacto(); break
            case 'nosotros' : startNosotros(); break
            case 'otra' : startOtra(); break
            default : break
           } */

          /*  switch(id){
            case 'inicio' :   startFn [0] (); break
            case 'alta' :     startFn [1](); break
            case 'carrito' :  startFn [2](); break
            case 'contacto' : startFn [3](); break
            case 'nosotros' : startFn [4](); break
            case 'otra' :     startFn [5](); break
            default : break
           } */

          /*   switch(id){
            case 'inicio' :   startFn.inicio (); break
            case 'alta' :     startFn.alta (); break
            case 'carrito' :  startFn.carrito (); break
            case 'contacto' : startFn.contacto (); break
            case 'nosotros' : startFn.nosotros (); break
            case 'otra' :     startFn.otra (); break
            default : break

            
        } */

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
    //console.log(links)

    links.forEach ( link => {
       // console.log(link)

        link.addEventListener('click',e=>{
            e.preventDefault()

           // console.log('Click en link', link.id)
            
             const id = link.id   
             // cargarPlantilla(id)
            

             //inyectamos la navegacion nueva en el historial
             location.hash = id

        })

    })
    
    window.addEventListener('hashchange', ()=>{
        console.log('Cambio el hash (#) en la url')
    
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
