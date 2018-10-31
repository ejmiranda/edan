const slides = document.querySelectorAll(`.slide`);
const prevBtn = document.querySelector(`.previous`);
const nextBtn = document.querySelector(`.next`);
const dots = document.querySelectorAll(`.dot`);

let index = 0;
let isAfterLoad = true;

prevBtn.addEventListener(`click`, () => {
  index = (index > 0) ? --index : slides.length - 1;
  showSlide(index);
});

nextBtn.addEventListener(`click`, () => {
  index = (index < 3) ? ++index : 0;
  showSlide(index);
});

for (let [dotIndex, dot] of dots.entries()) {
  dot.addEventListener(`click`, () => {
    index = dotIndex;
    showSlide(index);
  });
}

function showSlide(index) {
  if (isAfterLoad) slides[0].classList.add(`fading`);
  slides.forEach((slide) => slide.classList.remove(`active`));
  dots.forEach((dot) => dot.classList.remove(`selected`));
  slides[index].classList.add(`active`);
  dots[index].classList.add(`selected`);
}

updateCopyrightYear();

function updateCopyrightYear() {
  const year = document.querySelector(`.year`);
  year.textContent = new Date().getFullYear();
}