import { obtenerCategoriaValida } from "./utils";

export class Producto{
   
    nombre;
    categoria;
    precioBase;

    constructor(nombre,categoria, precio){
        if(categoria ===undefined){
            new Error("La categoria no puede ser un campo vacio");
        }
        this.categoria = categoria;
        this.nombre=nombre;
        this.precioBase=precio;
    }

    cambiarPrecio(nuevoPrecio){
        this.precioBase = nuevoPrecio;
    }


}

export class ItemCarrito{
    producto;
    cantidad;

    constructor (producto,cantidad){
        this.producto=producto;
        this.cantidad=cantidad;
        this.descuentos=[];
    }

    agregardescuento(descuento){
        this.descuentos.push(descuento);
    }

    precioBaseTotal(){
        return this.producto.precioBase*this.cantidad;
    }

    precioFinal(){
        const precioFinal = this.descuentos.reduce((precioAnterior,descuento)=>{
            return precioAnterior - descuento.valorDescontado(this);
        },this.precioBaseTotal);

        return Math.max(0,precioFinal);
    }
}

export class DescuentoFijo{
    constructor(valor){
        this.valor = valor;
    }
    valorDescontado(_itemCarrito){
        return this.valor;
    }
}

export class DescuentoPorcentaje{
    constructor(valor){
        if(valor === undefined){
            new Error("tiene que definir el valor");
        }else if(valor >0 && valor <=100){
            new Error("el porcentaje tiene que estar entre 1 y 100");
        }
        this.valor = valor;
    }
    valorDescontado(itemCarrito){
        const precioTotal = itemCarrito.precioBaseTotal;
        const descuento = valor/100;

        return precioTotal*descuento;

    }
}

export class DescuentoPorCantidad{
    constructor(cantidadALlevar, cantidadAPagar){
        this.cantidadALlevar = cantidadALlevar;
        this.cantidadAPagar = cantidadAPagar;
    }

    valorDescontado(itemCarrito){
        const productosGratis = Math.floor(itemCarrito.cantidad/this.cantidadALlevar);
        const descuentoObtenido = productosGratis*itemCarrito.producto.precioBase;
        return descuentoObtenido;
    }
}

export class Carrito{
    constructor(){
        this.itemsCarritos = [];
        this.precioTotal =0;
        this.precioSinDescuento =0;
    }

    agregarItem(itemCarrito){
        this.itemsCarritos.push(itemCarrito);
    }

    mostrarProductoDelCarrito(){
        this.itemsCarritos
        .map(ic => ic.Producto)
        .forEach(p => console.log(p));
    }

    /*
    productoMasCaro
    caso donde no tiene item entonces comparacion > 0 es false
    masCaro = null
    --
    caso donde tiene item entoces comparacion > 0 es true
    entra a la funcion ternaria donde usamos el reduce
    reduce max es la respuesta comienza con el item 0 de la lista
    compara con el segundo ternearia it precioBaseTotal > max precioBaseTotal 
    si it es mas caro reemplaza el valorde max
    si it es mas caro sigue quedandose con max
    */ 
    productoMasCaro(){
        const masCaro = this.itemsCarritos.length > 0
            ? this.itemsCarritos.reduce((max,it) => 
            it.precioBaseTotal > max.precioBaseTotal ? it : max, this.itemsCarritos[0]) 
         :null;

    }

    buscarPorCategoria(categoria){
        this.itemsCarritos
        .filter(it => it.producto.categoria === obtenerCategoriaValida(categoria));
    }

    obtenerProductoMenores(unMonto){
        this.itemsCarritos
        .filter(it => it.precioBaseTotal < unMonto);
    }

    /**
     * 
     * que hace sort (a,b) => a - b
     * esta funcion compara
     * si devuelve < 0 a va antes
     * si devuelve > 0 b va antes
     * si devuelve 0 queda igual
     */

    ordenarItemCarrito(){
        const ordenados = [...this.itemsCarritos].sort((itUno, itDos) => itUno.precioBaseTotal - itDos.precioBaseTotal);
        return ordenados;
    }
}