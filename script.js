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

function autosDisponibles (inputBusq, autos){
    const disponibles = autos.filter(auto => (auto.marca == inputBusq || auto.precio == inputBusq || auto.modelo == inputBusq))
    return disponibles
} // funcion que recibe una marca, modelo o precio y devuelve un array con los elementos que coincidan.

function mostrarAutos(autos){
    const divAutos = document.getElementById('divAutos')
    divAutos.innerHTML = ""
    autos.forEach(auto =>{
        divAutos.innerHTML +=
        `
            <div class="styleAutos" id="autoID${auto.id}">
                <p>Marca: ${auto.marca}</p>
                <p>Modelo: ${auto.modelo}</p>
                <p>Precio: ${auto.precio}</p>
                <button id="botonCompra${auto.id}">Comprar</button>  
            </div> 
        `
    })
    autos.forEach(auto =>{
        const botonCompra = document.getElementById(`botonCompra${auto.id}`)
        botonCompra.addEventListener('click', () => {
            divAutos.innerHTML =
            `
            <p class='success'>Felicitaciones! Compraste el auto ${auto.marca} modelo ${auto.modelo}. Precio final: ${auto.precio}</p>
            `
            auto.disminuirStock()
        })
    })
} // funcion que recibe un array de autos y los inserta en el codigo HTML

const inputBusq = document.getElementById('inputBusq')
const botonReset = document.getElementById('botonReset')
const disponibles = autos.slice()
mostrarAutos(disponibles)

inputBusq.addEventListener('change', (disponibles) => {
    let busqueda = document.getElementById('inputBusq').value
    disponibles = autosDisponibles(busqueda, autos)
    mostrarAutos(disponibles)
})

botonReset.addEventListener('click', (disponibles) => {
    document.getElementById('inputBusq').value = ""
    disponibles = autos.slice()
    mostrarAutos(disponibles)
})