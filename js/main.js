(function () {
  "use strict";

  var LANG = localStorage.getItem("edali_lang") || "es";

  /* ---------------------------------------------------------
     Content — one entry per piece. To add a new piece later:
     drop its photos in assets/pieces/<slug>/1.png (2.png,
     3.png...) and add an object here, then add one more slot
     to SLOTS_DESKTOP / SLOTS_MOBILE below. `ar` is the main
     photo's width/height ratio, used to size the tile without
     layout shift.
  --------------------------------------------------------- */
  var PIECES = [
    {
      slug: "flores-sembradas-arrancadas",
      titleEs: "Flores sembradas y arrancadas con muchas emociones",
      titleEn: "Flowers planted and torn out with many emotions",
      dimensions: "16.5 x 14 x 5 cm",
      technique: "Cerámica",
      images: 2,
      ar: 467 / 554,
      model: "flores-y-una-flor.glb",
      descEs: "Me gusta que sean flores siamesas con caras y arrugadas. Me encanta que se haya crackelado el esmalte porque parece que tienen la piel rota.",
      descEn: "I love how they look like siamese flowers with wrinkled faces, and I love how the crackled glaze makes them look like their skin is broken."
    },
    {
      slug: "jarron-flor-triste-denim",
      titleEs: "Jarrón con flor triste por no ser Japanese denim",
      titleEn: "Vase with a flower that's sad about not being Japanese denim",
      dimensions: "18.5 x 19 x 19 cm",
      technique: "Cerámica",
      images: 2,
      ar: 422 / 445,
      model: "jarron-flor-triste-denim.glb",
      descEs: "Este jarrón lo empecé a hacer un día y se me abrió y no lo pude cerrar, y me di cuenta de que desde arriba parecía una flor. Me gusta la idea de contrastar algo tan feliz con algo triste, pero que parezca triste no convierte la pieza en tristeza.",
      descEn: "I started making this vase one day and it opened up and I couldn't close it back, but then from above I realized it looked like a flower. I like the idea of contrasting something so happy with something sad, but just because it looks sad doesn't mean the piece represents sadness."
    },
    {
      slug: "jarron-rosa-aretes",
      titleEs: "Jarrón rosa que se quería poner aretes",
      titleEn: "Pink vase that wanted to wear earrings",
      dimensions: "19.5 x 26 x 15 cm",
      technique: "Cerámica",
      images: 2,
      ar: 502 / 437,
      model: "jarron-rosa-aretes.glb",
      descEs: "Me inspiré en la ropa que tenían mis Polly Pockets. Podía jugar horas con ellas y admirar las combinaciones de color y pensar que un día iba a crecer y vestirme así, y quitarme y ponerme cosas diferentes. Este jarrón me pidió que le pusiera aretes que combinaran con su interior. El Polly Pocket de la colección.",
      descEn: "I was inspired by my Polly Pocket's clothes from when I was a kid. I could play with them for hours, admiring the color combinations and thinking of how one day I'd grow up and dress that way, swapping different pieces on and off. This vase asked me for earrings to match its inside. The Polly Pocket of the collection."
    },
    {
      slug: "mascara-de-mis-emociones",
      titleEs: "Máscara de mis emociones",
      titleEn: "Mask of my emotions (Matryoshkas)",
      dimensions: "9 x 5.5 x 6 cm / 7.5 x 4 x 3.5 cm / 4.5 x 2.5 cm",
      technique: "Cerámica",
      images: 2,
      ar: 611 / 417,
      model: "mascara-de-mis-emociones.glb",
      descEs: "La mamá de mi papá, mi abuela paterna, tenía un set de matrioshkas que trajo de Rusia en su casa en Coyoacán que me parecían fascinantes. Solo la visitábamos a ella y las matrioshkas dos veces al año, hasta que un día nos las regaló y las llevamos a mi casa en Puebla. Siempre me gustó la forma en que una escondía a la otra y me hizo pensar en que tal vez me gustaban porque podían ocultar lo que sentía realmente, aunque a veces ni siquiera sé qué era eso realmente.",
      descEn: "My dad's mom, my paternal grandmother, had a set of matryoshkas brought over from Russia in her Coyoacán house that I found fascinating. We only ever visited her and the matryoshkas twice a year, until one day she gave them to us and we took them to my house in Puebla. I always liked the way one hid inside the other and it made me think that maybe I liked how they could hide what I really felt, even if sometimes I didn't even know what that really was.",
      statusEs: "Vendida",
      statusEn: "Sold"
    },
    {
      slug: "te-traje-otra-flor",
      titleEs: "Te quiero, te traje otra flor",
      titleEn: "I love you, I brought you another flower",
      dimensions: "11.5 x 7 x 4 cm",
      technique: "Cerámica",
      images: 2,
      ar: 389 / 659,
      model: null,
      descEs: "Más esmalte crackelado. Me gustaría que las flores pudieran tener colores así de intensos, como la plastilina.",
      descEn: "More crackled glaze. I wish flowers could have colors this intense, like Play-Doh."
    },
    {
      slug: "te-traje-una-flor",
      titleEs: "Te quiero, te traje una flor",
      titleEn: "I love you, I brought you a flower",
      dimensions: "17 x 9 x 5 cm",
      technique: "Cerámica",
      images: 2,
      ar: 368 / 804,
      // Scanned together with "Flores sembradas..." as one 3D capture —
      // this piece's "Ver en 3D" shows that same combined scene.
      model: "flores-y-una-flor.glb",
      descEs: "Inmortalicé el contraste de la felicidad y la tristeza en un rosa que representa la ternura. Las chapas rojas son porque yo tengo piel rosácea y me salen chapitas. Soy yo un poco.",
      descEn: "I immortalized the contrast between happiness and sadness in a pink that stands for tenderness. The red cheeks are because I have rosacea and get rosy cheeks easily. She's a bit like me.",
      statusEs: "Vendida",
      statusEn: "Sold"
    },
    {
      slug: "summer-turned-fifas",
      titleEs: "The Summer I Turned FIFAs",
      titleEn: "The Summer I Turned FIFAs",
      dimensions: "22 x 18 x 19 cm",
      technique: "Cerámica",
      images: 2,
      ar: 398 / 512,
      model: "summer-turned-fifas.glb",
      descEs: "Este jarrón lo hice meses antes del Mundial sin pensar en el Mundial, pero luego llegó el Mundial y no podía dejar de pensar en fútbol. Cuando nació me molestaba que pareciera balón de fut. Cuando me volví fifas, amaba que pareciera balón de fut.",
      descEn: "I made this vase months before the World Cup started without thinking about the World Cup, but then the World Cup came and I couldn't stop thinking about soccer. It bothered me that it looked like a soccer ball when it came to life. Then I turned FIFAs and I loved that it looked like a soccer ball."
    },
    {
      slug: "todo-lo-que-soy-nada",
      titleEs: "Todo lo que soy. Soy nada y todo a la vez.",
      titleEn: "Everything I am. I am nothing and everything all at once",
      dimensions: "16 x 16 cm",
      technique: "Cerámica",
      images: 2,
      ar: 445 / 435,
      model: "todo-lo-que-soy-nada.glb",
      descEs: "Es un plato, pero es un objeto de decoración. Lleno de emociones por un lado y vacío del otro. Soy todo eso.",
      descEn: "It's a plate, but it's a decorative object. Full of emotions on one side and empty on the other. I am all of that."
    },
    {
      slug: "trinket-box-amarilla",
      titleEs: "Trinket box está triste porque le salió una caquita de mosca pero luego se puso feliz",
      titleEn: "Trinket box is sad because it got a little fly poop on it, but then it got happy",
      dimensions: "12 x 12 x 10 cm",
      technique: "Cerámica",
      images: 3,
      ar: 277 / 320,
      model: "trinket-box-amarilla.glb",
      descEs: "Tengo un lunar en la mejilla que mi papá siempre decía que era una caquita de mosca. A esta cajita le salió una caquita de mosca en el horno. Tal vez así me pasó a mí también.",
      descEn: "I have a beauty mark on my cheek that my dad always said was a little fly poop. This little box got a little fly poop when it got fired. Maybe that's what happened to me too."
    },
    {
      slug: "trinket-box-naranja",
      titleEs: "Trinket box que por fuera es un melón y por dentro una sandía",
      titleEn: "Trinket box that's a cantaloupe on the outside and a watermelon on the inside",
      dimensions: "12 x 13.5 x 12 cm",
      technique: "Cerámica",
      images: 3,
      ar: 326 / 327,
      model: "trinket-box-naranja.glb",
      descEs: "Me gusta mucho el melón. La sandía no tanto, pero me recordó mucho a un chicle sabor sandía que comía cuando era niña.",
      descEn: "I really like cantaloupe. Watermelon not so much, but it reminded me a lot of a watermelon-flavored gum I used to eat when I was a kid."
    },
    {
      slug: "panal-abejas",
      titleEs: "Un panal de abejas azul con su abeja reina roja",
      titleEn: "A blue honeycomb with its red queen bee",
      dimensions: "20 x 18 x 18 cm",
      technique: "Cerámica",
      images: 2,
      ar: 379 / 475,
      model: "panal-abejas.glb",
      descEs: "Toda mi vida me dieron miedo las abejas, pero les perdí el miedo un día en un apiario en Yucatán por ahí del 2021. Eran abejas meliponas. Su miel es casi mágica y se la ponía en los ojos a mi perro de 14 años para ayudarle con sus cataratas.",
      descEn: "I'd been terrified of bees my whole life, until I finally got over my fear at an apiary in Yucatán back around 2021. They were Melipona bees. Their honey is almost magical; I used to put it in my 14-year-old dog's eyes to help with his cataracts."
    }
  ];

  var TECHNIQUE_EN = { "Cerámica": "Ceramic" };
  function pieceTitle(piece) { return LANG === "en" ? piece.titleEn : piece.titleEs; }
  function pieceTechnique(piece) { return LANG === "en" ? (TECHNIQUE_EN[piece.technique] || piece.technique) : piece.technique; }
  function pieceDesc(piece) {
    if (LANG === "en") return piece.descEn || null;
    return piece.descEs || null;
  }
  function pieceStatus(piece) {
    if (LANG === "en") return piece.statusEn || null;
    return piece.statusEs || null;
  }

  /* ---------------------------------------------------------
     Layout slots — the organic cluster's composition (position,
     rotation) is fixed and hand-tuned; which piece lands in
     which slot is reshuffled on every page load. `box` is a
     max bounding-box side (% of stage width) — each piece is
     scaled to fit inside that box regardless of its own photo's
     aspect ratio, so a tall/narrow piece and a wide one dropped
     into the same slot read as the same visual size.
  --------------------------------------------------------- */
  /* Slots near the right edge use `right` (not `left`) so the tile's
     outer edge is pinned a fixed distance from the stage boundary no
     matter which piece (and therefore which width) lands there — a
     center-anchored `left` slot lets narrow pieces visually fall short
     of the edge while wide ones overshoot it. */
  var SLOTS_DESKTOP = [
    { left: 9, top: 20, box: 13, rot: -9 },
    { left: 22, top: 8, box: 12, rot: 6 },
    { left: 47, top: 10, box: 14, rot: -3 },
    { left: 74, top: 5, box: 13, rot: 8 },
    { right: 8, top: 20, box: 12, rot: -10 },
    { left: 8, top: 46, box: 12, rot: 5 },
    { left: 85, top: 47, box: 13, rot: -6 },
    { left: 15, top: 74, box: 13, rot: 9 },
    { left: 34, top: 92, box: 12, rot: -7 },
    { left: 63, top: 86, box: 14, rot: 5 },
    { right: 8, top: 86, box: 12, rot: -4 }
  ];

  /* The hero title runs ~92% of the mobile width, so there's no
     room beside it for a ring — pieces live in two clear bands,
     above and below the text, instead of attempting a circle. */
  var SLOTS_MOBILE = [
    { left: 10, top: 5, box: 23, rot: -8 },
    { left: 40, top: 3, box: 21, rot: 6 },
    { right: 6, top: 8, box: 24, rot: -5 },
    { left: 18, top: 24, box: 22, rot: 9 },
    { left: 58, top: 27, box: 23, rot: -6 },
    { left: 84, top: 22, box: 19, rot: 5 },
    { left: 12, top: 68, box: 24, rot: -9 },
    { left: 46, top: 74, box: 21, rot: 4 },
    { right: 8, top: 70, box: 22, rot: -6 },
    { left: 26, top: 90, box: 23, rot: 8 },
    { left: 68, top: 88, box: 20, rot: -4 }
  ];

  function shuffled(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  }

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var clusterMQ = window.matchMedia("(min-width: 768px)");
  var isMobileLayout = !clusterMQ.matches;
  var SLOTS = isMobileLayout ? SLOTS_MOBILE : SLOTS_DESKTOP;

  var stageRectForLayout = document.getElementById("stage").getBoundingClientRect();

  /* Drift amplitude is a % of stage width rather than a flat pixel
     value — a fixed ~8px wiggle reads as lively on a small mobile
     stage but is barely perceptible on a big desktop one. */
  var DRIFT_RANGE_X = Math.max(10, stageRectForLayout.width * 0.02);
  var DRIFT_RANGE_Y = Math.max(11, stageRectForLayout.width * 0.022);

  var ORDER = shuffled(PIECES);
  ORDER.forEach(function (piece, i) {
    var slot = SLOTS[i];
    var boxSidePct = slot.box; // % of stage width, applied to both axes
    var boxSidePx = stageRectForLayout.width * (boxSidePct / 100);
    var widthPx = piece.ar >= 1 ? boxSidePx : boxSidePx * piece.ar;
    var anchor = slot.right !== undefined ? "right" : "left";
    piece.layout = {
      anchor: anchor,
      left: slot.left,
      right: slot.right,
      top: slot.top,
      width: (widthPx / stageRectForLayout.width) * 100,
      rot: slot.rot
    };
  });

  /* ---------------------------------------------------------
     Render tiles
  --------------------------------------------------------- */
  var tilesRoot = document.getElementById("tiles");

  ORDER.forEach(function (piece, i) {
    var layout = piece.layout;
    var btn = document.createElement("button");
    btn.className = "tile";
    btn.type = "button";
    btn.dataset.index = i;
    btn.setAttribute("aria-label", (LANG === "en" ? "View piece: " : "Ver pieza: ") + pieceTitle(piece));
    if (layout.anchor === "right") {
      btn.style.right = layout.right + "%";
    } else {
      btn.style.left = layout.left + "%";
    }
    btn.style.setProperty("--t", layout.top + "%");
    btn.style.setProperty("--w", layout.width + "%");
    btn.style.setProperty("--ar", piece.ar);

    var frame = document.createElement("span");
    frame.className = "tile__frame";

    var img = document.createElement("img");
    img.src = "assets/pieces/" + piece.slug + "/1.png";
    img.alt = pieceTitle(piece);
    img.loading = i < 4 ? "eager" : "lazy";
    img.decoding = "async";
    img.draggable = false;

    frame.appendChild(img);
    btn.appendChild(frame);
    tilesRoot.appendChild(btn);

    btn.addEventListener("click", function () {
      if (btn.dataset.justDragged) return;
      if (typeof gsap !== "undefined" && !reduceMotion) {
        gsap.killTweensOf(btn);
        gsap.to(btn, { scale: 1.4, duration: 0.22, ease: "back.out(2.2)", overwrite: "auto" });
        setTimeout(function () { openModal(i); }, 140);
        setTimeout(function () {
          gsap.to(btn, { scale: 1, duration: 0.3, ease: "power2.out", overwrite: "auto" });
        }, 520);
      } else {
        openModal(i);
      }
    });
  });

  var tileEls = Array.prototype.slice.call(document.querySelectorAll(".tile"));

  /* ---------------------------------------------------------
     Menu dropdown
  --------------------------------------------------------- */
  var menuToggle = document.getElementById("menuToggle");
  var menuDropdown = document.getElementById("menuDropdown");

  function closeMenu() {
    menuDropdown.hidden = true;
    menuToggle.setAttribute("aria-expanded", "false");
  }
  function openMenu() {
    menuDropdown.hidden = false;
    menuToggle.setAttribute("aria-expanded", "true");
  }
  menuToggle.addEventListener("click", function () {
    if (menuDropdown.hidden) openMenu(); else closeMenu();
  });
  document.addEventListener("click", function (e) {
    if (!menuDropdown.hidden && !menuDropdown.contains(e.target) && !menuToggle.contains(e.target)) {
      closeMenu();
    }
  });
  menuDropdown.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", closeMenu);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !menuDropdown.hidden) closeMenu();
  });
  window.addEventListener("scroll", function () {
    if (!menuDropdown.hidden) closeMenu();
  }, { passive: true });

  /* ---------------------------------------------------------
     Modal
  --------------------------------------------------------- */
  var modal = document.getElementById("modal");
  var modalImage = document.getElementById("modalImage");
  var modalModel = document.getElementById("modalModel");
  var modal3DToggle = document.getElementById("modal3DToggle");
  var modal3DToggleLabel = document.getElementById("modal3DToggleLabel");
  var modalThumbs = document.getElementById("modalThumbs");
  var modalTitle = document.getElementById("modalTitle");
  var modalIndex = document.getElementById("modalIndex");
  var modalDimensions = document.getElementById("modalDimensions");
  var modalTechnique = document.getElementById("modalTechnique");
  var modalDesc = document.getElementById("modalDesc");
  var modalStatus = document.getElementById("modalStatus");
  var modalClose = modal.querySelector(".modal__close");
  var lastFocused = null;
  var currentPiece = null;
  var currentModalIndex = null;
  var showing3D = false;

  function setModalImage(piece, n) {
    modalImage.src = "assets/pieces/" + piece.slug + "/" + n + ".png";
    modalImage.alt = pieceTitle(piece);
    modalThumbs.querySelectorAll("button").forEach(function (b) {
      b.classList.toggle("is-active", Number(b.dataset.n) === n);
    });
  }

  function show3D(active) {
    showing3D = active;
    if (active && !modalModel.getAttribute("src")) {
      modalModel.setAttribute("src", "assets/models/" + currentPiece.model);
    }
    modalModel.classList.toggle("is-active", active);
    modalImage.classList.toggle("is-hidden", active);
    modalThumbs.hidden = active;
    modal3DToggleLabel.textContent = active
      ? (LANG === "en" ? "view photo" : "ver foto")
      : (LANG === "en" ? "view in 3d" : "ver en 3D");
  }

  modal3DToggle.addEventListener("click", function () { show3D(!showing3D); });

  function refreshModalText() {
    if (currentPiece === null) return;
    modalTitle.textContent = pieceTitle(currentPiece);
    modalTechnique.textContent = pieceTechnique(currentPiece);
    var desc = pieceDesc(currentPiece);
    modalDesc.textContent = desc || (LANG === "en"
      ? "[description — the story behind this piece, coming soon.]"
      : "[descripción — texto texto texto texto texto texto texto texto.]");
    modalDesc.classList.toggle("is-placeholder", !desc);
    var status = pieceStatus(currentPiece);
    modalStatus.textContent = status || "";
    modalStatus.hidden = !status;
    show3D(showing3D);
  }

  function openModal(i) {
    var piece = ORDER[i];
    currentPiece = piece;
    currentModalIndex = i;
    lastFocused = document.activeElement;

    modalIndex.textContent = "N." + String(i + 1).padStart(2, "0");
    modalDimensions.textContent = piece.dimensions;
    refreshModalText();

    modalThumbs.innerHTML = "";
    if (piece.images > 1) {
      for (var n = 1; n <= piece.images; n++) {
        (function (n) {
          var b = document.createElement("button");
          b.type = "button";
          b.dataset.n = n;
          b.setAttribute("aria-label", "Foto " + n);
          var im = document.createElement("img");
          im.src = "assets/pieces/" + piece.slug + "/" + n + ".png";
          im.alt = "";
          im.loading = "lazy";
          b.appendChild(im);
          b.addEventListener("click", function () { setModalImage(piece, n); });
          modalThumbs.appendChild(b);
        })(n);
      }
    }
    setModalImage(piece, 1);
    modalModel.removeAttribute("src");
    modal3DToggle.hidden = !piece.model;
    show3D(false);

    modal.hidden = false;
    document.body.style.overflow = "hidden";
    modalClose.focus();
  }

  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  }

  modal.querySelectorAll("[data-close]").forEach(function (el) {
    el.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", function (e) {
    if (modal.hidden) return;
    if (e.key === "Escape") {
      closeModal();
      return;
    }
    if (e.key === "Tab") {
      var focusables = modal.querySelectorAll(
        "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
      );
      if (!focusables.length) return;
      var first = focusables[0];
      var last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  /* ---------------------------------------------------------
     Cluster animation — big-bang scatter (~4s), settle, then
     slow independent drift forever. Runs on desktop AND
     mobile now (each with its own coordinate set above).
     Respects prefers-reduced-motion.
  --------------------------------------------------------- */
  function runClusterAnimation() {
    if (typeof gsap === "undefined") return;

    tileEls.forEach(function (tile, i) {
      var xPct = ORDER[i].layout.anchor === "right" ? 0 : -50;
      gsap.set(tile, { xPercent: xPct, yPercent: -50, x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 });
    });

    if (reduceMotion) return;

    var stage = document.getElementById("stage");
    var stageRect = stage.getBoundingClientRect();
    var maxReach = Math.max(stageRect.width, stageRect.height) * 0.95;

    tileEls.forEach(function (tile, i) {
      var piece = ORDER[i];
      var angle = Math.random() * Math.PI * 2;
      var dist = maxReach * (0.7 + Math.random() * 0.5);
      var startX = Math.cos(angle) * dist;
      var startY = Math.sin(angle) * dist;
      var startRot = piece.layout.rot + (Math.random() > 0.5 ? 1 : -1) * (220 + Math.random() * 260);

      gsap.set(tile, { x: startX, y: startY, rotation: startRot, scale: 0.4, opacity: 0 });

      gsap.to(tile, {
        x: 0,
        y: 0,
        rotation: piece.layout.rot,
        scale: 1,
        opacity: 1,
        duration: 3 + Math.random(),
        delay: Math.random() * 0.4,
        ease: "back.out(1.4)",
        onComplete: function () { driftTile(tile, piece); }
      });
    });
  }

  function driftTile(tile, piece, opts) {
    opts = opts || {};
    var baseX = opts.baseX || 0;
    var baseY = opts.baseY || 0;
    var amp = opts.amp || 1;
    function loop() {
      tile._driftTween = gsap.to(tile, {
        x: baseX + (Math.random() * DRIFT_RANGE_X * 2 - DRIFT_RANGE_X) * amp,
        y: baseY + (Math.random() * DRIFT_RANGE_Y * 2 - DRIFT_RANGE_Y) * amp,
        rotation: piece.layout.rot + (Math.random() * 4 - 2) * amp,
        duration: 4 + Math.random() * 3,
        ease: "sine.inOut",
        onComplete: loop
      });
    }
    loop();
  }
  /* Play mode keeps this same drift loop running (at reduced amplitude,
     PLAY_AMP below) instead of freezing everything — a drag simply kills
     the one tile's tween and restarts it anchored at the drop point. */
  var PLAY_AMP = 0.4;

  function hoverFeedback() {
    tileEls.forEach(function (tile) {
      tile.addEventListener("mouseenter", function () {
        if (playgroundActive) return;
        gsap.to(tile, { scale: 1.05, duration: 0.25, ease: "power2.out", overwrite: "auto" });
      });
      tile.addEventListener("mouseleave", function () {
        if (playgroundActive) return;
        gsap.to(tile, { scale: 1, duration: 0.25, ease: "power2.out", overwrite: "auto" });
      });
      tile.addEventListener("pointerdown", function () {
        if (playgroundActive) return;
        gsap.to(tile, { scale: 0.96, duration: 0.12, overwrite: "auto" });
      });
      tile.addEventListener("pointerup", function () {
        if (playgroundActive) return;
        gsap.to(tile, { scale: 1.05, duration: 0.18, overwrite: "auto" });
      });
    });
  }

  runClusterAnimation();
  if (typeof gsap !== "undefined") hoverFeedback();

  /* ---------------------------------------------------------
     Playground mode — drag any piece anywhere, still
     clickable (a tap that didn't move stays a click and
     opens the modal; a real drag suppresses that click).
     Works immediately even mid-intro: entering playground
     kills whatever tween currently owns the tile (the intro
     scatter or the idle drift) so dragging never fights it.
  --------------------------------------------------------- */
  var playgroundActive = false;
  var dragState = null;
  var hero = document.getElementById("hero");
  var playgroundToggle = document.getElementById("playgroundToggle");
  var labelDefault = document.getElementById("labelDefault");
  var labelPlay = document.getElementById("labelPlay");
  var heroHint = document.getElementById("heroHint");
  var switchHint = document.getElementById("switchHint");
  var DRAG_THRESHOLD = 5;

  if (localStorage.getItem("edali_seen_switch")) {
    switchHint.hidden = true;
  }

  /* ---------------------------------------------------------
     Onboarding toasts — one-time nudges, remembered per
     browser via localStorage so repeat visitors don't see
     them again.
  --------------------------------------------------------- */
  var toastEl = document.getElementById("toast");
  var toastTimer = null;
  function showToast(msg, duration) {
    toastEl.textContent = msg;
    toastEl.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove("is-visible"); }, duration || 4000);
  }
  function showOnceToast(key, msg) {
    if (localStorage.getItem(key)) return;
    localStorage.setItem(key, "1");
    showToast(msg, 4200);
  }
  setTimeout(function () {
    showOnceToast("edali_hint_tap", LANG === "en" ? "tap a piece to see its details" : "toca una pieza para ver sus detalles");
  }, 1600);

  function refreshHeroHint() {
    heroHint.innerHTML = playgroundActive
      ? (LANG === "en" ? "drag the pieces <span aria-hidden=\"true\">✦</span>" : "arrastra las piezas <span aria-hidden=\"true\">✦</span>")
      : (LANG === "en" ? "tap a piece" : "toca una pieza");
  }

  function setPlayground(active) {
    playgroundActive = active;
    hero.classList.toggle("is-playground", active);
    playgroundToggle.setAttribute("aria-checked", String(active));
    labelDefault.classList.toggle("is-current", !active);
    labelPlay.classList.toggle("is-current", active);
    refreshHeroHint();
    if (active) {
      showOnceToast("edali_hint_play", "welcome to the playground ✦");
    }

    tileEls.forEach(function (tile, i) {
      tile.classList.toggle("is-draggable", active);
      if (typeof gsap === "undefined") return;
      var piece = ORDER[i];
      if (tile._driftTween) tile._driftTween.kill();
      if (active) {
        gsap.set(tile, { x: 0, y: 0, rotation: piece.layout.rot, scale: tile._userScale || 1, opacity: 1 });
        driftTile(tile, piece, { amp: PLAY_AMP });
      } else {
        tile._userScale = 1;
        gsap.to(tile, {
          x: 0,
          y: 0,
          rotation: piece.layout.rot,
          scale: 1,
          duration: 0.6,
          ease: "power2.out",
          overwrite: "auto",
          onComplete: function () { driftTile(tile, piece); }
        });
      }
    });
  }

  playgroundToggle.addEventListener("click", function () {
    setPlayground(!playgroundActive);
    switchHint.hidden = true;
    localStorage.setItem("edali_seen_switch", "1");
  });

  tileEls.forEach(function (tile, i) {
    var piece = ORDER[i];

    tile.addEventListener("pointerdown", function (e) {
      if (!playgroundActive || typeof gsap === "undefined") return;
      if (tile._driftTween) tile._driftTween.kill();
      tile.setPointerCapture(e.pointerId);
      dragState = {
        tile: tile,
        pointerId: e.pointerId,
        startX: e.clientX,
        startY: e.clientY,
        baseX: gsap.getProperty(tile, "x"),
        baseY: gsap.getProperty(tile, "y"),
        moved: false
      };
      tile.classList.add("is-dragging");
    });

    tile.addEventListener("pointermove", function (e) {
      if (!dragState || dragState.tile !== tile) return;
      var dx = e.clientX - dragState.startX;
      var dy = e.clientY - dragState.startY;
      if (Math.abs(dx) + Math.abs(dy) > DRAG_THRESHOLD) dragState.moved = true;
      gsap.set(tile, { x: dragState.baseX + dx, y: dragState.baseY + dy, overwrite: "auto" });
    });

    function endDrag(e) {
      if (!dragState || dragState.tile !== tile) return;
      tile.classList.remove("is-dragging");
      if (dragState.moved) {
        tile.dataset.justDragged = "1";
        setTimeout(function () { delete tile.dataset.justDragged; }, 0);
        var dropScale = tile._userScale || 1;
        gsap.fromTo(tile, { scale: dropScale * 1.1 }, { scale: dropScale, duration: 0.4, ease: "elastic.out(1, 0.5)" });
      }
      dragState = null;
      if (playgroundActive) {
        var curX = gsap.getProperty(tile, "x");
        var curY = gsap.getProperty(tile, "y");
        driftTile(tile, piece, { baseX: curX, baseY: curY, amp: PLAY_AMP });
      }
    }
    tile.addEventListener("pointerup", endDrag);
    tile.addEventListener("pointercancel", endDrag);

    tile.addEventListener("wheel", function (e) {
      if (!playgroundActive || typeof gsap === "undefined") return;
      e.preventDefault();
      var next = (tile._userScale || 1) + (e.deltaY < 0 ? 0.08 : -0.08);
      next = Math.max(0.55, Math.min(2.2, next));
      tile._userScale = next;
      gsap.to(tile, { scale: next, duration: 0.15, overwrite: "auto" });
    }, { passive: false });
  });

  /* ---------------------------------------------------------
     Scroll-fall — scrolling past the hero doesn't just slide
     the pieces up with the page, it drops them like they lost
     their footing. The fall itself is scrubbed to scroll so it
     feels like gravity, but once a piece has fully landed it
     stays put (doesn't re-rise mid-scroll-up) — it only climbs
     back once you're all the way back at the top, and even then
     only after a short pause, so it reads as "resting at the
     bottom for a second" rather than an instant snap-back.
     Paused during playground/drag so it never fights an
     in-progress arrangement.
  --------------------------------------------------------- */
  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined" && !reduceMotion) {
    gsap.registerPlugin(ScrollTrigger);

    var fallLocked = false;
    var settleTimer = null;
    var SETTLE_DELAY = 300;

    function riseAllTiles() {
      var amp = playgroundActive ? PLAY_AMP : 1;
      tileEls.forEach(function (tile, i) {
        if (dragState && dragState.tile === tile) return;
        var restPiece = ORDER[i];
        if (tile._driftTween) tile._driftTween.kill();
        tile._driftTween = gsap.to(tile, {
          y: 0,
          rotation: restPiece.layout.rot,
          duration: 1.2 + Math.random() * 1,
          delay: Math.random() * 0.5,
          ease: "power2.inOut",
          onComplete: function () { driftTile(tile, restPiece, { amp: amp }); }
        });
      });
    }

    ScrollTrigger.create({
      trigger: "#hero",
      start: "top top",
      end: "bottom top",
      scrub: 0.5,
      onUpdate: function (self) {
        var p = self.progress;
        var wasLocked = fallLocked;

        if (p >= 0.98) fallLocked = true;

        if (wasLocked) {
          if (p <= 0.02) {
            if (!settleTimer) {
              settleTimer = setTimeout(function () {
                settleTimer = null;
                fallLocked = false;
                riseAllTiles();
              }, SETTLE_DELAY);
            }
          } else if (settleTimer) {
            clearTimeout(settleTimer);
            settleTimer = null;
          }
          return;
        }

        var heroRect = hero.getBoundingClientRect();
        tileEls.forEach(function (tile, i) {
          if (dragState && dragState.tile === tile) return;
          if (p > 0) {
            if (tile._driftTween) { tile._driftTween.kill(); tile._driftTween = null; }
            var piece = ORDER[i];
            var tileRect = tile.getBoundingClientRect();
            var curY = gsap.getProperty(tile, "y") || 0;
            var restBottom = (tileRect.bottom - heroRect.top) - curY;
            var landingDist = Math.max(0, heroRect.height - restBottom - 6);
            var floor = Math.max(heroRect.height, window.innerHeight) * 0.55;
            var dist = Math.max(landingDist, floor);
            var spin = (i % 2 === 0 ? 1 : -1) * p * (50 + (i % 5) * 18);
            gsap.set(tile, { y: p * dist, rotation: piece.layout.rot + spin });
          } else if (!tile._driftTween) {
            var restPiece = ORDER[i];
            var resumeAmp = playgroundActive ? PLAY_AMP : 1;
            tile._driftTween = gsap.to(tile, {
              y: 0,
              rotation: restPiece.layout.rot,
              duration: 0.4,
              ease: "power2.out",
              onComplete: function () { driftTile(tile, restPiece, { amp: resumeAmp }); }
            });
          }
        });
      }
    });
  }

  /* ---------------------------------------------------------
     Language toggle — ES/EN. Fixed chrome copy lives in I18N,
     keyed to [data-i18n] elements; piece titles/technique/desc
     come from PIECES via pieceTitle()/pieceTechnique()/pieceDesc().
  --------------------------------------------------------- */
  var I18N = {
    menuLabel: { es: "Menú", en: "Menu" },
    heroLine: { es: "hola me llamo", en: "hi, i'm" },
    manifestoStatement: {
      es: "que la arcilla<br>sea<br>lo que ella<br>quiera<br>ser",
      en: "may the clay<br>be<br>whatever it<br>wants<br>to be"
    },
    verseText: {
      es: "“¿Dirá el vaso de barro al que lo formó: ¿por qué me has hecho así? ¿O no tiene potestad el alfarero sobre el barro, para hacer de la misma masa un vaso para honra y otro para deshonra?”",
      en: "“Shall the thing formed say to him that formed it, ‘why hast thou made me thus?’ Hath not the potter power over the clay, of the same lump to make one vessel unto honour, and another unto dishonour?”"
    },
    verseCite: { es: "Romanos 9:20-21, RVR1960", en: "Romans 9:20-21, KJV" },
    aboutName: { es: "puebla, méxico, 1995", en: "puebla, mexico, 1995" },
    semblanza: {
      es: "Siempre me dijeron que fui creada a la imagen y semejanza de mi Dios, pero conforme más arte creo, más entiendo que Dios me creó como yo quise ser creada. Mi obra es entonces un reflejo de esa creación: un diálogo entre la materia y yo. Una escucha activa de lo que la arcilla quiere ser. Uso mis manos como un medio para alcanzar ese estado.",
      en: "I was always told that I was created in the image and likeness of my God, but the more I create art, the more I understand God created me the way I wanted to be created. My work is then a reflection of that creation: a dialogue between the material and myself, an active listening to what the clay wants to become. My hands are then the medium to reach that state."
    },
    aboutPhotoAlt: {
      es: "Edalí junto a algunas de sus piezas de cerámica",
      en: "Edalí next to some of her ceramic pieces"
    },
    contactBlurb: {
      es: "Para comisiones, información y compras, encuéntrame en:",
      en: "For commissions, info & purchases find me at:"
    },
    incendiarias: {
      es: "Incendiarias, Frontera 151",
      en: "Incendiarias, Frontera 151"
    },
    aboutHeading: { es: "Acerca de", en: "About" },
    contactHeading: { es: "Contacto", en: "Contact" },
    fieldDimensions: { es: "dimensiones", en: "dimensions" },
    fieldTechnique: { es: "técnica", en: "technique" }
  };

  var i18nEls = document.querySelectorAll("[data-i18n]");
  var i18nAltEls = document.querySelectorAll("[data-i18n-alt]");
  var langSwitch = document.getElementById("langSwitch");
  var modalCloseBtn = document.querySelector(".modal__close");

  function refreshTileLabels() {
    tileEls.forEach(function (tile, i) {
      var piece = ORDER[i];
      tile.setAttribute("aria-label", (LANG === "en" ? "View piece: " : "Ver pieza: ") + pieceTitle(piece));
      var img = tile.querySelector("img");
      if (img) img.alt = pieceTitle(piece);
    });
  }

  function applyLang(lang) {
    LANG = lang;
    localStorage.setItem("edali_lang", lang);
    document.documentElement.lang = lang;

    i18nEls.forEach(function (el) {
      var entry = I18N[el.dataset.i18n];
      if (entry) el.innerHTML = entry[lang];
    });
    i18nAltEls.forEach(function (el) {
      var entry = I18N[el.dataset.i18nAlt];
      if (entry) el.alt = entry[lang];
    });
    if (langSwitch) {
      langSwitch.querySelectorAll(".lang-switch__btn").forEach(function (btn) {
        btn.classList.toggle("is-current", btn.dataset.lang === lang);
      });
    }
    playgroundToggle.setAttribute("aria-label", lang === "en"
      ? "Play mode: drag pieces with your mouse"
      : "Modo jugar: arrastrar las piezas con el mouse");
    if (modalCloseBtn) modalCloseBtn.setAttribute("aria-label", lang === "en" ? "Close" : "Cerrar");

    refreshHeroHint();
    refreshTileLabels();
    refreshModalText();
  }

  if (langSwitch) {
    langSwitch.querySelectorAll(".lang-switch__btn").forEach(function (btn) {
      btn.addEventListener("click", function () { applyLang(btn.dataset.lang); });
    });
  }

  applyLang(LANG);

})();
