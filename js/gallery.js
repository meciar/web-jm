const galleryGrid = document.getElementById("gallery-grid");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxCaption = document.getElementById("lightbox-caption");
const lightboxClose = document.querySelector(".lightbox-close");

function openLightbox(item) {
  lightboxImage.src = item.src;
  lightboxImage.alt = item.alt || item.title || "Obrázok v galérii";
  lightboxCaption.textContent = item.title || item.alt || "";
  lightbox.showModal();
}

function closeLightbox() {
  lightbox.close();
  lightboxImage.removeAttribute("src");
}

lightboxClose.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

lightbox.addEventListener("cancel", () => {
  lightboxImage.removeAttribute("src");
});

function renderGallery(items) {
  galleryGrid.innerHTML = "";

  if (!items.length) {
    galleryGrid.innerHTML = '<p class="gallery-empty">Galéria zatiaľ neobsahuje žiadne obrázky.</p>';
    return;
  }

  for (const item of items) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "gallery-item";
    button.setAttribute("aria-label", item.title || item.alt || "Otvoriť obrázok");

    const image = document.createElement("img");
    image.src = item.src;
    image.alt = item.alt || item.title || "";
    image.loading = "lazy";

    button.appendChild(image);
    button.addEventListener("click", () => openLightbox(item));
    galleryGrid.appendChild(button);
  }
}

async function loadGallery() {
  try {
    const response = await fetch("/gallery/manifest.json", { cache: "no-cache" });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    const items = Array.isArray(data) ? data : data.items || [];
    renderGallery(items);
  } catch (error) {
    console.error("Nepodarilo sa načítať galériu:", error);
    galleryGrid.innerHTML =
      '<p class="gallery-error">Galériu sa nepodarilo načítať. Skontrolujte súbor gallery/manifest.json.</p>';
  }
}

loadGallery();
