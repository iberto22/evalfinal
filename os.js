import { cpus, freemem } from 'os';

 //mostrar cpus del equipo
 console.table(cpus());
// console.table(os.freemem());
// console.log(os.hostname())
// console.log(os.release())
// console.log(os.userInfo())
console.log((freemem()/1024/1024/1024).toFixed(2));