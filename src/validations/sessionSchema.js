import { object, string, ref } from "yup"

export const signupSchema = object().shape({
  email: string()
    .required("El email es obligatorio")
    .email("El email ingresado no es válido"),
  password: string() 
    .min(6, "La contraseña debe tener 6 o más caracteres")
    .required("La contraseña es obligatoria"),
  confirmPassword: string()
    .oneOf([ref("password"), null, ""], "Las contraseñas ingresadas no coinciden")
    .required("Falta confirmar la contraseña")
})

export const loginSchema = object().shape({
  email: string()
    .required("El email es obligatorio")
    .email("El email ingresado no es válido"),
  password: string() 
    .min(6, "La contraseña debe tener 6 o más caracteres")
    .required("La contraseña es obligatoria")
})