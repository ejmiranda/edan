const header = document.querySelector(`header`);
const navi = document.querySelectorAll(`.nav-item`);
const logo = document.querySelector(`.logo`);
const slides = document.querySelectorAll(`.slide`);
const dots = document.querySelectorAll(`.dot`);
const prevBtn = document.querySelector(`.previous`);
const nextBtn = document.querySelector(`.next`);
const year = document.querySelector(`.year`);

let index = 0;
let isAfterLoad = true;

window.addEventListener(`scroll`, () => {
  makeStickyHeader();
});

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

if (slides) {
  showSlideAuto();
}

function showSlideAuto() {
  window.setTimeout(() => {
    setNextSlideIndex();
    showSlide(index);
    showSlideAuto();
  }, 10000); 
}

function makeStickyHeader() {
  if (window.pageYOffset > 0) {
    header.classList.add(`sticky`);
  } else {
    header.classList.remove(`sticky`);
  }
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

if (year) {
  year.textContent = new Date().getFullYear();
}