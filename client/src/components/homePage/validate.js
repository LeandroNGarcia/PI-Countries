export const isName = (string) => {
  const regex = /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ]+(?:\s[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ]+)*$/;
  if(!string) return "La casilla no puede estar vacia"
  if (string.split("")[0] !== string.split("")[0].toUpperCase())
    return "El nombre debe comenzar con mayuscula";
  if (!regex.test(string))
    return "El nombre solo puede contener letras y no mas de un espacio consecutivo";
};

export const isDificult = (number) => {
    number = Number(number)
    if(number <= 0) return "El numero no puede ser menor o igual a cero"
    if(number > 5) return "El numero no puede ser mayor a cinco"
}

export const isDuration = (number) => {
    number = Number(number)
    if(number < 0) return "El tiempo no puede ser menor a cero"
    if(number > 36) return "El tiempo no puede ser mayor a 36 horas"
}