// src/js/contact.js
window.sendMail = function (event) {
  event.preventDefault();
  // TODO: reemplazar por EmailJS o Brevo+Worker
  alert("Formulario enviado (demo)");
};

// ---------- WhatsApp ----------
const WHATSAPP_PHONE = '5491140873155'; // <-- tu número (sin + ni espacios)
const WHATSAPP_MSG = '¡Hola Ezequiel! Vi tu portafolio y quiero hablar de un proyecto.';

window.openWhatsApp = function () {
  const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(WHATSAPP_MSG)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
};

