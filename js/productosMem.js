
/* ------------------------------------------ */
/*                importación                 */
/* ------------------------------------------ */
let productos = [];

const setAll = prods => productos = prods
const getAll = () => productos
const get = id => productos.find(p => p.id == id)

const guardar = prod => productos.push(prod)

const actualizar = (id, prod) => {
  const index = productos.findIndex(p => p.id == id)
  productos.splice(index, 1, prod)
}

const eliminar = id => {
  const index = productos.findIndex(p => p.id == id)
  productos.splice(index, 1)
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
  eliminar
}