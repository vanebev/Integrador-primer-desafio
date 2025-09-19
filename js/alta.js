// -------------------------------------
//         variables globales
// -------------------------------------


// -------------------------------------
//         funciones globales
// -------------------------------------
 async function agregar(e) {
    e.preventDefault()

    console.log('Agregar()')

    const refNombre = document.querySelector('#nombre')
    const refPrecio = document.querySelector('#precio')
    const refStock = document.querySelector('#stock')
    const refMarca = document.querySelector('#marca')
    const refCategoria = document.querySelector('#categoria')
    const refDetalles = document.querySelector('#detalles')
    const refDescripcionLarga = document.querySelector('#descripcionCorta')
    const refDescripcionCorta = document.querySelector('#descripcionLarga')
    const refEdadDesde = document.querySelector('#edadDesde')
    const refEdadHasta = document.querySelector('#edadHasta')
    const refFoto = document.querySelector('#foto')
    const refEnvio = document.querySelector('#envio')

    const nombre = refNombre.value
    const precio = refPrecio.value
    const stock = refStock.value
    const marca = refMarca.value
    const categoria = refCategoria.value
    const detalles = refDetalles.value
    const descripcionCorta= refDescripcionCorta.value
    const descripcionLarga = refDescripcionLarga.value
    const edadDesde = refEdadDesde.value
    const edadHasta = refEdadHasta.value
    const foto = refFoto.value
    const envio = refEnvio.checked

    const producto = {
        nombre: nombre,
        precio: +precio,
        stock: parseInt(stock),
        marca: marca,
        categoria: categoria,
        detalles: detalles,
        descripcionCorta: descripcionCorta,
        descripcionLarga: descripcionLarga,
        edadDesde: edadDesde,
        edadHasta: edadHasta,
        foto: foto,
        envio: envio,
    }

    console.log(producto)
    
    //guardamos el producto en el recurso remoto
    const productoGuardado = await guardar(producto)
    console.log (productoGuardado)
    //guardamos el producto en el recurso local
    productos.push(producto)

    representarTablaProductos()

    // borro los campos de entrada del formulario
    refNombre.value = ''
    refPrecio.value = ''
    refStock.value = ''
    refMarca.value = ''
    refCategoria.value = ''
    refDetalles.value = ''
    refDescripcionCorta.value = ''
    refDescripcionLarga.value = ''
    refEdadDesde.value = ''
    refEdadHasta.value = ''
    refFoto.value = ''
    refEnvio.checked = false
}

function representarTablaProductos() {
    let filasTabla = ''

    if(productos.length) {
        filasTabla += `
            <tr>
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
            </tr>        
        `

        for(let producto of productos) {
            filasTabla += `
                <tr>
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
                </tr>        
            `
        }
    }
    else {
        filasTabla += '<h2>No se encontraron productos para mostrar</h2>'
    }

    document.querySelector('table').innerHTML = filasTabla
}


async function startAlta() {
    console.warn('startAlta')

    productos = await getAll()
    console.log (productos)

    representarTablaProductos()
}