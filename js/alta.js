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
 async function agregar(e) {
    e.preventDefault()

   // console.log('Agregar()', this)
   // console.dir(this)


    const nombre = this[0].value
    const precio = this[1].value
    const stock = this[2].value
    const marca = this[3].value
    const categoria = this[4].value
    const detalles = this[5].value
    const descripcionCorta= this[6].value
    const descripcionLarga = this[7].value
    const edadDesde = this[8].value
    const edadHasta = this[9].value
    const foto = this[10].value
    const envio = this[11].checked

    const producto = {
        nombre,
        precio: +precio,
        stock: parseInt(stock),
        marca,
        categoria,
        detalles,
        descripcionCorta,
        descripcionLarga,
        edadDesde,
        edadHasta,
        foto,
        envio,
    }

    console.log(producto)
    
    //guardamos el producto en el recurso remoto
    const productoGuardado = await servicioProductos.guardar(producto)
    console.log (productoGuardado)
    
    //guardamos el producto en el recurso local
    productosMem.guardar(producto)

    render()

    // borro los campos de entrada del formulario
    this.reset()
}

function render() {
    let filasTabla = ''

    const productos = productosMem.getAll()

    if(productos.length) {
        filasTabla += `
            <tr>
                <th>#</th>
                <th>nombre</th>
                <th>precio</th>
                <th>stock</th>
                <th>marca</th>
                <th>categoría</th>
                <th>detalles</th>
                <th>descripcion corta</th>
                <th>descripcion larga</th>
                <th>edad desde</th>
                <th>edad desde</th>
                <th>foto</th>
                <th>envío</th>
                <th>Acciones</th>
            </tr>        
        `

        for(let producto of productos) {
            filasTabla += `
                <tr>
                    <td class="centrar">${producto.id}</td>
                    <td>${producto.nombre}</td>
                    <td class="centrar">$${producto.precio}</td>
                    <td class="centrar">${producto.stock}</td>
                    <td>${producto.marca}</td>
                    <td>${producto.categoria}</td>
                    <td>${producto.detalles}</td>
                    <td>${producto.descripcionCorta}</td>
                    <td>${producto.descripcionLarga}</td>
                    <td>${producto.edadDesde}</td>
                    <td>${producto.edadHasta}</td>
                    <td class="centrar"><img width="75" src="${producto.foto}" alt="foto de ${producto.nombre}"></td>
                    <td class="centrar">${producto.envio? 'Si':'No'}</td>
                    <td >
                      <button class="borrar-editar" id="btnBorrar-${producto.id}">Borrar</button>
                      <button class="borrar-editar" id="btnEditar-${producto.id}">Editar</button>
                    </td>
                </tr>        
            `
        }
    }
    else {
        filasTabla += '<h2>No se encontraron productos para mostrar</h2>'
    }

    document.querySelector('table').innerHTML = filasTabla
}

function setListeners(){
    document.querySelector('.alta .alta-form').addEventListener('submit',agregar)
    

    //seteo de los eventos en los botones de borrar
      const botonesBorrar = document.querySelectorAll('.alta table button[id^="btnBorrar-"]')
    //console.log(botonesBorrar)

    botonesBorrar.forEach(boton=> {
        boton.addEventListener('click',async ()=>{
            const id = boton.id.split('-')[1]
            console.log('btnBorrar id',id)
            //borramos el producto en el recurso remoto
            
            if(confirm(`¿Esta seguro de borrar el producto de id ${id} ?`)){

            
                const productoEliminado = await servicioProductos.eliminar(id)
                //borramos el producto en el recurso remoto
                productosMem.eliminar(productoEliminado.id)
                
                render()
                
            }
        })
    })

    //seteo de los eventos en los botones de editar
      const botonesEditar = document.querySelectorAll('.alta table button[id^="btnEditar-"]')
    //console.log(botonesBorrar)

    botonesEditar.forEach(boton=> {
        boton.addEventListener('click',()=>{
            const id = boton.id.split('-')[1]
            console.log('btnEditar id',id)
        })
    })
}


async function start() {
    console.warn('startAlta')

     // obtengo los productos del recurso remoto
       const productos = await servicioProductos.getAll()
       console.log(productos)
       // Guardo los productos obtenidos en un recurso local
       productosMem.setAll(productos)

   render()
    setListeners()
}

/* ......................................... */
/*          Exportacion                      */
/* .......................................... */

export default {
    start
}