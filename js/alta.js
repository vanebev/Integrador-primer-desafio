/* ......................................... */
/*          Importacion                      */
/* .......................................... */
import servicioProductos from "./servicioProductos.js"
import productosMem from "./productosMem.js"

// -------------------------------------
//         variables globales
// -------------------------------------

let editarID = null
// -------------------------------------
//         funciones globales
// -------------------------------------
 function ponerBotonActualizar(){
    const ref = document.querySelector('.alta form button')
    
    ref.classList.add('btnActualizar')
    ref.classList.remove('btnAgregar')
    ref.innerText = 'Actualizar'
 }
 function ponerBotonAgregar(){
    const ref = document.querySelector('.alta form button')
    
    ref.classList.add('btnAgregar')
    ref.classList.remove('btnActualizar')
    
    ref.innerText = 'Agregar'
    
 }

function copiarProductoEnFormulario(producto){
   //console.log(producto)

    for(let campo in producto){
        //console.log(campo)
        const input = document.getElementById( campo)
   
        //console.log(campo, input, producto[campo])
    
        if(input){
        /* if (input.id == 'envio') input.checked = producto[campo]
        else input.value = producto[campo] */

        //input.id == 'envio'? input.checked = producto[campo] :input.value = producto[campo]
       
        input[input.id == 'envio'? 'checked' : 'value'] = producto[campo]
    }
   }
}

function borrarFormulario(){
    document.querySelector('.alta .alta-form').reset()
}

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

    if(editarID){
      //actualizamos el producto en el recurso remoto
    const productoActualizado = await servicioProductos.actualizar(editarID, producto)
    console.log (productoActualizado)

    //actualizamos el producto en el recurso local
    productosMem.actualizar(productoActualizado.id, productoActualizado)
   
    editarID = null
    ponerBotonAgregar()

  }
    
    else{
     //guardamos el producto en el recurso remoto
    const productoGuardado = await servicioProductos.guardar(producto)
    console.log (productoGuardado)
    
    //guardamos el producto en el recurso local
    productosMem.guardar(producto)
    }

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
                      ${editarID && (editarID == producto.id)
                        ?`<button class="borrar-editar" id="btnCancelar-${producto.id}">Cancelar</button>`
                        :`<button class="borrar-editar" id="btnEditar-${producto.id}">Editar</button>`
                      }
                      </td>
                </tr>        
            `
        }
    }
    else {
        filasTabla += '<h2>No se encontraron productos para mostrar</h2>'
    }

    document.querySelector('table').innerHTML = filasTabla
    setListeners()
}

function setListeners(){
    
    

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
            editarID = id 
            render()

            const producto = productosMem.get(id)
            console.log(producto)
            copiarProductoEnFormulario(producto)
             

            ponerBotonActualizar()
            
           

        })
    })

    //seteo de los eventos en los botones de Cancelar edicion
      const botonesCancelar = document.querySelectorAll('.alta table button[id^="btnCancelar-"]')
    //console.log(botonescancelar)

    botonesCancelar.forEach(boton=> {
        boton.addEventListener('click',()=>{
            const id = boton.id.split('-')[1]
            console.log('btnCancelar id',id)
            editarID = null
            render()

            borrarFormulario()
            ponerBotonAgregar()
            
            

        })
    })
}


async function start() {
    console.warn('startAlta')

    document.querySelector('.alta .alta-form').addEventListener('submit',agregar)

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