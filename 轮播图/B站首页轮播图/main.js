const carousel = document.querySelector('.carousel');
const panel = carousel.querySelector('.panel');
const pic = panel.querySelector('.pic');
const slides = pic.querySelectorAll('li');
const title = panel.querySelector('.title');
const titles = title.querySelectorAll('a');
const trig = panel.querySelector('.trig');
const dots = trig.querySelectorAll('span');
let index = 0;
let timer;
const delay = 2000;
timer = setInterval(autoPlay, delay);

function moveSlide() {
    if (index > slides.length - 1) index = 0;
    pic.style.marginLeft = `${-index * 100}%`;
    showTitle();
    activeDot();
}

function showTitle() {
    titles.forEach(title => title.className = '');
    titles[index].className = 'on';
}

function activeDot() {
    dots.forEach(dot => dot.className = '');
    dots[index].className = 'on';
}

function clickDot() {
    if (this.className === 'on') return;
    index = this.index;
    moveSlide();
}

function autoPlay() {
    index++;
    moveSlide();
}

for (i in dots) {
    dots[i].index = i
};

panel.addEventListener('mouseover', () => clearInterval(timer));
panel.addEventListener('mouseleave', () => timer = setInterval(autoPlay, delay));
dots.forEach(dot => dot.addEventListener('click', clickDot));
slides.forEach(slide => slide.addEventListener('mouseover', () => slide.querySelector('.more-text').style.opacity = '1'));
slides.forEach(slide => slide.addEventListener('mouseleave', () => slide.querySelector('.more-text').style.opacity = ''));