let inicio, fin

do{
    inicio = parseFloat(prompt("Ingrese el numero de inicio"))
    fin = parseFloat(prompt("Ingrese el numero final"))
} while ((isNaN(inicio) || isNaN(fin)))

let pares = 0

for(let i=inicio; i<=fin; i++){
    if (i%2==0){pares++}
}

console.log("Desde el "+inicio+" al "+fin+" hay un total de "+pares+" números pares.")