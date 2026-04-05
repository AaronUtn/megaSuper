
export const Categoria = Object.freeze({
    DULCES: "DULCES",
    HERRAMIENTAS: "HERRMAIENTAS",
    GASEOSAS: "GASEOSA",
    AGUA: "AGUA",
    SNACK: "SNACK",
    GALLETAS: "GALLETAS",
    INFUSIONES: "INFUSIONES",
    ROPA: "ROPA",
    ASEOPERSONAL: "ASEO",
    LIMPIEZA: "LIMPIEZA",
    EMBUTIDOS: "EMBUTIDOS",
    QUESOS: "QUESOS",
    LACTEOS: "LACTEOS"

});

export function normalizarCategoria(input){
    return input.trim().toUpperCase()
        .normalize("NFD").replace(/[u0300 - \u036f]/g, "");
} 
/*
*normalize separa letras de acentos á -> a + ´
*replace elimina acentos á -> a
 */

export function obtenerCategoriaValida(input){
    const normalizado = normalizarCategoria(input);

    if(!Object.values(Categoria).includes(normalizado)){
        throw new Error("Categoria invalida");
    }
    return normalizado;
}