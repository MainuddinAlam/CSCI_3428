// register the scroll triggered animation plugin
gsap.registerPlugin(ScrollTrigger);

// reference to DOM element
const navbar = document.querySelector("nav");
const main = document.querySelector("main");

// constant
// tablet width
const TABLET_WIDTH = 768;

// variable
// keep track of previous scroll position
let scrollPosition = 0;

let bodyScrollBar;

function enableSmoothScroll() {
    // check if user is on mobile to disable smooth scrolling
    if (window.innerWidth > TABLET_WIDTH) {
        // remove any smooth scrollbar instance before
        Scrollbar.destroyAll();
        // Setup
        bodyScrollBar = Scrollbar.init(main, {
            damping: 0.1,
            delegateTo: document,
            syncCallbacks: true,
        });

        ScrollTrigger.scrollerProxy(main, {
            scrollTop(value) {
                if (arguments.length) {
                    bodyScrollBar.scrollTop = value;
                }
                return bodyScrollBar.scrollTop;
            },
        });

        bodyScrollBar.addListener(ScrollTrigger.update);

        ScrollTrigger.defaults({ scroller: main });

        bodyScrollBar.addListener((status) => {
            // get the scroll position on scroll
            const scrollY = status.offset.y;
            // scroll distance for which the bar will not be hidden
            const navVisibleDistance = headerImgContainer.offsetHeight - 200;

            // check if it greater than the last scroll position
            if (scrollY < navVisibleDistance || scrollY <= scrollPosition) {
                // show nav bar
                navbar.style.transform = "translateY(0)";
            } else {
                // hide nav bar
                navbar.style.transform = "translateY(-150%)";
            }

            // update the scroll position variable
            scrollPosition = scrollY;
        });
    } else {
        // enable nav bar presence toggling for native scrolling
        // monitor the user scrolling for the navbar visibility
        document.addEventListener("scroll", (e) => {
            // get the scroll position on scroll
            const scrollY = window.scrollY;
            // scroll distance for which the bar will not be hidden
            const navVisibleDistance = headerImgContainer.offsetHeight - 200;

            // check if it greater than the last scroll position
            if (scrollY < navVisibleDistance || scrollY <= scrollPosition) {
                // show nav bar
                navbar.style.transform = "translateY(0)";
            } else {
                // hide nav bar
                navbar.style.transform = "translateY(-150%)";
            }

            // update the scroll position variable
            scrollPosition = scrollY;
        });
    }
}

// enable smooth scrolling
enableSmoothScroll();

// monitor window resizing to re enable smooth scrolling or disable it
window.addEventListener("resize", () => {
    enableSmoothScroll();
});
