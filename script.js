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
} // funcion que recibe una marca, modelo o precio y devuelve un array con los objetos que coincidan.

function mostrarAutos(autos, carrito){ // funcion que recibe un array de autos y los inserta en el codigo HTML
    const divAutos = document.getElementById('divAutos')
    const botonCarrito = document.getElementById('botonCarrito')
    divAutos.innerHTML = `<ul id="divInicio"></ul>`
    const divInicio = document.getElementById('divInicio')
    if (autos.length > 0){
        autos.forEach(auto =>{
            divInicio.innerHTML +=
            `
                <li class="styleAutos" id="autoID${auto.id}">
                    <p>Marca: ${auto.marca}</p>
                    <p>Modelo: ${auto.modelo}</p>
                    <p>Precio: US$${auto.precio}</p>
                    <img class="fotoAuto" src="./imgs/${auto.marca}${auto.modelo}.jpg" alt="foto ${auto.marca}${auto.modelo}">
                    <p><button id="botonAgregar${auto.id}" class="styleAgregar"><i class="bi bi-cart"></i> Agregar</button></p>
                </li> 
            `
        })
        autos.forEach(auto =>{
            const botonAgregar = document.getElementById(`botonAgregar${auto.id}`)
            botonAgregar.addEventListener('click', () => {
                carrito.push(auto) // agrega autos al array del carrito
                localStorage.setItem('itemsCarrito', JSON.stringify(carrito)) // guarda en localStorage los items del carrito
                botonCarrito.innerHTML = `<i class="bi bi-cart"></i> (${carrito.length})`
                Toastify({
                    text: "El auto ha sido agregado al carrito",
                    duration: 3000,
                    newWindow: true,
                    close: false,
                    gravity: "bottom", 
                    position: "right", 
                    stopOnFocus: true, 
                    style: {
                      background: "linear-gradient(to left, #dce35b, #45b649)",
                      color: "black"
                    },
                    onClick: function(){ // hacer click en el toast te lleva al carrito
                        mostrarCarrito()
                    } 
                  }).showToast();
            })
        })
    }else divInicio.innerHTML = `<p class="error">No se han encontrado autos según el criterio de búsqueda</p>`
} 

const mostrarCarrito = () => {
    if(carrito.length > 0){
        const divAutos = document.getElementById('divAutos')
        divAutos.innerHTML = 
            `
                <table id="divCarrito">
                    <tr id="cabecera" class="styleCarrito">
                        <th><i class="bi bi-camera"></i></th>
                        <th>Producto</th>
                        <th>Precio</th>
                    </tr>
                </table>
            `
        const divCarrito = document.getElementById('divCarrito')
        let total = 0
        carrito.forEach(auto =>{
            divCarrito.innerHTML +=
            `
                <tr class="styleCarrito" id="carritoID${carrito.indexOf(auto)}">
                    <td><img class="fotoAutoCarrito" src="./imgs/${auto.marca}${auto.modelo}.jpg" alt="foto ${auto.marca}${auto.modelo}"></td>
                    <td>${auto.marca} ${auto.modelo}</td>
                    <td>US$${auto.precio}</td>
                </tr>               

            ` // todas las imagenes deben tener el formato de "marcaModelo.jpg" para ser reconocidas por el codigo
            let {precio} = auto // desestructura el objeto
            total += precio ?? 0 // evita errores en la carga de datos
        })
        divAutos.innerHTML += 
        `
            <div id="contenedorOpciones">
                <div id="opcionesCarrito">
                    <p class="styleTotal">Total: US$${total}</p>
                    <p><button class="boton" id="botonComprar">Realizar compra</button>
                    <button id="botonLimpiar"><i class="bi bi-trash"></i></button></p>
                </div>
            </div>
        `
        const botonLimpiar = document.getElementById('botonLimpiar')
        // presionar el boton limpiar ejecuta un modal requiriendo la confirmación del usuario
        botonLimpiar.addEventListener('click', () => {
            Swal.fire({
                title: '¿Desea limipiar el carrito?',
                text: "Se eliminaran todos los ítems",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'Cancelar',
                confirmButtonText: 'Limpiar'
            }).then((result) => {
                if (result.isConfirmed) {
                    carrito.length = 0
                    localStorage.setItem('itemsCarrito', JSON.stringify(carrito))
                    botonCarrito.innerHTML = `<i class="bi bi-cart"></i> (${carrito.length})`
                    mostrarAutos(disponibles, carrito)
                    Toastify({ // muestra una notificacion toast
                        text: "Se han eliminado todos los ítems del carrito",
                        duration: 3000,
                        newWindow: true,
                        close: false,
                        gravity: "bottom",
                        position: "right",
                        stopOnFocus: false,
                        style: {
                            background: "#01161E",
                        },
                        onClick: function () { }
                    }).showToast();
                }
            })
        })
        const botonCompra = document.getElementById('botonComprar')
        // ejecuta modal al hacer click en el boton de compra
        botonCompra.addEventListener('click', () => {
            carrito.forEach(auto => autos[auto.id].disminuirStock()) // disminuye en uno el stock del array original de autos
            Swal.fire({
                title: 'Felicitaciones!',
                text: "La compra ha sido realizada con éxito",
                icon: 'success',
                showCancelButton: true,
                confirmButtonColor: '#01161E',
                cancelButtonColor: '#598392',
                cancelButtonText: 'Volver al inicio',
                confirmButtonText: 'Ver detalle'
            }).then((result) => {
                if (result.isConfirmed) {
                    divAutos.innerHTML = 
                    `
                        <table id="divCompra">
                            <tr>
                                <th><h2>Resumen de tu compra:</h2></th>
                            </tr>
                            <tr id="cabecera" class="styleCarrito">
                                <th><i class="bi bi-camera"></i></th>
                                <th>Producto</th>
                                <th>Precio</th>
                            </tr>
                        </table>
                    `
                    const divCompra = document.getElementById('divCompra')
                    carrito.forEach(auto => {
                        divCompra.innerHTML +=
                        `
                            <tr class="styleCarrito">
                                <td><img class="fotoAutoCarrito" src="./imgs/${auto.marca}${auto.modelo}.jpg" alt="foto ${auto.marca}${auto.modelo}"></td>
                                <td>${auto.marca} ${auto.modelo}</td>
                                <td>US$${auto.precio}</td>
                            </tr>    
                        ` 
                    })
                    divCompra.innerHTML += `<p class='styleTotal'>Total: $${total} </p>`
                } else mostrarAutos(disponibles)
            }
            )
        })
    }else { // si el carrito está vacio, ejecuta un toast
        Toastify({
            text: "El carrito se encuentra vacío",
            duration: 3000,
            newWindow: true,
            close: false,
            gravity: "bottom", 
            position: "right", 
            stopOnFocus: false, 
            style: {
                background: " linear-gradient(to bottom, #8e9eab, #eef2f3)",
                color: "black"
            },
            onClick: function () { } 
        }).showToast();
    }
}

const inputBusq = document.getElementById('inputBusq')
const botonReset = document.getElementById('botonReset')
const botonCarrito = document.getElementById('botonCarrito')
const disponibles = structuredClone(autos)
const carrito = []

if(localStorage.getItem('itemsCarrito')){
    const carritoParse = JSON.parse(localStorage.getItem('itemsCarrito'))
    carritoParse.forEach(item => {carrito.push(item)})
    botonCarrito.innerHTML = `<i class="bi bi-cart"></i> (${carrito.length})`
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
    mostrarCarrito()
}) // muestra el carrito

const divisa = document.getElementById('divisa')
fetch('https://criptoya.com/api/dolar') // api de criptoya
.then(response => response.json()) // convierto la promesa en un json
.then(({solidario}) => {
    divisa.innerHTML = `Cotización actual: 1US$ = $${solidario}`
})

setInterval(() => {
    fetch('https://criptoya.com/api/dolar')
        .then(response => response.json()) // convierto la promesa en un json
        .then(({solidario}) => {
            divisa.innerHTML = `Cotización actual: 1US$ = $${solidario}`
        })
}, 300000) //300mil ms = 5 minutos