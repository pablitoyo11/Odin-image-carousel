// Carousel image folder list
const imageList = [
  "images/43414f  a4a.jpeg",
  "images/535a  f.jpeg",
  "images/asd.jpeg",
  "images/asd232.jpeg",
];

// Create carousel elements
const container = document.createElement("div");
container.className = "carousel-container";

const frame = document.createElement("div");
frame.className = "carousel-frame";

const slides = document.createElement("div");
slides.className = "carousel-slides";
slides.style.display = "flex";
slides.style.transition = "none";
slides.style.width = `${imageList.length * 100}%`;

// Add images as slides
imageList.forEach((src) => {
  const imgWrap = document.createElement("div");
  imgWrap.style.flex = `0 0 ${100 / imageList.length}%`;
  imgWrap.style.display = "flex";
  imgWrap.style.justifyContent = "center";
  imgWrap.style.alignItems = "center";
  const img = document.createElement("img");
  img.src = src;
  img.className = "carousel-image";
  imgWrap.appendChild(img);
  slides.appendChild(imgWrap);
});

// Arrow buttons
const prevBtn = document.createElement("button");
prevBtn.className = "carousel-arrow left";
const nextBtn = document.createElement("button");
nextBtn.className = "carousel-arrow right";

// Dots navigation
const dots = document.createElement("div");
dots.className = "carousel-dots";
let dotElements = [];
imageList.forEach((img, idx) => {
  const dot = document.createElement("span");
  dot.className = "carousel-dot";
  dot.onclick = () => {
    current = idx;
    updateSlide();
  };
  dots.appendChild(dot);
  dotElements.push(dot);
});

// Slide Btn and auto-slide logic
let current = 0;
let autoSlideInterval = null;

function updateSlide() {
  slides.style.transform = `translateX(-${
    (100 / imageList.length) * current
  }%)`;
  dotElements.forEach((dot, idx) => {
    dot.classList.toggle("active", idx === current);
  });
}

function prevSlide() {
  current = (current - 1 + imageList.length) % imageList.length;
  updateSlide();
}

function nextSlide() {
  current = (current + 1) % imageList.length;
  updateSlide();
}

function startAutoSlide() {
  if (autoSlideInterval) clearInterval(autoSlideInterval);
  autoSlideInterval = setInterval(nextSlide, 3000);
}

prevBtn.onclick = () => {
  prevSlide();
  startAutoSlide();
};
nextBtn.onclick = () => {
  nextSlide();
  startAutoSlide();
};
dotElements.forEach((dot, idx) => {
  dot.onclick = () => {
    current = idx;
    updateSlide();
    startAutoSlide();
  };
});

// Append All together
frame.appendChild(prevBtn);
frame.appendChild(slides);
frame.appendChild(nextBtn);
container.appendChild(frame);
container.appendChild(dots);

updateSlide();
startAutoSlide();

export default container;
