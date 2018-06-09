const wrapper = document.querySelector('.wrapper');
const divs = wrapper.querySelectorAll("div[id^='bili_']");
const elevator = document.querySelector('.elevator');
const navList = elevator.querySelector('.nav-list');
const items = navList.querySelectorAll(".nav-list>.item.sortable");
const backToTop = elevator.querySelector('.back-top');

// 点击到达楼层
function jumpToDiv() {
    const index = this.getAttribute('sortindex');
    smoothScrollTo(divs[index].offsetTop - 100)
    hightlight(index);
}

// 高亮楼层
function hightlight(index) {
    items.forEach(item => item.classList.remove('on'));
    items[index].classList.add('on');
}

// 电梯位置控制
function moveElevator() {
    window.scrollY >= 250 ? elevator.style.top = '180px' : elevator.style.top = '250px'
}

// 滚动到指定模块位置联动电梯高亮楼层
function linkElevator() {
    let scrollDistance = window.scrollY;
    for (i in divs) {
        if (divs[i].offsetTop <= scrollDistance +200) {
            hightlight(i);
        } else if (divs[0].offsetTop > scrollDistance +200){
            items.forEach(item => item.classList.remove('on'));
        }
    }
}

// 滚动控制
function smoothScrollTo(top) {
    window.scroll({
        top: top,
        behavior: "smooth"
    })
}

items.forEach(item => item.addEventListener("click", jumpToDiv));
backToTop.addEventListener('click', () => smoothScrollTo(0));
window.addEventListener('scroll', moveElevator);
window.addEventListener('scroll', linkElevator);