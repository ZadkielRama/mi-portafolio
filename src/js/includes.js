// src/js/includes.js
// src/js/includes.js
async function includePartials() {
  const slots = Array.from(document.querySelectorAll("[data-include]"));
  await Promise.all(
    slots.map(async (slot) => {
      const url = slot.getAttribute("data-include");
      try {
        const res = await fetch(url, { cache: "no-cache" });
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
        const html = await res.text();
        const tpl = document.createElement("template");
        tpl.innerHTML = html.trim();
        slot.replaceWith(tpl.content);
      } catch (err) {
        console.error(`Error incluyendo ${url}:`, err);
        slot.innerHTML = `<!-- Error al incluir ${url} -->`;
      }
    })
  );
  // 🔔 Avisar que ya están los parciales en el DOM
  document.dispatchEvent(new Event("partials:ready"));
}

document.addEventListener("DOMContentLoaded", includePartials);
document.addEventListener("partials:ready", () => {
  console.log("Todos los parciales han sido incluidos.");
});