/* ......................................... */
/*          Importacion                      */
/* .......................................... */


const url = 'https://68c49c4981ff90c8e61ca717.mockapi.io/api/productosIntegrador'

const getAll =  ()=> fetch(url).then(r => r.json())
const guardar =  prod =>  fetch(url, {
      method: 'POST',
      body: JSON.stringify(prod),
      headers: { 'content-type' : 'application/json'}
}).then(r => r.json())

/* async function pedir(){
console.log (await getAll())
}

pedir() */

/* ......................................... */
/*          Exportacion                      */
/* .......................................... */

export default{
    getAll,
    guardar
}