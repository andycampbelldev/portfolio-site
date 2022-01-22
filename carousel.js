const initCarousel = () => {
    // get all carousel items
    const carouselImages = document.querySelectorAll('.carousel-item');
    // set the first item to be active
    carouselImages[0].classList.add('active');
    // set the second item to be up next
    carouselImages[1].classList.add('right');
    // set the very last item to be the previous item if the carousel is reversed
    const i = carouselImages.length - 1;
    carouselImages[i].classList.add('left');
    setCarouselHeight();
}

const setCarouselHeight = () => {
        // get all carousel items
        const carouselImages = document.querySelectorAll('.carousel-item');
        // get max height of all carousel items and apply this height to the carousel-wrapper
        let height = Math.max(...Array.from(carouselImages).map(el => el.clientHeight));
        document.querySelector('.carousel-wrapper').style.height = `${height}px`;
}

const advanceCarousel = (num) => {
    if (num != -1 && num != 1) {
        return 'Invalid argument. Valid arguments are -1 to reverse the carousel or 1 to advance';
    }
    // set window variable to indicate carousel is currently moving - prevents rapid swipe gestures
    carouselActive = true;
    // get all carousel items
    const carouselImages = document.querySelectorAll('.carousel-item');
    // disable controls
    const carouselButtons = document.querySelectorAll('.carousel-controls button');
    carouselButtons.forEach(button => button.setAttribute('disabled', true));
    // get the current index positions of left, active and right carousel items
    const maxIndex = carouselImages.length - 1;
    const currentLeft = Array.prototype.indexOf.call(carouselImages, document.querySelector('.carousel-item.left'));
    const currentActive = Array.prototype.indexOf.call(carouselImages, document.querySelector('.carousel-item.active'));
    const currentRight = Array.prototype.indexOf.call(carouselImages, document.querySelector('.carousel-item.right'));
    // determine new positions
    const newActive = num > 0 ? currentRight : currentLeft;
    const newLeft = newActive - 1 >= 0 ? newActive - 1 : maxIndex;
    const newRight = newActive + 1 <= maxIndex ? newActive + 1 : 0;
    // move slides
    carouselImages[newActive].classList.add('active');
    carouselImages[newRight].classList.add('right');
    carouselImages[newLeft].classList.add('left');
    carouselImages[currentRight].classList.remove('right');
    carouselImages[currentLeft].classList.remove('left');
    setTimeout(() => {
        carouselImages[currentActive].classList.remove('active');
        // re-enable carousel controls
        carouselButtons.forEach(button => button.removeAttribute('disabled'));
        // update window variable to indicate carousel not active
        carouselActive = false;
    }, 700);
}

// swipe gestures for mobile carousel - modified from https://stackoverflow.com/a/23230280

let xDown = null;
let yDown = null;
let carouselActive = false;

const handleTouchDown = evt => {
    const touchDown = evt.touches[0];
    xDown = touchDown.clientX;
    yDown = touchDown.clientY;
}

const handleTouchUp = evt => {
    if (!xDown || !yDown) {
        return;
    }
    const touchUp = evt.changedTouches[0];
    let xUp = touchUp.clientX;
    let yUp = touchUp.clientY;

    let xDiff = xDown - xUp;
    let yDiff = yDown - yUp;

    xDown = null;
    yDown = null;

    return { xDiff, yDiff }
}

const handleCarouselSwipe = evt => {
    // do not run if carousel already active
    if (!carouselActive) {
        const { xDiff, yDiff } = handleTouchUp(evt);
        // require x distance to be greater than 100px so not overly sensitive
        if (Math.abs(xDiff) > 100) {
            if (xDiff > 0) {
                //left swipe
                advanceCarousel(1)
            } else if (xDiff < 0) {
                //right swipe
                advanceCarousel(-1)
            }
        } 
    }
}

// add event handlers for carousel horizontal swipe gestures
document.querySelector('.carousel-controls').addEventListener('touchstart', handleTouchDown, false);
document.querySelector('.carousel-controls').addEventListener('touchend', handleCarouselSwipe, false);

// add event listeners for carousel control buttons
document.querySelector('.carousel-left').addEventListener('click', () => {
    advanceCarousel(-1);
});

document.querySelector('.carousel-right').addEventListener('click', () => {
    advanceCarousel(1);
});

// add event listener to window to resize carousel if window size changes to ensure responsive behavior (needed for changing orientation on mobile)
window.addEventListener('resize', setCarouselHeight);

initCarousel();