/* ......................................... */
/*          Importacion                      */
/* .......................................... */


let productos = []

const setAll = prods => productos = prods
const getAll = ()=> productos

const guardar = prod => productos.push(prod)

const eliminar = id => {
    
       const index = productos.findIndex(p => p.id == id)
  productos.splice(index, 1)
}




/* ......................................... */
/*          Exportacion                      */
/* .......................................... */
 export default {
  setAll,
  getAll,
  guardar,
  eliminar
 }