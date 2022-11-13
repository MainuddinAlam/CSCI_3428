const SERVER_URL = "http://140.184.230.209:3026";

const nameInput = document.getElementById("name");
const priceInput = document.getElementById("price");
const descriptionInput = document.getElementById("description");
const imagesInput = document.getElementById("imageInput");
const uploadBtn = document.getElementById("upload");
const preview = document.querySelector(".preview");
const progessSect = document.getElementById("progress");

// keep all the images to be uploaded
let imageArray = [];

imagesInput.addEventListener("change", (event) => {
    const fileList = event.target.files;

    // populate image array
    for (let element = 0; element < fileList.length; element++) {
        const item = fileList[element];

        imageArray.push(item);
    }

    displayImages();
});

function displayImages() {
    // reset the images
    preview.innerHTML = null;

    imageArray.forEach((img, i) => {
        let image = document.createElement("img");
        image.src = URL.createObjectURL(img);

        image.addEventListener("click", () => {
            if (confirm("Confirm deletion")) {
                imageArray.splice(i, 1);

                displayImages();
            }
        });

        preview.appendChild(image);
    });
}

// listen to when the user clicks on the upload button
uploadBtn.addEventListener("click", uploadContent);

/**
 * upload the data for the new item to the database
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

    imageArray.forEach((img, i) => {
        const imageUploaded = document.createElement("p");
        imageUploaded.innerText = i + ". " + img.name;

        progessSect.appendChild(imageUploaded);
    });

    // store the url to the images
    let imgsURL = [];

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
