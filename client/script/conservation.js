// reference to the bar for selecting fauna or flora
const categorySelection = document.querySelector("#categorySelection span");
// reference to the gallery section
const gallery = document.querySelector("#gallery");
// reference to the page index bar
const pageIndexBar = document.querySelector("#pageIndexBar");
// reference to the more information panel background
const moreInfoBackground = document.querySelector("#moreInfoBackground");
// reference to the more information panel
const moreInfoPanel = moreInfoBackground.querySelector("#moreInfoPanel");
// reference to the more information panel's header
const moreInfoPanelH1 = moreInfoPanel.querySelector("h1");
// reference to the more information panel's image
const moreInfoPanelImage = moreInfoPanel.querySelector("#mainImg");
// reference to the more information panel's other image bar
const moreInfoPanelOtherImg = moreInfoPanel.querySelector("#otherImgs");
// reference to the more information panel's description
const moreInfoPanelDescription = moreInfoPanel.querySelector("#description");

// current category default to flora since it is going to be changed on load
let category = "flora";
// the current index, default to 0 on load
let speciesIndex = 0;

/**
 * get information on how pagination is being done, number of species and
 * how many species data is sent at a time.
 *
 * Author: Agowun Muhammad Altaf (A00448118)
 */
async function getPaginationInfo() {
    return await $.get(
        `${SERVER_URL}/species/getPaginationInfo/${category}`,
        ({ speciesLength, paginationNum }) =>
            createPaginationBar(speciesLength, paginationNum)
    );
}

/**
 * populate the page index bar after the gallery
 *
 * Author: Agowun Muhammad Altaf (A00448118)
 *
 * @param speciesLength the total number of species
 * @param paginationNum the number of species per page
 */
function createPaginationBar(speciesLength, paginationNum) {
    // clear the current page index bar
    pageIndexBar.innerHTML = "";

    // get the number of pages that will be required
    const numOfPages = Math.ceil(speciesLength / paginationNum);

    // loop through the index to create and append a button for each
    for (let pageIndex = 0; pageIndex < numOfPages; pageIndex++) {
        // create the page index button
        const pageIndexBtn = document.createElement("button");
        // set the text of the page index button
        pageIndexBtn.textContent = pageIndex + 1;

        // add the current index styling on load
        if (pageIndex == speciesIndex) {
            pageIndexBtn.classList.add("currentIndex");
        }

        // listen to the user clicking on the page index button
        pageIndexBtn.addEventListener("click", () => {
            // remove the current index styling on the current button
            pageIndexBar.childNodes.forEach((button) =>
                button.classList.remove("currentIndex")
            );

            // fetch the new data
            fetchSpeciesData(pageIndex);
            // add the current index styling to the new button
            pageIndexBtn.classList.add("currentIndex");
        });

        // add the buttons to the page index bar
        pageIndexBar.appendChild(pageIndexBtn);
    }
}

/**
 * change the category to be shown
 *
 * Author: Agowun Muhammad Altaf (A00448118)
 *
 * @param reqCategory the category that the user requested
 */
function changeCategory(reqCategory) {
    // only change the category if it is different from the current one
    if (reqCategory !== category) {
        // upadate the category
        category = reqCategory;

        // reference the buttons in the category selection
        const buttonUnderlines = categorySelection.querySelectorAll("button");

        // animate out the other category
        gsap.to(
            buttonUnderlines[reqCategory == "fauna" ? 1 : 0].querySelector(
                "span"
            ),
            {
                scaleX: 0,
                duration: 0.5,
                ease: Circ.easeInOut,
            }
        );

        // animate the underline of the category that is requested
        gsap.to(
            buttonUnderlines[reqCategory == "fauna" ? 0 : 1].querySelector(
                "span"
            ),
            {
                scaleX: 1,
                duration: 0.5,
                ease: Circ.easeInOut,
            }
        );

        // request the species data
        fetchSpeciesData(0);

        // get the information for building the pagination bar
        getPaginationInfo();
    }
}

// initialise the category
changeCategory("fauna");

/**
 * get the species to be displayed for that current page
 *
 * Author: Agowun Muhammad Altaf (A00448118)
 *
 * @param reqIndex the requested index page
 */
function fetchSpeciesData(reqIndex) {
    // update the page index
    speciesIndex = reqIndex;

    // fetch the species data
    $.post(
        `${SERVER_URL}/species/getSpecies/${category}/${reqIndex}`,
        (data) => {
            // add the content of the columns
            populateColumns(data);
        }
    );
}

/**
 * add the species images and name to the respective columns
 *
 * Author: Agowun Muhammad Altaf (A00448118)
 *
 * @param pageContent the content to be displayed
 */
function populateColumns(pageContent) {
    // reference to the columns in th egallery section
    const columns = gallery.querySelectorAll(".columns");
    // get the number of columns
    const numColumns = columns.length;

    // animate the images out
    gsap.timeline()
        .to(gallery.querySelectorAll(".speciesContainer"), {
            opacity: 0,
            scale: 0.8,
        })
        .call(() => {
            // remove current images
            columns.forEach((column) => {
                column.innerHTML = "";
            });

            // loop through the species to be added to the screen
            pageContent.forEach((species, i) => {
                // create the figure to hold the image and name
                const speciesContainer = document.createElement("figure");
                // add the class for styling the figure
                speciesContainer.classList.add("speciesContainer");

                // create the image wrapper for parallax and link to more info
                const imgWrapper = document.createElement("button");
                // add the class for styling image wrapper
                imgWrapper.classList.add("imgWrapper");

                // // set the url to get more information for the species
                // imgWrapper.href = `./speciesInfo.html?speciesId=${species._id}`;

                imgWrapper.addEventListener("click", () => {
                    openMoreInfoPanel(species);
                });

                // create the image element for species
                const speciesImg = document.createElement("img");
                // set the image to be the first in the list of images for the species
                speciesImg.src = species.imgsURL[0];

                // create the fugure caption to display the name of the species
                const speciesName = document.createElement("figcaption");

                // add the name to the figure caption created
                speciesName.innerText = species.name;

                // add the image to the image wrapper for parallax effect
                imgWrapper.appendChild(speciesImg);

                // append the image wrapper and species name to a single container
                speciesContainer.append(imgWrapper, speciesName);

                // append the images to the columns
                columns[i % numColumns].append(speciesContainer);

                // add parallax effect to the images
                gsap.fromTo(
                    speciesImg,
                    {
                        translateY: "-10%",
                    },
                    {
                        scrollTrigger: {
                            trigger: imgWrapper,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: true,
                        },
                        translateY: "10%",
                    }
                );

                // set the species container to the initial state for animation
                gsap.set(speciesContainer, { opacity: 0, scale: 0.8 });

                // when the image is loaded then animate the container in
                speciesImg.onload = () => {
                    gsap.to(speciesContainer, {
                        opacity: 1,
                        scale: 1,
                    });
                };
            });
        });
}

/**
 * append the number of column for the display dimension
 *
 * Author: Agowun Muhammad Altaf (A00448118)
 */
function appendColumns() {
    // get the width og the screen
    const windowWidth = window.innerWidth;
    // store the number of columns to be added
    let numColumns = 1;

    // check the width
    if (windowWidth > TABLET_WIDTH) {
        // width greater than the width of a tablet phone
        numColumns = 3;
    } else if (windowWidth > MOBILE_WIDTH) {
        // width greater than the width of a mobile phone
        numColumns = 2;
    }

    // clear the columns already present
    gallery.innerHTML = "";

    // add the columns
    for (let column = 0; column < numColumns; column++) {
        // create a div for the column
        const newColumn = document.createElement("div");
        // add the styling for the columns
        newColumn.classList.add("columns");
        // add the column to the gallery section
        gallery.appendChild(newColumn);
    }

    // fetch the data to be used to populate the columns
    fetchSpeciesData(speciesIndex);
}

// append columns on load
appendColumns();

// re-append the columns if there is a change
window.addEventListener("resize", () => {
    appendColumns();
});

Scrollbar.init(moreInfoPanel, {
    damping: 0.1,
    syncCallbacks: true,
});

/**
 * display a panel for more information on the specices
 *
 * Author: Agowun Muhammad Altaf (A00448118)
 *
 * @param data for the species to be dispalyed
 */
function openMoreInfoPanel(data) {
    // update the name for the panel
    moreInfoPanelH1.textContent = data.name;
    // update the main image
    moreInfoPanelImage.src = data.imgsURL[0];
    // set the description for that species
    moreInfoPanelDescription.innerText = data.description;

    // clear the previous images
    moreInfoPanelOtherImg.innerHTML = "";

    // add the new imagess
    data.imgsURL.forEach((img, i) => {
        // create the smaller image preview
        const smallImg = document.createElement("img");
        // set the image of the smaller preview
        smallImg.src = img;

        // add the active image class to the first image
        if (i == 0) {
            smallImg.classList.add("activeImg");
        }

        // change the main image with the image the user clicks on
        smallImg.addEventListener("click", () => {
            // remove the hidden on the previous image
            moreInfoPanelOtherImg
                .querySelectorAll("img")
                .forEach((smallImg) => {
                    smallImg.classList.remove("activeImg");
                });

            smallImg.classList.add("activeImg");

            moreInfoPanelImage.src = img;
        });

        // add the small images to the other image preview bar
        moreInfoPanelOtherImg.appendChild(smallImg);
    });

    // set the panel and background to visible
    gsap.set(moreInfoBackground, { display: "flex" });

    // animate the the more information panel background in
    gsap.timeline()
        .to(moreInfoBackground, {
            opacity: 1,
            duration: 0.3,
            ease: Circ.EaseInOut,
        }) // animate the the more information panel in
        .fromTo(
            moreInfoPanel,
            { height: 0, duration: 0 },
            {
                height: "90vh",
                duration: 0.4,
                ease: Circ.EaseOut,
            },
            "-=30%"
        );
}

/**
 * close the more information panel
 *
 * Author: Agowun Muhammad Altaf (A00448118)
 */
function closeMoreInfoPanel() {
    gsap.timeline()
        .to(moreInfoPanel, {
            height: 0,
            duration: 0.4,
            ease: Circ.EaseIn,
        })
        .to(
            moreInfoBackground,
            {
                opacity: 0,
                duration: 0.3,
                ease: Circ.EaseInOut,
            },
            "-=30%"
        )
        .set(moreInfoBackground, { display: "none" });
}

// add the close on click of the more information panel background
moreInfoBackground.addEventListener("click", () => closeMoreInfoPanel());

// do not close the more information panel if user clicks on the panel itself
moreInfoPanel.addEventListener("click", (event) => {
    // stop the panel from closing
    event.stopPropagation();
});
