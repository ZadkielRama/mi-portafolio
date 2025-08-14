// src/js/menu.js
function initMenu() {
  const btn  = document.getElementById("menuBtn");
  const menu = document.getElementById("mobileMenu");
  if (!btn || !menu) return;
  btn.addEventListener("click", () => menu.classList.toggle("hidden"));
}
// cuando ya estén los parciales
document.addEventListener("partials:ready", initMenu);
