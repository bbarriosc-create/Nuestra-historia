const FECHA_INICIO = new Date("2026-07-01T00:00:00"); 

function actualizarContador() {
    const hoy = new Date();
    const diferenciaTiempo = hoy - FECHA_INICIO;
    const diasTranscurridos = Math.floor(diferenciaTiempo / (1000 * 60 * 60 * 24));
    
    const contadorElemento = document.getElementById("days-counter");
    if (contadorElemento) {
        contadorElemento.innerHTML = `💜 ${diasTranscurridos} días`;
    }
}

function startExperience() {
    const intro = document.getElementById("intro-screen");
    const mainInterface = document.getElementById("main-interface");
    const background = document.getElementById("bg-silhouettes");
    
    if (intro) intro.classList.add("fade-out");
    
    setTimeout(() => {
        if (intro) intro.style.display = "none";
        if (mainInterface) mainInterface.classList.remove("hidden");
        if (background) background.classList.add("show-bg");
        
        actualizarContador();
        
        const bgMusic = document.getElementById("bg-music");
        const musicSwitch = document.getElementById("music-switch");
        
        if (bgMusic) {
            bgMusic.volume = 0.5;
            bgMusic.play().then(() => {
                if (musicSwitch) musicSwitch.checked = true;
            }).catch(error => {
                console.log("El navegador bloqueó el audio automático.");
                if (musicSwitch) musicSwitch.checked = false;
            });
        }
    }, 2000); 
}

function toggleMusic() {
    const bgMusic = document.getElementById("bg-music");
    const switchInput = document.getElementById("music-switch");
    
    if (bgMusic && switchInput) {
        if (switchInput.checked) bgMusic.play();
        else bgMusic.pause();
    }
}

function toggleNarrator() {
    const bgMusic = document.getElementById("bg-music");
    const narrator = document.getElementById("narrator-audio");
    const icon = document.getElementById("audio-icon");
    const statusText = document.getElementById("narrator-status");

    if (!narrator) return;

    if (narrator.paused) {
        if (bgMusic && !bgMusic.paused) bgMusic.volume = 0.15;
        narrator.volume = 1.0;
        narrator.play();
        if (icon) icon.innerHTML = "⏸️";
        if (statusText) statusText.innerHTML = "Escuchando al Narrador...";
    } else {
        narrator.pause();
        if (icon) icon.innerHTML = "🔊";
        if (statusText) statusText.innerHTML = "Escucha cómo se cuenta nuestra historia...";
        if (bgMusic && !bgMusic.paused) bgMusic.volume = 0.5;
    }
}

window.addEventListener("DOMContentLoaded", () => {
    const narrator = document.getElementById("narrator-audio");
    if (narrator) {
        narrator.addEventListener("ended", () => {
            const bgMusic = document.getElementById("bg-music");
            const icon = document.getElementById("audio-icon");
            const statusText = document.getElementById("narrator-status");
            
            if (icon) icon.innerHTML = "🔊";
            if (statusText) statusText.innerHTML = "Escucha cómo se cuenta nuestra historia...";
            if (bgMusic && !bgMusic.paused) bgMusic.volume = 0.5;
        });
    }
});

function showSection(sectionId) {
    const sectionCuento = document.getElementById("section-cuento");
    const sectionElla = document.getElementById("section-ella");
    const sectionEl = document.getElementById("section-el");
    const sectionMomentos = document.getElementById("section-momentos"); // Nueva sección de fotos
    
    const navCuento = document.getElementById("nav-cuento");
    const navElla = document.getElementById("nav-ella");
    const navEl = document.getElementById("nav-el");
    const navMomentos = document.getElementById("nav-momentos"); // Nuevo botón del menú

    // Ocultar todas las secciones primero
    if (sectionCuento) sectionCuento.classList.add("hidden");
    if (sectionElla) sectionElla.classList.add("hidden");
    if (sectionEl) sectionEl.classList.add("hidden");
    if (sectionMomentos) sectionMomentos.classList.add("hidden");

    // Quitar la clase 'active' de todos los botones
    if (navCuento) navCuento.classList.remove("active");
    if (navElla) navElla.classList.remove("active");
    if (navEl) navEl.classList.remove("active");
    if (navMomentos) navMomentos.classList.remove("active");

    // Mostrar únicamente la sección seleccionada
    if (sectionId === 'cuento') {
        if (sectionCuento) sectionCuento.classList.remove("hidden");
        if (navCuento) navCuento.classList.add("active");
    } else if (sectionId === 'ella') {
        if (sectionElla) sectionElla.classList.remove("hidden");
        if (navElla) navElla.classList.add("active");
    } else if (sectionId === 'el') {
        if (sectionEl) sectionEl.classList.remove("hidden");
        if (navEl) navEl.classList.add("active");
    } else if (sectionId === 'momentos') {
        if (sectionMomentos) sectionMomentos.classList.remove("hidden");
        if (navMomentos) navMomentos.classList.add("active");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const paragraphs = document.querySelectorAll(".story-paragraph");
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });
    
    paragraphs.forEach(p => observer.observe(p));
});