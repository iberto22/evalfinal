const { clear } = require('node:console');
const fs = require('node:fs')
//console.log(fs);

 texto = "Los hermanos sean unidos, esa es la ley primera"
 texto2 = "porque si entre ellos se pelean, los devoran los de ajuera"
// fs.writeFileSync("mi_texto.txt", texto)
// //fs.appendFileSync("mi_texto.txt", texto2)
// fs.appendFileSync("mi_texto.txt", "porque si entre ellos se pelean, los devoran los de ajuera")

// let contenido = fs.readFileSync("mi_texto.txt", "utf8")

fs.writeFile("mi-texto2.txt", texto2, (err) =>{
if (err) throw (err){
    console.log(err);
} else {
    console.log("texto correcto");
    console.log("Hemos temrinado");
}
})