
/* ......................................... */
/*          Importacion                      */
/* .......................................... */
import servicioProductos from "./servicioProductos.js"
import productosMem from "./productosMem.js"
import carrito from "./carrito.js"
// -------------------------------------
//         variables globales
// -------------------------------------


// -------------------------------------
//         funciones globales
// -------------------------------------
function render() {
    let cards = ''

    const productos = productosMem.getAll()
    
    if(productos.length) {
        for(let i=0; i<productos.length; i++) {
            let producto = productos[i]
            cards += `<section>
                        <h3>${producto.nombre}</h3>
                        <img src="${producto.foto}" alt="foto de ${producto.nombre}">
                        <p><b>Precio:</b> $${producto.precio}</p>
                        <p><b>Stock:</b> ${producto.stock}</p>
                        <p><b>Marca:</b> ${producto.marca}</p>
                        <p><b>Categoría:</b> ${producto.categoria}</p>
                        <p><b>Detalles:</b> ${producto.detalles}</p>
                        <br>
                        <p><b style="color:gold;">Envío:</b> ${producto.envio? 'Si':'No'}</p>
                        <button  id="btnComprar-${producto.id}">Agregar producto al carrito</button>
                        <a href="#" class="boton-comprar">Comprar</a>
                      </section>`
        }
    }
    else cards += '<h2>No se encontraron productos para mostrar</h2>'

    document.querySelector('.section-cards-body').innerHTML = cards
    setListeners()
}

function setListeners(){
    //seteo de los eventos en los botones de comprar
      const botonesComprar = document.querySelectorAll('.inicio section button[id^="btnComprar-"]')
    console.log(botonesComprar)

    botonesComprar.forEach(boton=> {
        boton.addEventListener('click',async ()=>{
            const id = boton.id.split('-')[1]
            console.log('btnComprar id',id)
            
            const producto= productosMem.get(id)
            //console.log(producto)
            carrito.agregar(producto)


        })
    })
}


async function start() {
    console.warn('startInicio')

    // obtengo los productos del recurso remoto
   const productos = await servicioProductos.getAll()
   console.log(productos)
   // Guardo los productos obtenidos en un recurso local
   productosMem.setAll(productos)

   render()
}

/* ......................................... */
/*          Exportacion                      */
/* .......................................... */

export default {
    start
}
