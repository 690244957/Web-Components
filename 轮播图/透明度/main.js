const frame = document.querySelector('.frame');
const slider = frame.querySelector('.slider');
const slides = slider.querySelectorAll('.slide');
const slidesNumber = slider.querySelectorAll('.slide').length;
const prewBtn = document.querySelector('.prew');
const nextBtn = document.querySelector('.next');
const dots = frame.querySelectorAll('.dots a');
const delay = 2000;
let index = 0;
let timer;
let animated = false;

function switchSlide(index) {
    animated = true;
    slides.forEach(s => s.classList.remove('show'));
    slides[index].classList.add('show');
}

function previous() {
    if (!animated) {
        index === 0 ? index = slidesNumber - 1 : index -= 1;
        switchSlide(index);
        activeDot();
    }
}

function next() {
    if (!animated) {
        index === slidesNumber - 1 ? index = 0 : index += 1;
        switchSlide(index);
        activeDot();
    }
}

function activeDot() {
    dots.forEach(dot => dot.className = '');
    dots[index].className = 'active';
}

function clickDot() {
    if (this.className === 'active') return;
    index = this.index;
    if (!animated) {
        switchSlide(index)
        activeDot();
    }
}

function autoPlay() {
    next();
    frame.onmouseover = () => clearInterval(timer);
    frame.onmouseout = () => timer = setInterval(autoPlay, delay);
}
for (i in dots) {
    dots[i].index = parseInt(i);
}

timer = setInterval(autoPlay, delay);
prewBtn.addEventListener('click', previous);
nextBtn.addEventListener('click', next);
dots.forEach(dot => dot.addEventListener('click', clickDot));
slides.forEach(s => s.addEventListener('transitionend', () => animated = false));