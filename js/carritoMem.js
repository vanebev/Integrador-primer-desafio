
/* ------------------------------------------ */
/*                importación                 */
/* ------------------------------------------ */
let carrito = [];

const setAll = prods => carrito = prods
const getAll = () => carrito
const get = id => carrito.find(p => p.id == id)

const guardar = prod => carrito.push(prod)

const actualizar = (id, prod) => {
  const index = carrito.findIndex(p => p.id == id)
  carrito.splice(index, 1, prod)
}

const eliminar = id => {
  const index = carrito.findIndex(p => p.id == id)
  carrito.splice(index, 1)
}

const clearAll = ()=>{
  carrito = []
}

/* ------------------------------------------ */
/*                exportación                 */
/* ------------------------------------------ */
export default {
  setAll,
  getAll,
  get,
  guardar,
  actualizar,
  eliminar,
  clearAll
}