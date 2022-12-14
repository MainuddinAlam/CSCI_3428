/**
 * The purpose of this file is to add the behaviours for the newItem page within the admin folder
 *
 * Author: Agowun Muhammad Altaf (A00448118), shared code from conservation page for the item gallery part
 * Author: Anmol Bhatla (A00441358), wrote the whole file and adapted the code shared from the newSpecies file to newItem file
 */

// global the link to the server
const SERVER_URL = "http://140.184.230.209:3026";

// global reference to the name text input
const nameInput = document.getElementById("name");
// global reference to the price number input
const priceInput = document.getElementById("price");
// global reference to the description textarea
const descriptionInput = document.getElementById("description");
// global reference to the hidden image file input
const imagesInput = document.getElementById("imageInput");
// global reference to the upload button
const uploadBtn = document.getElementById("upload");
// global reference to the images preview section
const preview = document.querySelector(".preview");
// global reference to the progress area
const progessSect = document.getElementById("progress");

// store all the images to be uploaded
let imageArray = [];

// monitor for new images to be uploaded
imagesInput.addEventListener("change", (event) => {
    // stores a list of the file/image objectss
    const fileList = event.target.files;

    // populate image array
    for (let element = 0; element < fileList.length; element++) {
        const item = fileList[element];

        imageArray.push(item);
    }

    displayImages();
});

/**
 * populate the preview section with the images to be uploaded.
 *
 * Author: Agowun Muhammad Altaf (A00448118), shared code from newSpecies file
 * Author: Anmol Bhatla (A00441358), adpated and wrote the code
 */
function displayImages() {
    // reset the images
    preview.innerHTML = null;

    // loop though the images in the image array
    imageArray.forEach((img, i) => {
        // create an img tag
        let image = document.createElement("img");
        // set the src of the img tag to that of the image
        image.src = URL.createObjectURL(img);

        // remove the image after clicking on it and confirming
        image.addEventListener("click", () => {
            // prompt the user for whether they intended to remove the image
            if (confirm("Confirm deletion")) {
                // remove the image from the image array
                imageArray.splice(i, 1);
                // display the images again after that image was removed
                displayImages();
            }
        });

        // add the newly created img tag to the preview section
        preview.appendChild(image);
    });
}

// listen to when the user clicks on the upload button
uploadBtn.addEventListener("click", uploadContent);

/**
 * upload the data for the new item to the database
 *
 * Author: Agowun Muhammad Altaf (A00448118), shared code from newSpecies file
 * Author: Anmol Bhatla (A00441358), adpated and wrote the code
 */
async function uploadContent() {
    // get the item name
    const name = nameInput.value;
    // get the item description
    const description = descriptionInput.value;
    // get the price
    const price = priceInput.value;

    // validate name is not empty
    if (name.length == 0) {
        alert("name is required!");
        return;
    }

    // validate description is not empty
    if (description.length == 0) {
        alert("description is required!");
        return;
    }

    // validate price is meaningful selected
    if (price == null || price <= 0) {
        alert("price is required!");
        return;
    }

    // display the progress of the images being uploaded in progress section
    imageArray.forEach((img, i) => {
        const imageUploaded = document.createElement("p");
        imageUploaded.innerText = i + ". " + img.name;

        progessSect.appendChild(imageUploaded);
    });

    // store the url to the images
    let imgsURL = [];

    // upload the images to the server
    for (let i = 0; i < imageArray.length; i++) {
        const img = imageArray[i];
        // create a formData to hold the data of the image
        const formData = new FormData();
        formData.append("image", img);

        const data = await $.ajax({
            url: SERVER_URL + "/store/uploadImg",
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            async: true,
        });

        imgsURL.push(`https://ugdev.cs.smu.ca/~group23E/server/${data.path}`);
        progessSect.childNodes[i].textContent += " - uploaded";
    }

    // check if all images have been uploaded
    if (imgsURL.length == imageArray.length) {
        // upload the new item document to the server
        const newItem = {
            name,
            price,
            description,
            imgsURL,
        };

        // upload the data to the server
        $.post(SERVER_URL + "/store/add", newItem);
        progessSect.innerHTML = "Uploaded";

        setTimeout(() => {
            location.reload();
        }, 500);
    }
}
