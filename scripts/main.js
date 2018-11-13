const topBtn = document.querySelector(`.top`);
const header = document.querySelector(`header`);
const navi = document.querySelectorAll(`.nav-item`);
const logo = document.querySelector(`.logo`);
const slides = document.querySelectorAll(`.slide`);
const dots = document.querySelectorAll(`.dot`);
const prevBtn = document.querySelector(`.previous`);
const nextBtn = document.querySelector(`.next`);
const year = document.querySelector(`.year`);
const textArea = document.querySelector(`textarea`);
const limit = document.querySelector(`.limit`);
const chars = document.querySelector(`.chars`);
const max = document.querySelector(`.max`);

let index = 0;
let isAfterLoad = true;

window.addEventListener(`scroll`, trackScroll);

if (topBtn) {
  topBtn.addEventListener(`click`, backToTop);
}

if (dots[0]) {
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

if (chars) {
  showChars();
  textArea.addEventListener(`input`, () => {
    showChars();
  });
}

/* https://codepen.io/alexandr-kazakov/pen/yMRPOR?editors=0010 
   Original by Alexandr Kazakov
   Modified by Edgar Miranda
*/

function trackScroll() {
  let currentY = window.pageYOffset;
  let scrollThreshold = 200;

    if (currentY > scrollThreshold) {
      topBtn.classList.add('show');
    }
    if (currentY < scrollThreshold) {
      topBtn.classList.remove('show');
    }
}

/* https://codepen.io/alexandr-kazakov/pen/yMRPOR?editors=0010 
   Original by Alexandr Kazakov
   Modified by Edgar Miranda
*/

function backToTop() {
  if (window.pageYOffset > 0) {
    window.scrollBy(0, -80);
    setTimeout(backToTop, 10);
  }
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

function setNextSlideIndex() {
  index = (index < 3) ? ++index : 0;
}

if (slides[0]) {
  showSlideAuto();
}

function showSlideAuto() {
  window.setTimeout(() => {
    setNextSlideIndex();
    showSlide(index);
    showSlideAuto();
  }, 10000); 
}

function showChars() {
  if (textArea.value.length >= textArea.maxLength - 10) {
    limit.classList.add(`near-max`);
  } else {
    limit.classList.remove(`near-max`);
  }
  chars.textContent = textArea.value.length;
  max.textContent = textArea.maxLength;
}

if (year) {
  year.textContent = new Date().getFullYear();
}