# La Marea Creciente

Landing de asesorías de matemáticas y física, con blog de divulgación. Es un sitio estático: no hay que instalar nada ni correr ningún build. Son archivos HTML, CSS y JS.

## Estructura

```
index.html            Landing
css/site.css          Estilos de todo el sitio
js/site.js            Scripts compartidos y número de WhatsApp
blog/index.html       Lista de artículos
blog/posts.js         Registro de artículos (aquí se dan de alta)
blog/plantilla.html   Plantilla para artículos nuevos
blog/posts/           Un .html por artículo
blog/img/             Imágenes de los artículos
```

## Cambiar el número de WhatsApp

Está en un solo lugar: la primera línea de `js/site.js` (`var WHATSAPP`). Formato: `52` + 10 dígitos, sin espacios ni `+`. Ejemplo: `525512345678`.

Mientras diga `52XXXXXXXXXX`, los botones abren WhatsApp sin número.

## Subir un artículo nuevo

1. Copia `blog/plantilla.html` a `blog/posts/` con un nombre sin espacios ni acentos, por ejemplo `blog/posts/integral-de-gauss.html`.
2. Escribe el texto dentro de `<div class="body"> ... </div>`.
3. Agrega una entrada en `blog/posts.js`:

```js
{
  archivo: "posts/integral-de-gauss.html",
  titulo: "La integral de Gauss",
  fecha: "2026-11-15",
  autor: "Isidro",
  resumen: "Una o dos frases para la tarjeta.",
  etiquetas: ["cálculo"]
}
```

El título, la fecha, el autor, el tiempo de lectura y el botón de WhatsApp del final salen solos de `posts.js`. Los artículos se ordenan por fecha, y los tres más recientes aparecen en la portada.

Para escribir sin publicar todavía, agrega `borrador: true` a la entrada. No sale en las listas, pero la página abre si tienes el link. Quítalo cuando esté listo.

### Fórmulas

Se escriben en LaTeX (con KaTeX):

- En línea: `\( x^2 + 1 \)`
- Destacada: `\[ \int_0^1 x\,dx = \tfrac{1}{2} \]`

Usa `\( \)` y no `$ $` para que un precio como "$500" no se confunda con matemáticas.

### Imágenes

Guárdalas en `blog/img/` y úsalas así dentro del artículo:

```html
<figure>
  <img src="../img/mi-imagen.png" alt="Describe la imagen">
  <figcaption>Pie opcional.</figcaption>
</figure>
```

### Formato básico

`<p>` párrafo, `<h2>` y `<h3>` subtítulos, `<blockquote>` cita, `<a href="...">` enlace, `<ul><li>` lista, `<code>` código.

## Verlo en tu compu

Abre `index.html` con doble clic y funciona. Si prefieres un servidor local:

```
python -m http.server 8000
```

y entra a `http://localhost:8000`.

## Publicarlo con GitHub Pages

1. Sube los cambios: `git add .`, `git commit -m "mensaje"`, `git push`.
2. En el repo de GitHub, entra a Settings → Pages y elige la rama `main`, carpeta `/ (root)`.
3. Los artículos nuevos aparecen unos minutos después de cada `push`.
