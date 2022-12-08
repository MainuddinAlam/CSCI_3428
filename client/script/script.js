/**
 * The purpose of this file is to add the behaviors and animation that are
 * shared by all pages.
 *
 * - Behaviours and animation for the naviagation bar
 * - momentum scrollbar
 *
 * Author: Agowun Muhammad Altaf (A00448118)
 */

// register the scroll triggered animation plugin
gsap.registerPlugin(ScrollTrigger);

// reference to DOM element
// reference to the navbar
const navbar = document.querySelector("nav");
// reference to the main document use for adding the momentum scrollbar
const main = document.querySelector("main");
// reference to the menu list to be hidden when on mobile
const menu = navbar.querySelector("#menu");
// reference to the links of the pages
const menuLinks = navbar.querySelector("ul");
// reference to the menu button when on mobile
const menuText = menu.querySelector("p");

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
// flag if the menu is open
let isMenuOpen = false;
// store the reference for the scroll behaviour
let bodyScrollBar;

/**
 * add the smooth scrolling effect to every page that the script is run in,
 * provided the user is on desktop
 *
 * Author: Agowun Muhammad Altaf (A00448118)
 *
 * @param element the HTML element to which to add the smooth scrolling behaviour
 */
function enableSmoothScroll(element) {
    // check if user is on decktop to disable smooth scrolling
    if (window.innerWidth > TABLET_WIDTH) {
        // remove any smooth scrollbar instance before
        Scrollbar.destroyAll();
        // setup for the scrolling
        bodyScrollBar = Scrollbar.init(element, {
            damping: 0.1,
            delegateTo: document,
            syncCallbacks: true,
        });

        ScrollTrigger.scrollerProxy(element, {
            scrollTop(value) {
                if (arguments.length) {
                    bodyScrollBar.scrollTop = value;
                }
                return bodyScrollBar.scrollTop;
            },
        });

        bodyScrollBar.addListener(ScrollTrigger.update);

        ScrollTrigger.defaults({ scroller: element });

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
enableSmoothScroll(main);

// make the menu button when on mobile open/close the navigation menu
menu.addEventListener("click", () => {
    menuToggle();
});

/**
 * show/hide the list of links.
 *
 * - toggle the flag for the state of the menu list presence
 * - animate the menu list in view or out of view based on the isMenuOpen flag
 *
 * Author: Agowun Muhammad Altaf (A00448118)
 */
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
