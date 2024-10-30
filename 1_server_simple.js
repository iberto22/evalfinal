//HTTP
const http = require ('node:http');
//const PUERTO = 3000

process.loadEnvFile()
console.log(process.env.PUERTO)
const PUERTO = process.env.PUERTO
//console.log(http);




const server = http.createServer((req,res) => {
    console.log(res.statusCode);
    if (res.statusCode === 200) {
res.writeHead(200, {'Content-Type' : 'text/HTML'})
    res.write("<h1>Todo ok, estamos en la raiz del proyecto</h1>") // para escribir lo que uno quiere como respuesta
    res.end()   
}
    else if (res.statusCode === 404) {
        res.writeHead(200, {'Content-Type' : 'text/HTML'})
            res.write("<h1>Error</h1>") // para escribir lo que uno quiere como respuesta
            res.end()    
        }
    res.end()
})
server.listen(PUERTO, () =>{
    console.log(`Servidor iniciado en el puerto: ${PUERTO }`);
})