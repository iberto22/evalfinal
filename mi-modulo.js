//Funcion que corrige mayusculas y minusculas

function corregirNombre(nombre){
    let arrayNombre = nombre.split(" ");
    for (let i = 0; i < arrayNombre.length; i++) {
    nombre = nombre.at(0).toLocaleUpperCase() + nombre.slice(1).toLocaleLowerCase();
    console.log(nombre);
    }
    return arrayNombre.join(" ");
}
corregirNombre("enrique")

module.exports = corregirNombre;