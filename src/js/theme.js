// src/js/theme.js
(function () {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

  const icons = {
    light: '<svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 18a6 6 0 1 0 0-12a6 6 0 0 0 0 12Z"/></svg>',
    dark:  '<svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M21 12.79A9 9 0 1 1 11.21 3A7 7 0 0 0 21 12.79Z"/></svg>',
    system:'<svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M4 6h16v9H4zM2 18h20v2H2z"/></svg>',
  };

  function apply(theme) {
    const root = document.documentElement;
    const icon = document.getElementById("theme-icon");
    if (theme === "dark" || (theme === "system" && prefersDark.matches)) {
      root.classList.add("dark");
      if (icon) icon.innerHTML = icons[theme] || icons.dark;
    } else {
      root.classList.remove("dark");
      if (icon) icon.innerHTML = icons[theme] || icons.light;
    }
  }

  function setTheme(t) {
    if (t === "system") localStorage.setItem("theme", "system");
    else localStorage.setItem("theme", t);
    apply(t);
  }

  function initThemeUI() {
    const btn  = document.getElementById("theme-btn");
    const list = document.getElementById("theme-list");
    const menu = document.getElementById("theme-menu");
    if (!btn || !list || !menu) return; // header aún no cargado

    // estado inicial
    apply(localStorage.getItem("theme") || "system");

    // abrir/cerrar dropdown
    btn.addEventListener("click", () => {
      const open = list.dataset.open === "1";
      list.dataset.open = open ? "0" : "1";
      list.classList.toggle("invisible", open);
      list.classList.toggle("opacity-0", open);
      list.classList.toggle("pointer-events-none", open);
    });

    // cerrar al hacer click fuera
    document.addEventListener("click", (e) => {
      if (!menu.contains(e.target)) {
        list.dataset.open = "0";
        list.classList.add("invisible", "opacity-0", "pointer-events-none");
      }
    });

    // opciones
    list.querySelectorAll("button[data-theme]").forEach((b) => {
      b.addEventListener("click", () => {
        const t = b.getAttribute("data-theme"); // light | dark | system
        setTheme(t);
        list.dataset.open = "0";
        list.classList.add("invisible", "opacity-0", "pointer-events-none");
      });
    });

    // sincroniza si está en system
    prefersDark.addEventListener("change", () => {
      const saved = localStorage.getItem("theme") || "system";
      if (saved === "system") apply("system");
    });
  }

  // Esperar a que el header se haya inyectado
  document.addEventListener("partials:ready", initThemeUI);
})();
