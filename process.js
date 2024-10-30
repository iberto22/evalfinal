//console.log(process.argv);

let num1 = process.argv[2]
let num2 = process.argv[3]
let num3 = process.argv[4]
let resultado = 0
while (num2 <= num3){
    resultado = num2 * num1
    console.log(`${num1} * ${num2} = ${resultado}`)
    num2 ++;
}

