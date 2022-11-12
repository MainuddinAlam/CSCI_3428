/**
 * Functionality of the Contact Us page
 * Author: Joshua
 */

const SERVER_URL = "http://140.184.230.209:3026";
const contactPart = document.getElementById("contactPage");
const responsePart = document.getElementById("responsePart");
const submitModalBtn = document.getElementById("submitBtn");
const closeModalBtn = document.getElementById("cancelBtn");
function sendMessage(event) {
    event.preventDefault();

    //get user contact details
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("emailAddress").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    //create JSON object representing user's contact details
    const contactDetails = {
        fName: firstName,
        lName: lastName,
        emailAddress: email,
        subjectContent: subject,
        messageContent: message,
    };

    $.post(
        `${SERVER_URL}/contacts/sendMessage`,
        contactDetails,
        (returnData) => {
            console.log(returnData);
        }
    ).fail((err) => {
        console.log(err.responeText);
    });
}
const formContact = document.getElementById("formContact");

formContact.addEventListener("submit", (event) => {
    event.preventDefault();
    sendMessage(event);
    changeDisplay();
});

function changeDisplay() {
    //show response to the user
    contactPart.style.display = "none";
    responsePart.style.display = "";
}
