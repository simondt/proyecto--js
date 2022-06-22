// desafio 1

// calculadora de compras al exterior Argentina

const tasaCorreo = 500
const dolar = 200

function valor(precio, nroDeCompra){
    let total
    if (nroDeCompra>=12){
        total = (precio/2)*dolar + tasaCorreo
    }
    else{
        if (precio<=50){
            total = tasaCorreo
        }
        else{
            total = ((precio - 50)/2)*dolar + tasaCorreo 
        }
    }
    return total
}

let precio = parseFloat(prompt("Ingrese el precio del producto + envío en dólares"))
let nroDeCompra = parseInt(prompt("Ingrese el número de envíos que recibió en el año"))
alert("Deberá pagar "+valor(precio,nroDeCompra)+" pesos para recibir el envío.")