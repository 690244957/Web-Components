function fadeOut(el, ms) {
    var opacity = 1,
        interval = 60,
        gap = interval / ms;

    function func() {
        opacity -= gap;
        el.style.opacity = opacity;

        if (opacity <= 0) {
            clearInterval(fading);
            // el.style.display = 'none';
            el.classList.remove("on");
        }
    }

    var fading = setInterval(func, interval);

}


function fadeIn(el, ms) {
    var opacity = 0,
        interval = 60,
        gap = interval / ms;

    el.classList.add("on");
    // el.style.display = 'block';
    el.style.opacity = opacity;

    function func() {
        opacity += gap;
        el.style.opacity = opacity;

        if (opacity >= 1) {
            clearInterval(fading);
        }
    }

    var fading = setInterval(func, interval);

}