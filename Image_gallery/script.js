let currentIndex = 0;
let images = [];

function openLightbox(imgElement) {
  images = Array.from(document.querySelectorAll('.gallery-item')).filter(i => i.style.display !== "none");
  currentIndex = images.indexOf(imgElement);

  document.getElementById('lightbox-img').src = imgElement.src;
  document.getElementById('lightbox').style.display = 'flex';
}

function closeLightbox() {
  document.getElementById('lightbox').style.display = 'none';
}

function changeImage(direction) {
  currentIndex = (currentIndex + direction + images.length) % images.length;
  document.getElementById('lightbox-img').src = images[currentIndex].src;
}

function filterImages(category) {
  const items = document.querySelectorAll('.gallery-item');
  items.forEach(img => {
    if (category === 'all' || img.classList.contains(category)) {
      img.style.display = '';
    } else {
      img.style.display = 'none';
    }
  });
}
