/**
 * The purpose of this file is to add the behaviors and animation for the index
 * page. The index page is divided into different sections.
 *
 * Header:
 * animate the image, description and indicator in the header section.
 *
 * Fauna & Flora:
 * add parallax effect to the images.
 *
 * Map:
 * animate the entrance of the path and markers on the map when the map enters
 * the screen, add the markers behavior with panel sliding into view and close
 * button being position on the marker.
 *
 * Author: Agowun Muhammad Altaf (A00448118)
 */

// constants
// amount of time each descriptions and images will be displayed
const HEADER_PRESENCE_TIME = 5;
// programatically get the amount of descriptions / images in the header
const numHeaderDesc = document.querySelectorAll(
    "header #img_container img"
).length;

// reference to DOM elements
// reference to the header section
const header = document.querySelector("header");
// reference to the outer div that wraps the header image
const headerImgContainer = header.querySelector("#img_container");
// reference to the header image
const headerImgs = headerImgContainer.querySelectorAll("img");
// reference to the div that hold the description of the image being displayed
const headerDescription = header.querySelector("#description");
// reference to the text content of the header description
const headerContents = headerDescription.querySelectorAll(".text_content");
// reference to the indicators to display which content is being shown
const indicatorBtn = headerDescription.querySelectorAll(".indicator_container");
// reference to the progress bar for each indicators
const progressIndicator = headerDescription.querySelectorAll(".indicator div");
// reference to the gallery
const gallery = document.querySelector("#gallery");
// reference to the gallery images
const galleryImgs = gallery.querySelectorAll("img");
// reference to the outer div that wraps the map
const mapContainer = document.querySelector("#map_container");
// reference to map image
const map = mapContainer.querySelector("#map");
// reference to the markers panel
const markersPanel = mapContainer.querySelector("#markers_panel");
// reference to the markers panel contents
const markersPanelCloseBtn = mapContainer.querySelector("#close_panel");
// reference to the map path
const path = mapContainer.querySelector("#path");

// get the markers information from server (TEMPORARILY HARD CODED)
const locationsInfo = [
    {
        x: 500,
        y: 386,
        description: "description of the image",
        imgUrl: "./assets/satMap.png",
        title: "Trailhead",
    },
    {
        x: 640,
        y: 500,
        description: "description of the image",
        imgUrl: "./assets/satMap.png",
        title: "Hazelnut tree",
    },
    {
        x: 706,
        y: 615,
        description: "description of the image",
        imgUrl: "./assets/satMap.png",
        title: "Big Apple Tree",
    },
    {
        x: 775,
        y: 624,
        description: "description of the image",
        imgUrl: "./assets/satMap.png",
        title: "Pear Tree",
    },
    {
        x: 790,
        y: 685,
        description: "description of the image",
        imgUrl: "./assets/satMap.png",
        title: "Cherry-Honeysuckle Arch",
    },
    {
        x: 780,
        y: 745,
        description: "description of the image",
        imgUrl: "./assets/satMap.png",
        title: "Spruce Grove",
    },
    {
        x: 860,
        y: 764,
        description: "description of the image",
        imgUrl: "./assets/satMap.png",
        title: "Foundation",
    },
    {
        x: 955,
        y: 830,
        description: "description of the image",
        imgUrl: "./assets/satMap.png",
        title: "Open Honeysuckle, sweet cherry",
    },

    {
        x: 1035,
        y: 880,
        description: "description of the image",
        imgUrl: "./assets/satMap.png",
        title: "Enter Big Grove",
    },
    {
        x: 1010,
        y: 950,
        description: "Description of the image",
        imgUrl: "./assets/satMap.png",
        title: "Well",
    },
    {
        x: 1140,
        y: 1000,
        description: "description of the image",
        imgUrl: "./assets/satMap.png",
        title: "Very Big Apple Tree",
    },
    {
        x: 1240,
        y: 990,
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla fuga, provident voluptas quas pariatur laboriosam porro atque excepturi fugit dicta",
        imgUrl: "./assets/satMap.png",
        title: "End of trail",
    },
];

// variables
// reference to the markers (will be programmatically added)
let markers;
// index of the current header description/image
let currHeaderContentIndex = 0;
// stores the interval for the header content
let indicatorInterval;

// fix issue with indicator animation lagging behind when user reenters website
gsap.ticker.lagSmoothing(false);

/**
 * The purpose of this function is to animate the header content to the desired
 * content.
 *
 * Calls another function to animate the images to the desired image to be
 * displayed. It also calls another function to simultaneously animate the text
 * content to the desired text content.Finally it also call another function to
 * simultaneously animate all the indcators to the desired one.
 *
 * Author: Agowun Muhammad Altaf (A00448118)
 * @param index the index of the header content to be displayed
 */
function headerState(index) {
    // animate the header images
    animateHeaderImg(index);

    // animate the header text
    animateHeaderText(index);

    // animate the header indicators
    animateHeaderIndicator(index);
}

// start the carousel on initialization
headerState(currHeaderContentIndex);

// create an interval to change the content of the header at set interval
indicatorInterval = setInterval(() => {
    headerState(++currHeaderContentIndex % numHeaderDesc);
}, HEADER_PRESENCE_TIME * 1000);

/**
 * The purpose of this function is to fade out all the images and then fade in
 * the desired image.
 *
 * Authors: Agowun Muhammad Altaf (A00448118)
 * @param index index of the desired image
 */
function animateHeaderImg(index) {
    // fade out all images
    gsap.to(headerImgs, {
        opacity: 0,
        duration: 1,
        ease: Linear,
    });

    // fade in the image to be displayed
    gsap.to(headerImgs[index], {
        opacity: 1,
        duration: 1,
        ease: Linear,
    });
}

/**
 * The purpose of this function is to animate out the existing text content and
 * animate in the desired text content.
 *
 * Authors: Agowun Muhammad Altaf (A00448118)
 * @param index index of the desired text content
 */
function animateHeaderText(index) {
    // hiding description texts
    gsap.timeline()
        .to(headerContents, {
            translateY: "-10%",
            opacity: 0,
            duration: 0.5,
            ease: Circ.easeOut,
        })
        .set(headerContents, {
            display: "none",
        })
        .set(headerContents[index], {
            display: "block",
        }) // displaying current description content
        .fromTo(
            headerContents[index],
            {
                translateY: "10%",
            },
            {
                translateY: 0,
                opacity: 1,
                duration: 0.5,
                ease: Circ.easeOut,
            }
        );
}

/**
 * The purpose of this function is to animate animate all the indicators to 0
 * and animate the indicator for the desired header content.
 *
 * Authors: Agowun Muhammad Altaf (A00448118)
 * @param index index of the desired indicator
 */
function animateHeaderIndicator(index) {
    // close existing indicator
    gsap.to(progressIndicator, {
        scaleX: 0,
        transformOrigin: "right",
        duration: HEADER_PRESENCE_TIME,
        ease: Expo.easeOut,
    });

    // show the upcoming indicator
    gsap.to(progressIndicator[index], {
        scaleX: 1,
        transformOrigin: "left",
        duration: HEADER_PRESENCE_TIME,
        ease: Circ.easeOut,
    });
}

// monitor the click event on the indicators
indicatorBtn.forEach((indicator, i) => {
    indicator.addEventListener("click", () => {
        // remove the previous interval
        clearInterval(indicatorInterval);
        // update the current image
        currHeaderContentIndex = i;
        headerState(i);
        // add the interval back
        indicatorInterval = setInterval(() => {
            headerState(++currHeaderContentIndex % numHeaderDesc);
        }, HEADER_PRESENCE_TIME * 1000);
    });
});

// add parallax effect to the header images
gsap.fromTo(
    headerImgs,
    {
        translateY: "-10%",
        duration: 1,
    },
    {
        scrollTrigger: {
            trigger: headerImgContainer,
            start: "50% 50%",
            end: "bottom top",
            scrub: true,
        },
        translateY: "10%",
    }
);

// add parallax effect to the gallery images
galleryImgs.forEach((image, i) => {
    gsap.fromTo(
        image,
        {
            translateY: "-15%",
        },
        {
            scrollTrigger: {
                trigger: gallery.querySelectorAll("a")[i],
                start: "top bottom",
                end: "bottom top",
                scrub: true,
            },
            translateY: "15%",
        }
    );
});

/**
 * The purpose of this function is to plot the markers on the map and draw the
 * path that connects the markers
 *
 * loops through the location infos and plot them together with a label on the
 * map. It also calls a function to assign the entrance animation of the path
 * and markers. Finally it adds a listner to monitor the screen resizing in
 * order to re-plot the markers and labels so that they are in the right place
 *
 * Author: Agowun Muhammad Altaf (A00448118)
 * @param locationsInfo array of information on the markers
 */
function plotMarkersAndPath(locationsInfo) {
    // loops through the location array
    locationsInfo.forEach((location) => {
        // adapt x and y coordinates of the location JSON to be that of the map
        location = {
            ...location,
            x: `${(map.clientHeight / map.naturalHeight) * location.x}px`,
            y: `${(map.clientWidth / map.naturalWidth) * location.y}px`,
        };

        // create the markers element
        const marker = document.createElement("button");
        // create the markers label
        const markerLabel = document.createElement("div");

        // add the markers class for styling
        marker.classList.add("markers");

        // add the markers_label class for the styling
        markerLabel.classList.add("markers_label");

        markerLabel.innerText = location.title;

        // set the marker label hidden / original state
        gsap.set(markerLabel, {
            clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
            translateY: "-110%",
            translateX: "-50%",
        });

        // monitor user hovering over the point
        marker.addEventListener("mouseenter", () => {
            toggleLocationLabel(markerLabel, true);
        });
        marker.addEventListener("mouseleave", () => {
            toggleLocationLabel(markerLabel, false);
        });

        // monitor user focusing the point (use for people using tab to navigate)
        marker.addEventListener("focus", () => {
            toggleLocationLabel(markerLabel, true);
        });
        marker.addEventListener("blur", () => {
            toggleLocationLabel(markerLabel, false);
        });

        // animate panel to show additional content for that markers
        marker.addEventListener("click", () => {
            // set the markerpanel close button on top of the marker
            markersPanelCloseBtn.style.top = location.y;
            markersPanelCloseBtn.style.left = location.x;
            // update the content of the marker panel
            upadateMarkerPanel(location);
            // display the marker panel
            toggleMarkerPanel(true);
        });

        // set the y coordinate of the marker
        marker.style.top = location.y;
        // set the x coordinate of the marker
        marker.style.left = location.x;

        // set the y coordinate of the marker label
        markerLabel.style.top = location.y;
        // set the x coordinate of the marker label
        markerLabel.style.left = location.x;

        // append the marker and corresponding label to the map
        mapContainer.append(marker, markerLabel);
    });

    // assign the reference to the markers that were programmatically added
    markers = mapContainer.querySelectorAll(".markers");

    animatePathAndMarkers();
}

// wait for the map image to be loaded before adding the location markers
map.addEventListener("load", () => {
    plotMarkersAndPath(locationsInfo);
});

// replot the location markers if the window is resized
window.addEventListener("resize", () => {
    // remove existing location markers
    markers.forEach((el) => el.remove());

    // replot location markers
    plotMarkersAndPath(locationsInfo);
});

/**
 * Add the entrance animation for the path and markers on the map.
 *
 * It animates the path from 0 to 100%, starting from when 50% of the map is in
 * view and ends when 100% of the map is in view.
 * it also animates the opacity and size of the markers when scrolling, starting
 * from when 50% of the map is in view to when 100% of the map is in view.
 *
 * Author: Agowun Muhammad Altaf (A00448118)
 */
function animatePathAndMarkers() {
    // animatate the path
    gsap.fromTo(
        path,
        {
            strokeDasharray: path.getTotalLength(),
            strokeDashoffset: path.getTotalLength(),
        },
        {
            strokeDashoffset: 0,
            // trigger the animation on scroll when 50% of the map is on screen
            scrollTrigger: {
                trigger: mapContainer,
                start: "50% 100%",
                end: "100% 100%",
                scrub: 0.5,
            },
        }
    );

    // animate the markers being added to the map
    gsap.timeline({
        // trigger the animation on scroll when 50% of the map is on screen
        scrollTrigger: {
            trigger: mapContainer,
            start: "50% 100%",
            end: "100% 100%",
            scrub: 0.5,
        },
    })
        .fromTo(
            markers,
            {
                scale: 0,
                opacity: 0.3,
            },
            {
                scale: 1.5,
                opacity: 0.6,
                stagger: 0.1,
                duration: 0.5,
                ease: Circ.easeOut,
            }
        )
        .to(
            markers,
            {
                scale: 1,
                opacity: 1,
                duration: 0.5,
                stagger: 0.1,
                ease: Circ.easeOut,
            },
            "-=50%"
        );
}

/**
 * The purpose of this function is to add the hover effect on the interactive
 * map.
 *
 * If display is true then animate the marker label to appear above the marker
 * otherwise animate it to be hidden.
 *
 * @param markerLabel the markers labeling element
 * @param display flag to add or remove label from the map
 */
function toggleLocationLabel(markerLabel, display) {
    const descAnimTime = gsap.timeline();

    if (display) {
        descAnimTime.to(markerLabel, {
            translateY: "-150%",
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 0.3,
            ease: Circ.easeOut,
        });
    } else {
        descAnimTime.to(markerLabel, {
            translateY: "-110%",
            clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
            duration: 0.3,
            ease: Circ.easeOut,
        });
    }
}

/**
 * The purpose of this function is to change the content of the marker panel
 *
 * It first removes all the content inside the markers panel and then create
 * an image, h1 and p element to hold the image, title and description for that
 * loaction. Finally it appends the element created.
 *
 * Author: Agowun Muhammad Altaf (A00448118)
 * @param locationInfo information on the markers location
 */
function upadateMarkerPanel(locationInfo) {
    // clear the content of the panel
    markersPanel.innerHTML = "";

    // create an element for the image of the marker content
    const image = document.createElement("img");
    // create an element for the image of the marker content
    const title = document.createElement("h1");
    // create an element for the image of the marker content
    const description = document.createElement("p");

    // set the image for the marker content
    image.src = locationInfo.imgUrl;

    // set the text for the title
    title.textContent = locationInfo.title;

    // set the text for the description
    description.textContent = locationInfo.description;

    // add the image, title and description to the panel
    markersPanel.append(image, title, description);
}

/**
 * The purpose of this function is to toggle the both the markers panel and
 * close button in or out of view
 *
 * It translate the marker panel into view or out of view. It animate the scale
 * of the marker panel close button to 1 if display is true and 0 otherwise.
 *
 * Author: Agowun Muhammad Altaf (A00448118)
 * @param display boolean value indicate whether to display or hide panel
 */
function toggleMarkerPanel(display) {
    // animate the panel into or out of view
    gsap.to(markersPanel, {
        translateX: display ? 0 : "200%",
        duration: 0.5,
    });

    // animate the close button in or out
    // TODO: uncomment code after demo
    // // check if user wants to see the marker
    // if (display) {
    //     // ensure marker starts from hidden then is revealed
    //     gsap.set(markersPanelCloseBtn, {
    //         clipPath: "circle(0% at 50% 50%)",
    //     });
    // }
    gsap.to(markersPanelCloseBtn, {
        clipPath: display ? "circle(40% at 50% 50%)" : "circle(0% at 50% 50%)",
        duration: 0.5,
    });
}
