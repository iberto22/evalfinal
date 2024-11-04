//carga de los modulos
const express = require('express')
const app = express()

// modulos para las rutas

const path = require('node:path')

//Obtener el numero del puerto

process.loadEnvFile()
const PORT = process.env.PORT

//Cargar los datos de clientes
const datos = require('../data/customer.json')

datos.sort((a, b) => a.surname.localeCompare(b.surname, "es-ES"))
console.log(datos);
app.use(express.static(path.join(__dirname, "../public")))
app.get("/", (req, res) => {
    //console.log("Estamos en /");
    res.sendFile(__dirname + "/index.html")
    })
    
 //Ruta API global
 app.get("/api", (req, res) => {
    res.json(datos)
 })   

//  Ruta para filtrar los apellidos

app.get("/api/apellido/:cliente_apellido", (req, res) => {
const apellido = req.params.cliente_apellido.toLocaleLowerCase()
//console.log(apellido);
const filtroClientes = datos.filter(cliente => cliente.surname.toLocaleLowerCase() == apellido)
console.log(filtroClientes);
if (filtroClientes.length == 0) {
   return res.status(404).send("Cliente no encontrado")
}
    res.json(filtroClientes)
})

//Ruta para buscar clientes por nombre y apellido: api/nombre_apellido/John/Bezzos

app.get("/api/nombre_apellido/:cliente_nombre/:cliente_apellido", (req, res) => {
const nombre = req.params.cliente_nombre.toLocaleLowerCase()
const apellido = req.params.cliente_apellido.toLocaleLowerCase()
const filtroClientes = datos.filter(cliente => cliente.surname.toLocaleLowerCase() == apellido && cliente.name.toLocaleLowerCase() == nombre)
console.log(filtroClientes);
if (filtroClientes.length == 0) {
   return res.status(404).send("Cliente no encontrado")
}
    res.json(filtroClientes)
});

//Filtrar por nombre y las primeras letras del apellido
// api/nombre/Maria?apellido=Jo
app.get("/api/nombre/:nombre", (req, res) => {
const nombre = req.params.nombre.toLocaleLowerCase()
const apellido = req.query.apellido
//Si no se incluye el apellido valdra undefined
//mostramos un filtro solo para el nombre
if (apellido == 'undefined') {
    const filtroClientes = datos.filter(cliente => cliente.name.toLocaleLowerCase() == nombre)
    
    if (filtroClientes.length == 0) {
        return res.status(404).send("Cliente no encontrado")
     }
         
    return res.json(filtroClientes)

}
})


const letras = apellido.length

const filtroClientes = datos.filter(cliente => cliente.surname.slice(0,letras).toLocaleLowerCase() == apellido 
&& cliente.name.toLocaleLowerCase() == nombre)

if (filtroClientes.length == 0) {
    return res.status(404).send("Cliente no encontrado")
 }
     
return res.json(filtroClientes)

//Filtrar por la marca del producto que ha comprado
//api/marca/marca

app.get("api/marca/marca", (req, res) => {
    
    const marca = req.params.marca
    const filtroMarca = datos.flatMap(cliente => cliente.compras.filter(compra => compra.marca == marca))
    
    if (filtroMarca.length == 0) {
        return res.status(404).send(`No se compro nada de esta ${marca}`)
     }
         
    return res.json(filtroMarca)
})


//Cargar la pagina 404
app.use((req,res) => res.status(404).sendFile(path.join(__dirname, "../public", "404.html")))
//app.use((req, res) => res.status(404).sendFile(path.join(__dirname, "../public","404.html")));

    
    
    
    app.listen(PORT, ()=> console.log(`Server running on http://localhost:${PORT}`));

