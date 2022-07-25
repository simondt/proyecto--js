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
        this. precio *= (codigo == "25OFF") ? 0.75 : 1 // aplica un codigo de descuento segun lo ingresado
    }
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
    const disponibles = autos.filter(auto => (auto.marca.includes(inputBusq) || auto.precio.toString().includes(inputBusq) || auto.modelo.toString().includes(inputBusq)))
    return disponibles
} // funcion que recibe una marca, modelo o precio y devuelve un array con los elementos que coincidan.

function mostrarAutos(autos, carrito){
    const divAutos = document.getElementById('divAutos')
    const botonCarrito = document.getElementById('botonCarrito')
    divAutos.innerHTML = ""
    if (autos.length > 0){
        autos.forEach(auto =>{
            divAutos.innerHTML +=
            `
                <div class="styleAutos" id="autoID${auto.id}">
                    <p>Marca: ${auto.marca}</p>
                    <p>Modelo: ${auto.modelo}</p>
                    <p>Precio: ${auto.precio}</p>
                    <img class="fotoAuto" src="./imgs/${auto.marca}${auto.modelo}.jpg" alt="foto ${auto.marca}${auto.modelo}">
                    <p><button id="botonAgregar${auto.id}" class="styleAgregar">Agregar al carrito</button></p>
                </div> 
            `
        })
        autos.forEach(auto =>{
            const botonAgregar = document.getElementById(`botonAgregar${auto.id}`)
            botonAgregar.addEventListener('click', () => {
                carrito.push(auto)
                localStorage.setItem('itemsCarrito', JSON.stringify(carrito)) // guarda en localStorage los items del carrito
                botonCarrito.innerHTML = `Carrito (${carrito.length})`
                divAutos.innerHTML =
                `
                <p class='success'>El auto ${auto.marca} modelo ${auto.modelo} con un valor de ${auto.precio} pesos ha sido agregado al carrito</p>
                `

            })
        })
    }else divAutos.innerHTML = `<p class="error">No se han encontrado autos según el criterio de búsqueda</p>`
} // funcion que recibe un array de autos y los inserta en el codigo HTML

function mostrarCarrito (carrito){
    const divAutos = document.getElementById('divAutos')
    divAutos.innerHTML = `<div id="divCarrito"></div>`
    const divCarrito = document.getElementById('divCarrito')
    let total = 0
    if(carrito.length > 0){
        carrito.forEach(auto =>{
            divCarrito.innerHTML +=
            `
                <div class="styleCarrito" id="carritoID${carrito.indexOf(auto)}">
                    <p>Marca: ${auto.marca}</p>
                    <p>Modelo: ${auto.modelo}</p>
                    <p>Precio: ${auto.precio}</p>
                    <img class="fotoAuto" src="./imgs/${auto.marca}${auto.modelo}.jpg" alt="foto ${auto.marca}${auto.modelo}">
                </div> 
            `
            let {precio} = auto // desestructura el objeto
            total += precio ?? 0 // evita errores en la carga de datos
        })
        divCarrito.innerHTML += 
        `
            <p>Total: $${total}</p>
            <p><button id="botonComprar">Realizar compra</button>
            <button id="botonLimpiar">Limpiar carrito</button></p>
        `
        const botonLimpiar = document.getElementById('botonLimpiar')
        botonLimpiar.addEventListener('click', () =>{
            carrito.length = 0
            localStorage.setItem('itemsCarrito', JSON.stringify(carrito))
            botonCarrito.innerHTML = `Carrito (${carrito.length})`
            mostrarCarrito(carrito)            
        })
        const botonCompra = document.getElementById('botonComprar')
        botonCompra.addEventListener('click', () => {
            divAutos.innerHTML =`<div id="divCompra">Detalle de tu orden: </div>`
            divCompra.innerHTML =`<p class='success'>Detalle de tu orden: </p>`
            carrito.forEach(auto =>{
                divCompra.innerHTML +=
                `
                    <div class="styleCompra">
                        <p>Marca: ${auto.marca}</p>
                        <p>Modelo: ${auto.modelo}</p>
                        <p>Precio: ${auto.precio}</p>
                        <img class="fotoAuto" src="./imgs/${auto.marca}${auto.modelo}.jpg" alt="foto ${auto.marca}${auto.modelo}">
                    </div> 
                `
            })
            divCompra.innerHTML += `<p class='success'>Total: $${total} </p>`
        })
    }else divAutos.innerHTML = `<p class="error">Su carrito se encuentra vacío</p>`
}

const inputBusq = document.getElementById('inputBusq')
const botonReset = document.getElementById('botonReset')
const botonCarrito = document.getElementById('botonCarrito')
const disponibles = structuredClone(autos)
const carrito = []

if(localStorage.getItem('itemsCarrito')){
    const carritoParse = JSON.parse(localStorage.getItem('itemsCarrito'))
    carritoParse.forEach(item => {carrito.push(item)})
    botonCarrito.innerHTML = `Carrito (${carrito.length})`
} // verifica si en localStorage hay datos guardados del carrito

mostrarAutos(disponibles, carrito)

inputBusq.addEventListener('input', (disponibles) => {
    let busqueda = document.getElementById('inputBusq').value.toLowerCase()
    disponibles = autosDisponibles(busqueda, autos)
    mostrarAutos(disponibles, carrito)
}) // realiza una busqueda por cada letra ingresada

botonReset.addEventListener('click', (disponibles) => {
    document.getElementById('inputBusq').value = ""
    disponibles = structuredClone(autos)
    mostrarAutos(disponibles, carrito)
}) // resetea el array de autos

botonCarrito.addEventListener('click', () =>{
    mostrarCarrito(carrito)
})
