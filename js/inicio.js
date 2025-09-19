
/* ......................................... */
/*          Importacion                      */
/* .......................................... */
import servicioProductos from "./servicioProductos.js"
import productosMem from "./productosMem.js"

// -------------------------------------
//         variables globales
// -------------------------------------


// -------------------------------------
//         funciones globales
// -------------------------------------
function representarCardsProductos() {
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
                        <a href="#" class="boton-comprar">Comprar</a>
                      </section>`
        }
    }
    else cards += '<h2>No se encontraron productos para mostrar</h2>'

    document.querySelector('.section-cards-body').innerHTML = cards
}



async function startInicio() {
    console.warn('startInicio')

    // obtengo los productos del recurso remoto
   const productos = await servicioProductos.getAll()
   console.log(productos)
   // Guardo los productos obtenidos en un recurso local
   productosMem.setAll(productos)

    representarCardsProductos()
}

/* ......................................... */
/*          Exportacion                      */
/* .......................................... */

export default {
    startInicio
}
