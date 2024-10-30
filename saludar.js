function saludar() {
    console.log(`Hola, ${nombre}!`);
}
let nombre = "ivan";
saludar()

let saludar2 = function (nombreusuario) {
    console.log(`Hola, ${nombreusuario}!`);
}
saludar2 ("chicos")

try{
saludar4("gente")
let saludar4 = (nombreUsuario) => console.log(`Hola, ${nombreUsuario}!`)
} catch (error) {
    console.log(error)
}