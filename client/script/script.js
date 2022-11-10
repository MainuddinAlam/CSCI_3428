// register the scroll triggered animation plugin
gsap.registerPlugin(ScrollTrigger);

// reference to DOM element
const navbar = document.querySelector("nav");
const main = document.querySelector("main");
const menu = navbar.querySelector("#menu");
const menuLinks = navbar.querySelector("ul");
const menuText = menu.querySelector("p");
const footer = document.querySelector("#footer");
const footerWrapper = footer.querySelector("#footerWrapper");

// constant
// server url
const SERVER_URL = "http://140.184.230.209:3026";

// tablet width
const TABLET_WIDTH = 768;
// mobile width
const MOBILE_WIDTH = 640;

// variable
// keep track of previous scroll position
let scrollPosition = 0;

let isMenuOpen = false;

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

            // check if it greater than the last scroll position
            if (scrollY <= scrollPosition || isMenuOpen) {
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
            const navVisibleDistance = 200;

            // check if it greater than the last scroll position
            if (scrollY <= scrollPosition || isMenuOpen) {
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

menu.addEventListener("click", () => {
    menuToggle();
});

function menuToggle() {
    // toggle expanding the navabr when on mobile
    isMenuOpen = !isMenuOpen;

    // animate the transition of the text in the expand menu button
    gsap.timeline()
        .to(menuText, {
            translateY: isMenuOpen ? "120%" : "-120%",
            duration: 0.3,
            ease: Circ.easeIn,
        })
        .set(menuText, {
            translateY: isMenuOpen ? "-120%" : "120%",
        })
        .call(() => (menuText.innerText = isMenuOpen ? "Close" : "Menu"))
        .to(menuText, {
            translateY: 0,
            duration: 0.3,
            ease: Circ.easeOut,
        });

    // animate the list of links visibility
    gsap.timeline().to(menuLinks, {
        clipPath: isMenuOpen
            ? "polygon(0 0, 100% 0%, 100% 100%, 0% 100%)"
            : "polygon(0 0, 100% 0%, 100% 0%, 0% 0%)",
        duration: 0.6,
        ease: Circ.easeInOut,
    });
}

function enableFooterReveal() {
    gsap.from(footerWrapper, {
        translateY: "-30%",
        scrollTrigger: {
            trigger: footer,
            start: "top bottom",
            end: "bottom bottom",
            scrub: true,
        },
    });
}
