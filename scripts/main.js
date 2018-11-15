const topBtn = document.querySelector(`.top`);
const slides = document.querySelectorAll(`.slide`);
const prevBtn = document.querySelector(`.previous`);
const nextBtn = document.querySelector(`.next`);
const dots = document.querySelectorAll(`.dot`);
const form = document.querySelector(`form`);
const name = document.querySelector(`#name`);
const email = document.querySelector(`#email`);
const textArea = document.querySelector(`textarea`);
const limit = document.querySelector(`.limit`);
const chars = document.querySelector(`.chars`);
const max = document.querySelector(`.max`);
const year = document.querySelector(`.year`);

let index = 0;
let isAfterLoad = true;

window.addEventListener(`scroll`, trackScroll);
topBtn.addEventListener(`click`, backToTop);

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

if (slides[0]) {
  
  showSlideAuto();

  prevBtn.addEventListener(`click`, () => {
    index = (index > 0) ? --index : slides.length - 1;
    showSlide(index);
  });

  nextBtn.addEventListener(`click`, () => {
    setNextSlideIndex();
    showSlide(index);
  });

  for (let [dotIndex, dot] of dots.entries()) {
    dot.addEventListener(`click`, () => {
      index = dotIndex;
      showSlide(index);
    });
  }

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

if (form) {
  
  name.addEventListener(`input`, () => {
    setErrorState(
        name.nextElementSibling, 
        false,
        ``);
  });

  email.addEventListener(`input`, () => {
    setErrorState(
        email.nextElementSibling, 
        false,
        ``);
  });

  form.addEventListener(`submit`, (event) => {
    if (email.validity.valueMissing) {
      setErrorState(
          email.nextElementSibling, 
          true,
          `Por favor llena este campo`);
      event.preventDefault();
    }
    if (email.validity.typeMismatch) {
      setErrorState(
          email.nextElementSibling, 
          true,
          `Por favor introduce una dirección de correo válida`);
      event.preventDefault();
    }
    if (name.validity.valueMissing) {
      setErrorState(
          name.nextElementSibling, 
          true,
          `Por favor llena este campo`);
      event.preventDefault();
    }
  });

  showChars();
  textArea.addEventListener(`input`, () => {
    showChars();
  });

}

function setErrorState(label, isError, msg) {
  label.previousElementSibling.focus();
  label.textContent = msg;
  if (isError) {
    label.classList.add(`error`);
  } else {
    label.classList.remove(`error`);
  }
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