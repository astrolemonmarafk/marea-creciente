/* ============================================================
   Marea Creciente · scripts compartidos
   ============================================================ */

/* Número de WhatsApp: código de país + 10 dígitos, sin espacios ni "+".
   Ejemplo: "525512345678". Cámbialo solo aquí. */
var WHATSAPP = "52XXXXXXXXXX";

(function () {
  var root = document.body.getAttribute("data-root") || "";
  var allPosts = (window.POSTS || []).slice().sort(function (a, b) {
    return a.fecha < b.fecha ? 1 : -1;
  });
  var posts = allPosts.filter(function (p) { return !p.borrador; });

  function esc(t) {
    return String(t == null ? "" : t).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function fechaBonita(f) {
    var d = new Date(f + "T12:00:00");
    if (isNaN(d)) return f;
    return d.toLocaleDateString("es-MX", { day: "numeric", month: "long", year: "numeric" });
  }
  function nombreArchivo(path) {
    return String(path).split("/").pop().replace(/\.html$/, "");
  }

  /* ---------- piezas compartidas (blog) ---------- */
  var SYMBOLS =
    '<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs>' +
    '<symbol id="nut" viewBox="0 0 64 64">' +
    '<path d="M32 4C48 4 59 16 59 31C59 47 48 60 32 60C16 60 5 47 5 31C5 16 16 4 32 4Z" fill="#B97A3E"/>' +
    '<path d="M32 4C16 4 5 16 5 31C5 40 9 48 15 53C11 44 11 28 20 17C24 12 28 8 32 4Z" fill="#D49A5C"/>' +
    '<path d="M32 5C25 19 39 43 32 59" fill="none" stroke="#5E3A17" stroke-width="2.4" stroke-linecap="round"/>' +
    '<path d="M17 19C21 23 22 29 21 35M47 19C43 23 42 29 43 35M16 41C20 43 22 47 22 51M48 41C44 43 42 47 42 51" fill="none" stroke="#7A4C20" stroke-width="1.6" stroke-linecap="round" opacity=".75"/>' +
    '</symbol>' +
    '<symbol id="wa" viewBox="0 0 24 24"><path fill="currentColor" d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.86 9.86 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.11.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.22-8.25 8.22Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.23-.17-.48-.29Z"/></symbol>' +
    '<clipPath id="clipLogo"><circle cx="32" cy="32" r="31"/></clipPath>' +
    '</defs></svg>';

  var SHORE =
    '<div class="shore" aria-hidden="true">' +
    '<svg class="wave b" viewBox="0 0 2400 120" preserveAspectRatio="none"><path d="M0 60Q150 20 300 60T600 60T900 60T1200 60T1500 60T1800 60T2100 60T2400 60V120H0Z"/></svg>' +
    '<svg class="wave" viewBox="0 0 2400 120" preserveAspectRatio="none"><path d="M0 74Q150 40 300 74T600 74T900 74T1200 74T1500 74T1800 74T2100 74T2400 74V120H0Z"/></svg>' +
    '</div>';

  var LOGO =
    '<svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="31" fill="#0B4258"/>' +
    '<g clip-path="url(#clipLogo)"><use href="#nut" x="10" y="2" width="44" height="44"/>' +
    '<path d="M0 40Q8 34 16 40T32 40T48 40T64 40V64H0Z" fill="#3AA3C2" opacity=".85"/>' +
    '<path d="M0 48Q8 42 16 48T32 48T48 48T64 48V64H0Z" fill="#0F6A85" opacity=".95"/></g></svg>';

  var esLanding = !!document.getElementById("inicio");

  if (!esLanding) {
    // símbolos
    if (!document.getElementById("nut")) {
      document.body.insertAdjacentHTML("afterbegin", SYMBOLS);
    }
    // cabecera
    var header =
      '<header class="hero mini"><div class="wrap"><nav class="nav" aria-label="Principal">' +
      '<a class="brand" href="' + root + 'index.html" aria-label="Marea Creciente, inicio">' + LOGO + '<span class="brand-text"><span>Marea Creciente</span><small>Asesorías de matemáticas y física</small></span></a>' +
      '<div class="navlinks">' +
      '<a class="navlink" href="' + root + 'index.html#niveles">Asesorías</a>' +
      '<a class="navlink" href="' + root + 'blog/">Blog</a>' +
      '<a class="btn js-wa" href="#" data-msg="Hola, vi Marea Creciente y quiero info sobre las asesorías.">' +
      '<svg aria-hidden="true"><use href="#wa"/></svg><span>Escríbenos por WhatsApp</span></a>' +
      '</div></nav></div>' + SHORE + '</header>';
    var sym = document.querySelector("body > svg");
    sym.insertAdjacentHTML("afterend", header);
    // pie
    document.body.insertAdjacentHTML(
      "beforeend",
      '<footer class="site-foot">Marea Creciente · Asesorías de matemáticas y física en línea · © ' +
        new Date().getFullYear() + "</footer>"
    );
  }

  /* ---------- medidor de marea ---------- */
  if (!document.querySelector(".gauge")) {
    document.body.insertAdjacentHTML("beforeend", '<div class="gauge" aria-hidden="true"><i></i></div>');
  }
  var gauge = document.querySelector(".gauge");
  function nivel() {
    var h = document.documentElement.scrollHeight - window.innerHeight;
    var f = h > 0 ? window.scrollY / h : 0;
    gauge.style.setProperty("--lvl", 6 + Math.max(0, Math.min(1, f)) * 94 + "%");
  }
  window.addEventListener("scroll", nivel, { passive: true });
  window.addEventListener("resize", nivel);
  nivel();

  /* ---------- tarjetas de artículos ---------- */
  function tarjeta(p, base) {
    var chips = (p.etiquetas || [])
      .map(function (e) { return '<span class="chip">' + esc(e) + "</span>"; })
      .join("");
    return (
      '<a class="postcard" href="' + esc(base + p.archivo) + '">' +
      '<span class="meta">' + esc(fechaBonita(p.fecha)) + "</span>" +
      "<h3>" + esc(p.titulo) + "</h3>" +
      "<p>" + esc(p.resumen) + "</p>" +
      (chips ? '<span class="chips">' + chips + "</span>" : "") +
      "</a>"
    );
  }

  // Portada: últimos 3
  var latest = document.getElementById("latest");
  if (latest && posts.length) {
    latest.innerHTML = posts.slice(0, 3).map(function (p) { return tarjeta(p, root + "blog/"); }).join("");
    var sec = document.getElementById("blog");
    if (sec) sec.hidden = false;
  }

  // Índice del blog: todos
  var all = document.getElementById("all");
  if (all) {
    all.innerHTML = posts.length
      ? posts.map(function (p) { return tarjeta(p, ""); }).join("")
      : '<p class="empty">Todavía no hay artículos. Pronto subimos el primero.</p>';
  }

  /* ---------- página de un artículo ---------- */
  var art = document.querySelector("article.post");
  if (art) {
    var actual = nombreArchivo(location.pathname);
    var p = allPosts.filter(function (x) { return nombreArchivo(x.archivo) === actual; })[0];
    var h1 = art.querySelector("h1");
    var meta = art.querySelector(".meta");
    var chipsBox = art.querySelector(".chips");
    if (p) {
      document.title = p.titulo + " · Marea Creciente";
      h1.textContent = p.titulo;
      var palabras = (art.querySelector(".body").textContent || "").trim().split(/\s+/).length;
      var min = Math.max(1, Math.round(palabras / 200));
      meta.textContent = (p.autor ? p.autor + " · " : "") + fechaBonita(p.fecha) + " · " + min + " min de lectura";
      chipsBox.innerHTML = (p.etiquetas || [])
        .map(function (e) { return '<span class="chip">' + esc(e) + "</span>"; })
        .join("");
    } else {
      h1.textContent = "Falta registrar este artículo";
      meta.textContent = "Agrega una entrada con archivo: \"posts/" + actual + ".html\" en blog/posts.js.";
    }
    art.insertAdjacentHTML(
      "afterend",
      '<div class="post-cta"><div class="box"><h3>¿Te quedó una duda, o quieres ir más a fondo?</h3>' +
        "<p>Damos asesorías en línea de matemáticas y física, de primaria a universidad.</p>" +
        '<a class="btn js-wa" href="#" data-msg="Hola, leí \'' + (p ? esc(p.titulo).replace(/'/g, "") : "un artículo") + '\' en el blog y me interesa una asesoría.">' +
        '<svg aria-hidden="true"><use href="#wa"/></svg>Escríbenos por WhatsApp</a></div></div>' +
        '<div class="post-wrap" style="max-width:40em;margin:0 auto"><a class="back" href="' + root + 'blog/">← Todos los artículos</a></div>'
    );
  }

  /* ---------- WhatsApp ---------- */
  var listo = /^\d{11,14}$/.test(WHATSAPP);
  document.querySelectorAll(".js-wa").forEach(function (a) {
    var msg = a.getAttribute("data-msg") || "";
    a.href = "https://wa.me/" + (listo ? WHATSAPP : "") + "?text=" + encodeURIComponent(msg);
    a.target = "_blank";
    a.rel = "noopener";
  });
  var n = document.getElementById("numtext");
  if (n && listo) {
    var d = WHATSAPP.slice(2);
    n.textContent = "WhatsApp: " + d.slice(0, 2) + " " + d.slice(2, 6) + " " + d.slice(6);
  }
})();
