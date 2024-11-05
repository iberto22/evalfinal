// Carga de los módulos
const express = require('express')
const app = express()

// Módulo parar las rutas
const path = require('node:path')

// Obtener el numero del puerto
process.loadEnvFile()
const PORT = process.env.PORT

// Cargar los datos
const datos = require('../data/ebooks.json')
//Orden alfabetico
datos.sort((a, b) => a.autor_apellido.localeCompare(b.autor_apellido, "es-ES"))
console.log(datos);
// Indicar la ruta de los ficheros estáticos
app.use(express.static(path.join(__dirname, "../public")))

// Ruta Home = Raíz
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

// Ruta API Global
app.get("/api", (req, res) => {
    res.json(datos)
})

// Ruta para filtrar los autores por el apellido
app.get("/api/apellido/:apellido_buscado" , (req, res) => {
    const apellido = req.params.apellido_buscado.toLocaleLowerCase()
    const filtroAutor = datos.filter(autor => autor.autor_apellido.toLocaleLowerCase() == apellido)
   
    if (filtroAutor.length == 0) {
        return res.status(404).send("Cliente no encontrado")
    }
    res.json(filtroAutor)
})

// Ruta para filtrar por nombre y apellido
app.get("/api/nombre_apellido/:nombre_autor/:apellido_autor" , (req, res) => {
    const apellido = req.params.apellido_autor.toLocaleLowerCase()
    const nombre = req.params.nombre_autor.toLocaleLowerCase()
    const filtroAutores = datos.filter(cliente => cliente.autor_apellido.toLocaleLowerCase() == apellido && cliente.autor_nombre.toLocaleLowerCase() == nombre)
    
    if (filtroAutores.length == 0) {
        return res.status(404).send("Cliente no encontrado")
    }
    res.json(filtroAutores)
})

// Ruta para filtrar por nombre y por las primeras letras del apellido:

app.get("/api/nombre/:nombre", (req, res) => {
    const nombre = req.params.nombre.toLocaleLowerCase()
    const apellido = req.query.apellido
    // Si no se incluye el apellido valdrá undefined
    // mostraremos un filtro solo por el nombre
    if (apellido == undefined) {
        // Si no tenemos el apellido filtrar solo por el nombre
        const filtroAutores = datos.filter(autor => autor.autor_nombre.toLocaleLowerCase() == nombre)

        // Nos aseguramos que el array con los autores no esté vacío
        if (filtroAutores.length == 0) {
            return res.status(404).send("Autor no encontrado")
        }
        // Devolver el filtro solo por el nombre del autor
        return res.json(filtroAutores)   
        
        
    }

    

    // para saber cuantas letras tiene el apellido escrito por el usuario
    const letras = apellido.length

    const filtroAutores = datos.filter(autor => autor.autor_apellido.slice(0, letras).toLocaleLowerCase() == apellido && autor.autor_nombre.toLocaleLowerCase() == nombre)

    // Si no se encuentran coincidencias, mostrar un mensaje
    if (filtroAutores.length == 0) {
        return res.status(404).send("Autor no encontrado")
    }

    // Devolver los datos filtrados
    res.json(filtroAutores)

})

//Para poder filtrar por las ediciones
app.get("/api/edicion/:edicion", (req, res) => {
    const edicion = req.params.edicion.toLocaleLowerCase()


   

    const filtroEdicion = datos.flatMap(autor => autor.obras.filter(obras => obras.edicion == edicion ))

    if (filtroEdicion.length == 0) {
        return res.status(404).send(`No hay ediciones del año ${edicion}`)
    }

    // Devolver los datos filtrados
    res.json(filtroEdicion)
    
})



// Cargar la página 404
app.use((req, res) => res.status(404).sendFile(path.join(__dirname, "../public", "404.html")))


// Poner el puerto en escucha
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))