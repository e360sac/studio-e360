/* * ARQUITECTURA DIGITAL - STUDIO ENFOQUE 360
 * Autor: Tu Copiloto IA
 * Función: Manejo de Interfaz, Modal de Diagnóstico y Enrutamiento a WhatsApp
 */

const APP_CONFIG = {
    whatsappNumber: "51993118573", // CAMBIA ESTO POR TU NÚMERO REAL (con código de país 51)
    animationDuration: 300
};

// Elementos del DOM (El escenario)
const modal = document.getElementById('modal-diagnostico');
const btnOpenDiagnosis = document.querySelectorAll('.trigger-diagnosis'); // Botones que abren el modal
const btnCloseModal = document.getElementById('btn-close-modal');
const formDiagnosis = document.getElementById('form-diagnosis');

// Lógica de "Spotlight" (Efecto Linterna)
const spotlight = document.getElementById('spotlight');
if(spotlight) {
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;
        spotlight.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(255,255,255,0.04), transparent 40%)`;
    });
}

// Lógica del Modal (Abrir/Cerrar con elegancia)
function toggleModal(show) {
    if (show) {
        modal.classList.remove('hidden');
        // Pequeño delay para permitir que la transición CSS se vea
        setTimeout(() => modal.classList.remove('opacity-0'), 10);
    } else {
        modal.classList.add('opacity-0');
        setTimeout(() => modal.classList.add('hidden'), APP_CONFIG.animationDuration);
    }
}

// Event Listeners (Escuchas)
btnOpenDiagnosis.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleModal(true);
    });
});

if(btnCloseModal) {
    btnCloseModal.addEventListener('click', () => toggleModal(false));
}

// Cerrar si hacen click fuera del contenido (UX Standard)
window.addEventListener('click', (e) => {
    if (e.target === modal) toggleModal(false);
});

// EL CEREBRO: Procesamiento del Formulario -> WhatsApp
if(formDiagnosis) {
    formDiagnosis.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // 1. Capturar datos
        const nombre = document.getElementById('input-nombre').value;
        const perfil = document.querySelector('input[name="perfil"]:checked').value;
        const necesidad = document.getElementById('input-necesidad').value;
        
        // 2. Construir narrativa (Copywriting automático)
        let mensajeIntro = "";
        
        switch(perfil) {
            case 'Academico':
                mensajeIntro = "Hola Studio E360. Represento a una institución académica/investigación.";
                break;
            case 'Corporativo':
                mensajeIntro = "Hola Studio E360. Busco soluciones para entorno Corporativo.";
                break;
            case 'Creador':
                mensajeIntro = "Hola. Estoy interesado en potenciar mi marca personal (Podcast o Legado).";
                break;
        }

        const mensajeFinal = `*SOLICITUD DE PROYECTO WEB* 🚀\n\n👤 *Nombre:* ${nombre}\n🏷 *Perfil:* ${perfil}\n📝 *Necesidad:* ${necesidad}\n\n${mensajeIntro} Me gustaría agendar una breve llamada técnica.`;

        // 3. Codificar URL y Lanza
        const url = `https://wa.me/${APP_CONFIG.whatsappNumber}?text=${encodeURIComponent(mensajeFinal)}`;
        
        window.open(url, '_blank');
        toggleModal(false); // Cierra el modal tras enviar
    });
}

console.log("System.Init: Studio E360 Core Online 🟢");