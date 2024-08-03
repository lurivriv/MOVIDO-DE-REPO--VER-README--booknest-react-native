import { object, string, array, number } from "yup"

const isValidSpotifyLink = (link) => /^https:\/\/open\.spotify\.com\/.+$/.test(link)
const isValidPinterestLink = (link) => /^https:\/\/pin\.it\/.+$/.test(link)

export const bookSchema = object().shape({
  starRating: number()
    .min(1, "La calificación por estrellas es obligatoria")
    .required("La calificación por estrellas es obligatoria"),
  title: string()
    .required("El título es obligatorio"),
  author: string()
    .required("El autor es obligatorio"),
  readingFormat: string()
    .required("El formato es obligatorio"),
  genres: array()
    .of(string())
    .min(1, "Se requiere mínimo 1 género")
    .required("Debes ingresar al menos 1 género"),
  chapters: number()
    .nullable()
    .transform((value, originalValue) => originalValue === "" ? null : value)
    .typeError("Debes ingresar solo números")
    .min(1, "El mínimo de capítulos es 1"),
  pages: number()
    .nullable()
    .transform((value, originalValue) => originalValue === "" ? null : value)
    .typeError("Debes ingresar solo números")
    .min(1, "El mínimo de páginas es 1"),
  spotifyLink: string()
    .nullable()
    .test("is-valid-spotify-link", "El link de Spotify no es válido", value => !value || isValidSpotifyLink(value)),
  pinterestLink: string()
    .nullable()
    .test("is-valid-pinterest-link", "El link de Pinterest no es válido", value => !value || isValidPinterestLink(value))
})