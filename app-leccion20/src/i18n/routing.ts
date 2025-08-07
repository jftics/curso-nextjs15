import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
    // Lista de idiomas soportados
    locales:['es','en','fr'],

    // Idioma por defecto
    defaultLocale: 'es',

    // Estrategia de detección de idioma
    localeDetection: true,

    // Prefijo de idioma en las URLs
    localePrefix:'as-needed'//'always' // /en/about 

})