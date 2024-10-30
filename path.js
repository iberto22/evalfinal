const path = require('node:path')
console.log(path.sep);

const rutaCSS = path.join ("proyecto1", "publis", "style.css")


console.log(path.basename(rutaCSS));//nombre del fichero
console.log(path.dirname(rutaCSS));//Ruta del fichero
console.log(path.parse(rutaCSS));//


