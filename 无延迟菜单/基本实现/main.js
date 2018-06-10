const wrapper = document.querySelector('.wrapper');
const cateMenu = wrapper.querySelector('.cate_menu');
const cateItem = cateMenu.querySelectorAll('.cate_menu_item');
const sub = wrapper.querySelector('.cate_pop');
let activeRow;
let activeMenu;
let timer;
let mouseInSub = false;
const mouseTrack = [];

const moveHandler = e => {
    mouseTrack.push({
        x: e.pageX,
        y: e.pageY
    });
    if (mouseTrack.length > 3) {
        mouseTrack.shift();
    };
};

sub.onmouseenter = () => {
    mouseInSub = true;
};
sub.onmouseleave = () => {
    mouseInSub = false;
};

wrapper.onmouseenter = () => {
    sub.classList.remove('hide');
    document.addEventListener('mousemove', moveHandler);
};

wrapper.onmouseleave = () => {
    sub.classList.add('hide');

    if (activeRow) {
        activeRow.classList.remove('active');
        activeRow = null;
    };

    if (activeMenu) {
        activeMenu.classList.remove('active');
        activeMenu = null;
    };

    document.removeEventListener('mousemove', moveHandler);
};


cateItem.forEach(i => i.onmouseenter = e => {
    if (!activeRow) {
        activeRow = e.target;
        activeRow.classList.add('active');
        activeMenu = document.getElementById(activeRow.dataset.id);
        activeMenu.classList.remove('hide');
        return;
    };

    if (timer) {
        clearTimeout(timer)
    }

    const currMousePos = mouseTrack[mouseTrack.length - 1]
    const leftCorner = mouseTrack[mouseTrack.length - 2]

    const delay = needDelay(sub, leftCorner, currMousePos);

    if (delay) {

        timer = setTimeout(() => {
            if (mouseInSub) return;
            // console.log(activeRow);  多次移入移出有BUG待修复
            // main.js:73 Uncaught TypeError: Cannot read property 'classList' of null
            // at setTimeout (main.js:73)
            // setTimeout @ main.js:73
            // setTimeout (async)
            // i.onmouseenter.e @ main.js:70
            activeRow.classList.remove('active');
            activeMenu.classList.add('hide');

            activeRow = e.target;
            activeRow.classList.add('active');
            activeMenu = document.getElementById(activeRow.dataset.id);
            activeMenu.classList.remove('hide');
            timer = null;
        }, 500);
    } else {
        const prevActiveRow = activeRow;
        const prevActiveMenu = activeMenu;

        activeRow = e.target;
        activeMenu = document.getElementById(activeRow.dataset.id);

        prevActiveMenu.classList.add('hide');
        prevActiveRow.classList.remove('active');

        activeRow.classList.add('active');
        activeMenu.classList.remove('hide');
    }
})