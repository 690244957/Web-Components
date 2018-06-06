const slideList = document.querySelector('.slide-list');
const slideItem = slideList.querySelectorAll('.slide-item');
const slideDots = document.querySelectorAll('.slide-dots li a')
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
let index = 1;
let animated = false;

function prevSlide() {
    if (!animated) {
        index === 1 ? index = 4 : index -= 1;
        moveSlide(675);
        activeDot();
    }
}

function nextSlide() {
    if (!animated) {
        index === 4 ? index = 1 : index += 1;
        moveSlide(-675);
        activeDot();
    }
}

function moveSlide(offset) {
    animated = true;
    const time = 300;
    const interval = 20;
    const speed = offset / (time / interval);
    const newLeft = parseInt(slideList.style.left) + offset;

    function go() {
        let leftPosition = parseInt(slideList.style.left);
        if ((speed > 0 && leftPosition < newLeft) ||
            (speed < 0 && leftPosition > newLeft)) {
            slideList.style.left = `${leftPosition + speed}px`;
            setTimeout(go, interval);
        } else {
            animated = false;
            if (newLeft > -675) {
                slideList.style.left = -2700 + 'px';
            }
            if (leftPosition < -2700) {
                slideList.style.left = -675 + 'px';
            }
        }
    }
    go();
}

function clickDot() {
    if (this.className === 'active') return;
    const offset = parseInt(this.dataset.index) - index;
    if (!animated) {
        moveSlide(-offset * 675)
        index = parseInt(this.dataset.index);
        activeDot()
    }
}

function activeDot() {
    slideDots.forEach(dot => dot.className = '');
    slideDots[index - 1].className = 'active';
}

prev.addEventListener('click', prevSlide);
next.addEventListener('click', nextSlide);
slideDots.forEach(dot => dot.addEventListener('click', clickDot));