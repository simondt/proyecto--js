class Auto{
    constructor(modelo, marca, precio, stock){
        this.modelo = modelo
        this.marca = marca
        this.precio = precio
        this.stock = stock
    }
}

const auto1 = new Auto(1987, "toyota", 19000, 12)
const auto2 = new Auto(2007, "ford", 15000, 7)
const auto3 = new Auto(2002, "chevrolet", 14000, 18)
const auto4 = new Auto(2013, "nissan", 20000, 5)
const auto5 = new Auto(1998, "citroen", 17000, 11)
const auto6 = new Auto(1983, "toyota", 23000, 15)
const auto7 = new Auto(2009, "chevrolet", 12000, 11)
const auto8 = new Auto(2007, "chevrolet", 13000, 19)

const autos = [auto1, auto2, auto3, auto4, auto5, auto6, auto7, auto8]

function autosDisponibles (marca, autos){
    let disponibles = []
    for(let arrayAutos of autos){
        if(arrayAutos.marca == marca){
            disponibles.push(arrayAutos)
        }
    }
    return disponibles
} // funcion que recibe una marca y devuelve un array con los autos disponibles de la misma.

let marca = prompt("ingrese la marca del auto").toLowerCase()
const disponibles = autosDisponibles(marca, autos)
if(disponibles.length > 0){
    console.log(`Hay ${disponibles.length} autos disponibles de la marca ${marca}, detallados a continuación: `)
    console.table(disponibles)
} else console.log("No hay autos disponibles de la marca")

