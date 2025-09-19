const url = 'https://68c49c4981ff90c8e61ca717.mockapi.io/api/productosIntegrador'

const getAll = async ()=>  await fetch(url).then(r => r.json())
const guardar = async prod => await fetch(url, {
      method: 'POST',
      body: JSON.stringify(prod),
      headers: { 'content-type' : 'application/json'}
}).then(r => r.json())

/* async function pedir(){
console.log (await getAll())
}

pedir() */