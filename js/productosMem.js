/* ......................................... */
/*          Importacion                      */
/* .......................................... */


let productos = []

const setAll = prods => productos = prods
const getAll = ()=> productos

const guardar = prod => productos.push(prod)

/* ......................................... */
/*          Exportacion                      */
/* .......................................... */
 export default {
  setAll,
  getAll,
  guardar
 }