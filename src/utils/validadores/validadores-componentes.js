export const validarValorItemsPedido = (valor) => {
    if(valor === '') return valor
    let parts = valor.split('.');
    if (parts.length > 2) {
        valor = parts[0] + '.' + parts.slice(1).join('').replace(/\./g, '');
    }
    const valorParseado = valor.trim().replace(/,/g, '.');
    if(!valorParseado.endsWith('.')) {
    if (isNaN(valorParseado)) {
        throw 'debe ingresar un número';
    } else
     if (valorParseado < 0) {
        throw 'el valor debe ser mayor a 0';
    }
    const cantDecimales= (valorParseado.toString().split('.')[1] || '').length;
    if(cantDecimales > 2) return (parseFloat(valorParseado).toFixed(2)).toString()
    return valorParseado
  }else return valorParseado
};

export const validarComprador = (comprador) => {
    const max = 100
    // Verificar si el dato ingresado es una cadena (string)
  if (typeof comprador !== 'string') {
    throw new Error('Debe ingresar una cadena de caracteres');
  }

  // Verificar que la cadena no tenga más de 100 caracteres
  if (comprador.length > max) {
    throw new Error(`El nombre no puede exeder los ${max} caracteres`);
  }
  // La cadena es válida (es una cadena y no supera los 100 caracteres)
  return true;
}