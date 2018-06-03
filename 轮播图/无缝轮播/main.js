const frame = document.querySelector('.frame');
const slider = frame.querySelector('.slider');
const prewBtn = document.querySelector('.prew');
const nextBtn = document.querySelector('.next');
const dots = frame.querySelectorAll('.dots a');
const slidesNumber = slider.querySelectorAll('.slide:not(.clone)').length;
const offsetWidth = slider.querySelector('.slide').offsetWidth;
const delay = 1000;
let animated = false;
let target = 1;
let timer;
slider.style.left = `-${offsetWidth}px`;

function previous() {
    if (!animated) {
        target === 1 ? target = slidesNumber : target -= 1;
        moveSlide(offsetWidth);
        activeDot();
    };
}

function next() {
    if (!animated) {
        target === slidesNumber ? target = 1 : target += 1;
        moveSlide(-offsetWidth);
        activeDot();
    };
}

function moveSlide(offset) {
    animated = true;
    const time = 300;
    const interval = 10;
    const speed = offset / (time / interval);
    let newLeft = parseFloat(slider.style.left) + offset;

    function go() {
        let leftPosition = parseFloat(slider.style.left);
        if ((speed > 0 && leftPosition < newLeft) ||
            (speed < 0 && leftPosition > newLeft)) {
            slider.style.left = `${leftPosition + speed}px`;
            setTimeout(go, interval);
        } else {
            animated = false;
            if (newLeft > -offsetWidth) {
                slider.style.left = `-${offsetWidth * slidesNumber}px`;
            }
            if (newLeft < -offsetWidth * slidesNumber) {
                slider.style.left = `-${offsetWidth}px`;
            }
        }
    }
    go();
};

for (i in dots) {
    dots[i].index = parseInt(i) + 1;
};

function activeDot() {
    dots.forEach(dot => dot.classList.remove('active'));
    dots[target - 1].classList.add('active');
}

function clickDot() {
    if (this.className === 'active') return;
    const interval = this.index - target;
    const offset = -interval * offsetWidth;
    if (!animated) moveSlide(offset);
    target = this.index;
    activeDot();
}

function autoPlay() {
    timer = setInterval(next, delay);
}

function stopPlay() {
    clearInterval(timer);
}

autoPlay()
frame.addEventListener('mouseover', stopPlay);
frame.addEventListener('mouseout', autoPlay);
prewBtn.addEventListener('click', previous);
nextBtn.addEventListener('click', next);
dots.forEach(dot => dot.addEventListener('click', clickDot));