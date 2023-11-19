export const mostrartToast = (opciones, Toast) => {
    const { tipo, titulo, mensaje } = opciones;
    Toast.show({
        type: tipo,
        text1: titulo,
        text2: mensaje,
    })
}