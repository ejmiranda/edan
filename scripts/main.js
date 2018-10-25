const year = document.querySelector(`.year`);
const services = document.querySelector(`.services`);
const content = document.querySelector(`.content`);

year.textContent = new Date().getFullYear();

//content.style.height = `${services.getBoundingClientRect().bottom}px`;
