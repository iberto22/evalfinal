// Regentamos una pizzeria que ofrece pizzas a gusto del consumidor.

// Por tanto necesitamos un menú para que elija:

// 1) el tipo de masa: solo puede elejir uno

// 2) los ingredientes: puede elegir cualquiera de ellos, incluso  más de uno, pero solo una vez cada uno.

// cada ingrediente debe mostrar su precio incrementado un 20% de beneficio + 25% gastos diversos, todo ello por un 4% de IVA
// (estos porcentajes no los ve el cliente) 

// Al final aparece el contenido del pedido y el precio total.
// Se guarda la información en el fichero pedido.txt

// El ejercicio se entrega así:
// node_tu_nombre_pizzerria.zip
console.log("Elige un tipo de masa de pizza \n 1.Normal \t 2.Espelta \t 3.Integral \n Elige los ingtredientes. Puedes elegir tantos ingredientes como queiras, pero solo una vez \n 1-mozzarella 2-4quesos 3-salsa 4-pollo 5-anchoas 6-aceitunas")
 let ingredientes = process.argv[2]
let condimentos = process.argv[3]
console.log(ingredientes);
