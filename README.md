# Marea Creciente

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
blog/img/<articulo>/   Imágenes (una carpeta por artículo)
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

Una carpeta por artículo, con el mismo nombre que el archivo del artículo (sin `.html`):

```
blog/
  posts/
    alexander-grothendieck.html
    por-que-0-999-es-1.html
  img/
    grothendieck/
      retrato.jpg
      esquema.png
    por-que-0-999-es-1/
      recta.svg
```

Dentro del artículo se usan así (la ruta siempre empieza con `../img/`):

```html
<figure>
  <img src="../img/grothendieck/retrato.jpg" alt="Alexander Grothendieck">
  <figcaption>Crédito y licencia de la foto.</figcaption>
</figure>
```

Consejos:
- Nombres sin espacios, acentos ni mayúsculas (`mi-grafica.png`, no `Mi Gráfica.PNG`). GitHub Pages distingue mayúsculas.
- Que cada imagen pese menos de 500 KB. Reduce las fotos antes de subirlas.
- Para gráficas y diagramas, SVG se ve nítido y pesa poco.
- Para fotos de personas o libros, revisa la licencia (Wikimedia Commons la indica) y pon el crédito en el pie de la foto.
- Un `.gitkeep` en una carpeta vacía sirve para que git la conserve.

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
