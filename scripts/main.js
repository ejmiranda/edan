const slides = document.querySelectorAll(`.slide`);
const dots = document.querySelectorAll(`.dot`);
const prevBtn = document.querySelector(`.previous`);
const nextBtn = document.querySelector(`.next`);

let index = 0;
let isAfterLoad = true;

if (dots) {
  for (let [dotIndex, dot] of dots.entries()) {
    dot.addEventListener(`click`, () => {
      index = dotIndex;
      showSlide(index);
    });
  }
}

if (prevBtn) {
  prevBtn.addEventListener(`click`, () => {
    index = (index > 0) ? --index : slides.length - 1;
    showSlide(index);
  });
}

if (nextBtn) {
  nextBtn.addEventListener(`click`, () => {
    setNextSlideIndex();
    showSlide(index);
  });
}

function showSlideAuto() {
  window.setTimeout(() => {
    setNextSlideIndex();
    showSlide(index);
    showSlideAuto();
  }, 10000); 
}

function setNextSlideIndex() {
  index = (index < 3) ? ++index : 0;
}

function showSlide(index) {
  if (isAfterLoad && index !== 0) {
    slides[0].classList.add(`fading`);
    isAfterLoad = false;
  }
  slides.forEach((slide) => slide.classList.remove(`active`));
  dots.forEach((dot) => dot.classList.remove(`selected`));
  slides[index].classList.add(`active`);
  dots[index].classList.add(`selected`);
}

function updateCopyrightYear() {
  const year = document.querySelector(`.year`);
  year.textContent = new Date().getFullYear();
}

showSlideAuto();
updateCopyrightYear();