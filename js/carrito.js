/* ......................................... */
/*          Importacion                      */
/* .......................................... */
import carritoMem from "./carritoMem.js"
// -------------------------------------
//         variables globales
// -------------------------------------


// -------------------------------------
//         funciones globales
// -------------------------------------
function agregar (producto){
     //console.log(producto)

     const  id = producto.id
     const productoExistente = carritoMem.get(id)
     //console.log(productoExistente)

     if(!productoExistente){
     producto.cantidad = 1
     carritoMem.guardar(producto)
     }

     else{
        productoExistente.cantidad++
     }

     //console.log(carritoMem.getAll())
     //render()
}
function render() {
    let filasTabla = ''

    const carrito = carritoMem.getAll()

    if(carrito.length) {
        mostrarBotonesBorrarPedir(true)

        filasTabla += `
            <tr>
                <th>#</th>
                <th>nombre</th>
                <th>precio</th>
                <th>marca</th>
                <th>foto</th>
                <th>cantidad</th>
                <th>Acciones</th>
            </tr>        
        `

        for(let producto of carrito) {
            filasTabla += `
                <tr>
                    <td class="centrar">${producto.id}</td>
                    <td>${producto.nombre}</td>
                    <td class="centrar">$${producto.precio}</td>
                    <td>${producto.marca}</td>
                    <td class="centrar"><img width="75" src="${producto.foto}" alt="foto de ${producto.nombre}"></td>
                    <td class="centrar">${producto.cantidad}</td>
                    
                    <td >
                      <button } id="btnBorrar-${producto.id}">Borrar</button>
                
                      </td>
                </tr>        
            `
        }
    }
    else {
        mostrarBotonesBorrarPedir(false)

        filasTabla += '<h2>No se encontraron pedidos para mostrar</h2>'
    }

    document.querySelector('.carrito table').innerHTML = filasTabla
    setListeners()
}

function setListeners(){
     //seteo de los eventos en los botones de borrar
          const botonesBorrar = document.querySelectorAll('.carrito table button[id^="btnBorrar-"]')
        //console.log(botonesBorrar)
    
        botonesBorrar.forEach(boton=>{
            boton.addEventListener('click',async ()=>{
                const id = boton.id.split('-')[1]
                console.log('btnBorrar id',id)
                //borramos el producto en el recurso remoto
                
                if(confirm(`¿Esta seguro de borrar el producto del carrito de id ${id} ?`)){
    
                    //borramos el producto en el recurso remoto
                    carritoMem.eliminar(id)
                    
                    render()
                    
                }
            })
        })

}

function borrarCarrito(){
    console.log('borrarCarrito')

    
    
    if(confirm('¿Esta seguro de borrar todo el carrito?')){
    carritoMem.clearAll
        render()
    }
}

function pedir(){
    console.error('pedir...')

    setTimeout(()=>{
       console.log(carritoMem.getAll())
       console.warn('Pedido confirmado!')
       carritoMem.clearAll()
       render()
    },2000)
}

function mostrarBotonesBorrarPedir(mostrar){
    console.log(mostrar)
    document.querySelectorAll('.carrito-borrar-pedir').forEach(b => b.style.display = mostrar? 'block' : 'none')
}

function start() {
    console.warn('startCarrito')

    const refBorrar = document.querySelector('#carrito-borrar')
    const refPedir = document.querySelector('#carrito-pedir')

    refBorrar.addEventListener('click', borrarCarrito)
    refPedir.addEventListener('click', pedir)
 
    render()

}   

/* ......................................... */
/*          Exportacion                      */
/* .......................................... */

export default {
    start,
    agregar
}