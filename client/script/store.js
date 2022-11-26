// reference to the store section
const store = document.querySelector("#store");
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
// reference to the more information panel's price
const moreInfoPanelPrice = moreInfoPanel.querySelector("#price");
// reference to the more information panel's item quantity
const moreInfoPanelQuantity = moreInfoPanel.querySelector("#itemQuantity");
// reference to the more information panel's add to cart button
const moreInfoPanelAddtoCart = moreInfoPanel.querySelector("#addToCart");
// reference to the cart button
const cartBtn = document.querySelector("#cartBtn");
// reference to the cart modal
const cart = document.querySelector("#cart");
// reference to the cart modal
const cartClose = cart.querySelector("#closeCart");
// reference to the cart modal
const cartPurchase = cart.querySelector("#purcahse");
// reference to the cart items list
const cartItemList = cart.querySelector("#cartItems");
// reference to the cart items total price
const cartTotalPrice = cart.querySelector("#totalPrice");

// store the items id to be use in the cart page
const cartItems = {};
// store the list of items
let items;
// store the id of the item being viewed
let itemId;
// flag to know whether the cart is empty or not
let cartEmpty;

/**
 * get the items to be displayed
 *
 * Author: Agowun Muhammad Altaf (A00448118)
 */
function fetchItemsData() {
    // fetch the items data
    $.post(`${SERVER_URL}/store/getitems`, (data) => {
        items = data;
        // add the content of the columns
        populateColumns(data);
    });
}

/**
 * add the items images and name to the respective columns
 *
 * Author: Agowun Muhammad Altaf (A00448118)
 *
 * @param items the content to be displayed
 */
function populateColumns(items) {
    // reference to the columns in the store section
    const columns = store.querySelectorAll(".columns");
    // get the number of columns
    const numColumns = columns.length;

    // animate the images out
    gsap.timeline()
        .to(store.querySelectorAll(".itemContainer"), {
            opacity: 0,
            scale: 0.8,
        })
        .call(() => {
            // remove current images
            columns.forEach((column) => {
                column.innerHTML = "";
            });

            // loop through the items to be added to the screen
            items.forEach((item, i) => {
                // create the div to hold the image, name and price
                const itemContainer = document.createElement("div");
                // add the class for styling the div
                itemContainer.classList.add("itemContainer");

                // create the image wrapper for parallax and link to more info
                const imgWrapper = document.createElement("button");
                // add the class for styling image wrapper
                imgWrapper.classList.add("imgWrapper");

                itemContainer.addEventListener("click", () => {
                    openMoreInfoPanel(item);
                });

                // create the image element for the item
                const itemImg = document.createElement("img");
                // set the image to be the first in the list of images for the item
                itemImg.src = item.imgsURL[0];

                // create the name text to display the name of the item
                const itemName = document.createElement("p");

                // add the name to the div created
                itemName.innerText = item.name;

                // create the price text to display the price of the item
                const itemPrice = document.createElement("p");

                // add the price to the div created
                itemPrice.innerText = `$${Number(item.price).toFixed(2)}`;

                // add the image to the image wrapper for parallax effect
                imgWrapper.appendChild(itemImg);

                // append the image wrapper and item name to a single container
                itemContainer.append(imgWrapper, itemName, itemPrice);

                // append the images to the columns
                columns[i % numColumns].append(itemContainer);

                // set the item container to the initial state for animation
                gsap.set(itemContainer, { opacity: 0, scale: 0.8 });

                // when the image is loaded then animate the container in
                itemImg.onload = () => {
                    // add parallax effect to the images
                    gsap.fromTo(
                        itemImg,
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
                    gsap.to(itemContainer, {
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
    store.innerHTML = "";

    // add the columns
    for (let column = 0; column < numColumns; column++) {
        // create a div for the column
        const newColumn = document.createElement("div");
        // add the styling for the columns
        newColumn.classList.add("columns");
        // add the column to the store section
        store.appendChild(newColumn);
    }

    // fetch the data to be used to populate the columns
    fetchItemsData();
}

// append columns on load
appendColumns();

// re-append the columns if there is a change
window.addEventListener("resize", () => {
    appendColumns();
});

// check of user is on desktop
if (window.innerWidth > TABLET_WIDTH) {
    // user is on desktop enable momentum scrollbar on the more information panel
    Scrollbar.init(moreInfoPanel, {
        damping: 0.1,
        syncCallbacks: true,
    });
}

/**
 * display a panel for more information on the item
 *
 * Author: Agowun Muhammad Altaf (A00448118)
 *
 * @param data for the item to be dispalyed
 */
function openMoreInfoPanel(data) {
    // update the id of the item being viewed
    itemId = data._id;
    // update the name for the panel
    moreInfoPanelH1.textContent = data.name;
    // update the main image
    moreInfoPanelImage.src = data.imgsURL[0];
    // set the description for that item
    moreInfoPanelDescription.innerText = data.description;
    // set the price for that item
    moreInfoPanelPrice.innerText = `Price: $${Number(data.price).toFixed(2)}`;
    // set the quantity for that item
    moreInfoPanelQuantity.innerText = `x ${cartItems[itemId] || 0}`;

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
 * add item to both cartItem array and session storage
 *
 * Author: Agowun Muhammad Altaf (A00448118)
 */
function addItemToCart() {
    if (itemId.length != 0) {
        cartItems[itemId] =
            cartItems[itemId] == null ? 1 : Number(cartItems[itemId]) + 1;
        // set the quantity for that item
        moreInfoPanelQuantity.innerText = `x ${cartItems[itemId] || 0}`;
    }
}

/**
 * remove 1 item to both cartItem array and session storage
 *
 * Author: Agowun Muhammad Altaf (A00448118)
 */
function decrementItemInCart() {
    if (itemId.length != 0) {
        cartItems[itemId] =
            cartItems[itemId] == null ? 0 : Number(cartItems[itemId]) - 1;

        if (cartItems[itemId] < 0) {
            cartItems[itemId] = 0;
        }

        // set the quantity for that item
        moreInfoPanelQuantity.innerText = `x ${cartItems[itemId] || 0}`;
    }
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

// open the cart modal
cartBtn.addEventListener("click", () => {
    updateCart();
    if (!cartEmpty) {
        cart.showModal();
    }
});

function updateCart() {
    cartEmpty = true;
    cartItemList.innerHTML = "";
    for (const [itemID, quantity] of Object.entries(cartItems)) {
        if (quantity != 0) {
            cartEmpty = false;
            const item = items.find((el) => el._id == itemID);
            const row = document.createElement("li");
            const itemName = document.createElement("p");
            itemName.innerText = item.name;

            const itemManagement = document.createElement("div");
            itemManagement.classList.add("itemManagement");

            const itemQuantity = document.createElement("input");
            itemQuantity.type = "number";
            itemQuantity.min = 0;
            itemQuantity.max = 10;
            itemQuantity.value = Number(quantity);

            const itemTotalPrice = document.createElement("p");
            itemTotalPrice.innerText = `$${(
                item.price * Number(quantity)
            ).toFixed(2)}`;

            itemQuantity.onchange = () => {
                newValue = itemQuantity.value < 0 ? 0 : itemQuantity.value;
                cartItems[itemID] = newValue;

                itemTotalPrice.innerText = `$${(item.price * newValue).toFixed(
                    2
                )}`;

                updateTotalPrice();
            };

            itemManagement.append(itemQuantity, itemTotalPrice);

            row.append(itemName, itemManagement);
            cartItemList.append(row);
        }
    }

    if (cartEmpty) {
        cartItemList.innerText = "Cart is empty";
    } else {
        updateTotalPrice();
    }
}

// clase the cart modal
cartClose.addEventListener("click", () => {
    cart.close();
});

// purchase items
cartPurchase.addEventListener("click", () => {
    if (!cartEmpty) {
        if (confirm("Purcahse items")) {
            location.reload();
        }
    }
});

function updateTotalPrice() {
    let totalPrice = 0;

    for (const [itemID, quantity] of Object.entries(cartItems)) {
        const item = items.find((el) => el._id == itemID);
        totalPrice += Number(item.price) * Number(quantity);
    }

    cartTotalPrice.innerHTML =
        totalPrice == 0 ? "" : `Total price: $${totalPrice.toFixed(2)}`;
}
