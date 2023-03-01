/** TU ALMACEN ONLINE - CARRITO DE COMPRAS */
//¿Qué funcionalidad debe tener un carrito de compras?

//1)Mostrar en el HTML de forma dinámica el stock de productos.
//2)Agregar productos al carrito
//3)Evitar la carga de productos repetidos en el carrito.
//4)Mostrar el carrito en el HTML de forma dinámica.
//5)Eliminar productos del carrito.
//6)Calcular el total de la compra.
//7)Vaciar carrito.
//8)Guardar el carrito en el localStorage.

//Dos puntos importante para el TP Final (que no hacemos hoy!!).
//Boton de finalizar compra!
//Cambiar las cantidades desde el carrito.


///////////////////////////////////////////////////////////////

class Producto {
    constructor(id, nombre, precio, img){
        this.id = id;
        this.nombre= nombre;
        this.precio=precio;
        this.img=img;
        this.cantidad= 1;

    }
}

const banco = new Producto(1, "Banco Plano/Inclinado",1000,"img/banco.jpg");
const barra = new Producto(2,"Barra",5000,"img/Barra2.jpg");
const colchoneta = new Producto(3,"Colchoneta",1000,"img/colchonetagym.jpg");
const coreback =new Producto(4,"Coreback",700,"img/Coreback.jpg");
const mancuerna = new Producto(5,"Mancuerna",600,"img/mancuerna.jpg");
const pelota = new Producto(6,"Pelota de Arena",5000,"img/pelotaare.jpg");
const pesaRusa = new Producto (7,"Pesa Rusa",5000,"img/pesa-rusa.jpg");
const ruedaAbdominal = new Producto(8,"Rueda Abdominal",2000,"img/ruedaAbdominal.jpg");

//Precios refereneciales.

//Crear un array con todo nuestro catálogo de productos

const productos = [banco,barra,colchoneta,coreback,mancuerna,pelota,pesaRusa,ruedaAbdominal];

console.log(productos);


// Creamos un array para el carrito

let carrito = [];

/*CARGAR CARRITO DESDE EL LOCALSTORAGE*/
//Si hay algo en el localStorage lo cargamos en el carrito, si no es porque esta vacio. 

if(localStorage.getItem("carrito")){
    carrito = JSON.parse(localStorage.getItem("carrito"));
}

//Modificamos el DOM mostrando los productos

const contenedorProductos = document.getElementById("contenedorProductos");


//Creamos una función para mostrar los productos. 

const mostrarProductos = () => {
    productos.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-sm-12");
        card.innerHTML = `
                        <div class ="card">
                            <img src = "${producto.img}" class = "card-img-top imgProductos" alt = "${producto.nombre}">
                            <div>
                                <h5> ${producto.nombre} </h5>
                                <p> ${producto.precio} </p>
                                <button class = "btn colorBoton" id="boton${producto.id}" > Agregar al Carrito </button>
                            </div>
                        </div>
                        `
        contenedorProductos.appendChild(card);

        //Agregar productos al carrito: 
        const boton = document.getElementById(`boton${producto.id}`);
        boton.addEventListener("click", () => {
            agregarAlCarrito(producto.id);
        })
    })
}

mostrarProductos();

//Creamos la función agregar al carrito: 

const agregarAlCarrito = (id) => {
    const productoEnCarrito = carrito.find(producto => producto.id === id);
    if(productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
        const producto = productos.find(producto => producto.id === id);
        carrito.push(producto);
    }
    calcularTotal();
    //Trabajamos con el localStorage: 
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

//Mostrar el carrito de compras:

const contenedorCarrito = document.getElementById("contenedorCarrito");
const verCarrito = document.getElementById("verCarrito");

verCarrito.addEventListener("click", () => {
    mostrarCarrito();
})

const mostrarCarrito = () => {
    contenedorCarrito.innerHTML = "";
    carrito.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-sm-12");
        card.innerHTML = `
                        <div class ="card">
                            <img src = "${producto.img}" class = "card-img-top imgProductos" alt = "${producto.nombre}">
                            <div>
                                <h5> ${producto.nombre} </h5>
                                <p> ${producto.precio} </p>
                                <button class = "btn colorBoton" id="restar${producto.id}" > - </button>
                                <button class = "btn colorBoton" id="sumar${producto.id}" > + </button>
                                <p> ${producto.cantidad} </p>
                               
                                
                                
                                <button class = "btn colorBoton" id="eliminar${producto.id}" > Eliminar </button>
                                
                            </div>
                        </div>
                        `
        contenedorCarrito.appendChild(card);

        //Boton restar productos

        const botonRestar = document.getElementById(`restar${producto.id}`);
        botonRestar.addEventListener("click", () => {
            if(producto.cantidad !== 1){
                producto.cantidad--;
            }
            mostrarCarrito();
        })

        //Boton sumar productos

        const botonSumar = document.getElementById(`sumar${producto.id}`);
        botonSumar.addEventListener("click", () => {
            
            producto.cantidad ++;          
            mostrarCarrito();
        })

     

        //Eliminamos productos desde el carrito: 
        const boton = document.getElementById(`eliminar${producto.id}`);
        boton.addEventListener("click", () => {
            eliminarDelCarrito(producto.id);
        })

      
    })
   
    
    
    calcularTotal();
}

//Funcion que elimina el producto del carrito:

const eliminarDelCarrito = (id) => {
    const producto = carrito.find(producto => producto.id === id);
    const indice = carrito.indexOf(producto);
    carrito.splice(indice, 1);
    mostrarCarrito();

    //Trabajamos con el localStorage:
    localStorage.setItem("carrito", JSON.stringify(carrito));
}


//Mostramos el total de la compra: 

const total = document.getElementById("total");

const calcularTotal = () => {
    let totalCompra = 0; 
    carrito.forEach(producto => {
        totalCompra += producto.precio * producto.cantidad;
        //+= es igual a poner totalComra = totalCompra + producto.precio * producto.cantidad 
    })
    total.innerHTML = `Total: $${totalCompra}`;
}

//Vaciar todo el carrito: 

const vaciarCarrito = document.getElementById("vaciarCarrito");

vaciarCarrito.addEventListener("click", () => {
    eliminarTodoElCarrito();
})

const eliminarTodoElCarrito = () => {
    carrito = []; 
    mostrarCarrito();

    //LocalStorage:
    localStorage.clear();
}

//El boton de "finalizarCompra" aun no esta bien realizado, puse un "alert" como para tener algo. 

const finalizarCompra = document.getElementById("finalizarCompra");

finalizarCompra.addEventListener("click",() => {
    finalizarlaCompra();

})

const finalizarlaCompra = () =>{
    alert("¡Su compra ha finalizado!");

}

