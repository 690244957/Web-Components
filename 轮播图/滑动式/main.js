const frame = document.querySelector('.frame');
const slider = frame.querySelector('.slider');
const slides = slider.querySelectorAll('.slide');
const prewBtn = document.querySelector('.prew');
const nextBtn = document.querySelector('.next');
const dots = frame.querySelectorAll('.dots a');
const slidesNumber = slides.length;
let target = 0; // 当前幻灯片的索引值
let timer;
const delay = 4000;
timer = setInterval(autoPlay, delay);

function autoPlay() {
    next();
    // frame.addEventListener('mouseover', ()=> {console.log('over');clearInterval(timer)});
    // frame.addEventListener('mouseout', ()=> {console.log('out');timer = setInterval(autoPlay,1000)});
    frame.onmouseover = () => clearInterval(timer);
    frame.onmouseout = () => timer = setInterval(autoPlay, delay);
}

function previous() {
    target === 0 ? target = slidesNumber - 1 : target -= 1;
    moveSlide(target);
    activeDot();
}

function next() {
    target === slidesNumber - 1 ? target = 0 : target += 1;
    moveSlide(target);
    activeDot();
}

function moveSlide(index) {
    slider.style.left = `-${index * 100}%`;
}

for (let i = 0; i < dots.length; i++) {
    dots[i].index = i;
}

function activeDot() {
    target === slidesNumber ? target = 0 : target;
    console.log(target);
    moveSlide(target);
    dots.forEach(dot => dot.classList.remove('active'));
    dots[target].classList.add('active');
}

function clickDot() {
    target = this.index;
    moveSlide(target);
    activeDot();
}

activeDot();
prewBtn.addEventListener('click', previous);
nextBtn.addEventListener('click', next);
dots.forEach(dot => dot.addEventListener('click', clickDot));