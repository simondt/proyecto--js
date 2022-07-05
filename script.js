class Auto{
    constructor(id, modelo, marca, precio, stock){
        this.id = id
        this.modelo = modelo
        this.marca = marca
        this.precio = precio
        this.stock = stock
    }

    disminuirStock(){
        this.stock -= 1
    } // disminuye en uno el stock del auto

    descuento(codigo){
        if(codigo == "25OFF"){
            this.precio *= 0.75
        }else if(codigo == "50OFF"){
            this.precio *= 0.5
        }else this.precio *= 1 
    } // aplica un codigo de descuento segun lo ingresado
}

const auto1 = new Auto(0, 1987, "toyota", 19000, 12)
const auto2 = new Auto(1, 2007, "ford", 15000, 7)
const auto3 = new Auto(2, 2002, "chevrolet", 14000, 18)
const auto4 = new Auto(3, 2013, "nissan", 20000, 5)
const auto5 = new Auto(4, 1998, "citroen", 17000, 11)
const auto6 = new Auto(5, 1983, "toyota", 23000, 15)
const auto7 = new Auto(6, 2009, "chevrolet", 12000, 11)
const auto8 = new Auto(7, 2007, "chevrolet", 13000, 19)
const auto9 = new Auto(8, 2018, "nissan", 40000, 7)

const autos = [auto1, auto2, auto3, auto4, auto5, auto6, auto7, auto8, auto9]

function autosDisponibles (marca, precioMax, autos){
    let disponibles = autos.filter(auto => (auto.marca == marca && auto.precio <= precioMax))
    return disponibles
} // funcion que recibe una marca y un precio y devuelve un array con los autos disponibles.

let marca = prompt("ingrese la marca del auto que desea").toLowerCase()
let precioMax = parseFloat(prompt("ingrese el precio maximo que está dispuesto a pagar"))

const disponibles = autosDisponibles(marca, precioMax, autos)

if(disponibles.length > 0){
    console.log(`Hay ${disponibles.length} autos disponibles de la marca ${marca} con un valor máximo de ${precioMax}, detallados a continuación: `)
    console.table(disponibles)
    let idElegido 
    do{
        idElegido = parseInt(prompt("Ingrese el ID del auto que desea comprar. Ingrese 99 para cancelar la compra."))
    } while (!(disponibles.some(auto => auto.id == idElegido) || idElegido == 99)); // verifica si el id del auto esta dentro de los disponibles
    if(!(idElegido==99)){
        const comprado = disponibles.find(auto => auto.id == idElegido) // encuentra el auto segun el id ingresado
        comprado.descuento(prompt("ingrese un codigo de descuento o cualquier numero en caso de no tener ninguno"))
        console.log(`Felicitaciones! Compraste el auto ${comprado.marca} modelo ${comprado.modelo}. Precio final: ${comprado.precio}`)
        autos[idElegido].disminuirStock()
    } else {console.log("No ha comprado ningun auto.")}
} else console.log("No hay autos disponibles según los datos especificados.")

