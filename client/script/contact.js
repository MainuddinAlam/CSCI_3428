/**
 * Functionality of the Contact Us page
 * Author: Joshua
 */

const header = document.getElementById("header");
const contactPart = document.getElementById("contactPart");
const responsePart = document.getElementById("responsePart");
let isShown = false;
function sendMessage(event) {
  event.preventDefault();

  //get user contact details
  let firstName = document.getElementById("firstName").value;
  let lastName = document.getElementById("lastName").value;
  let email = document.getElementById("emailAddress").value;
  let subject = document.getElementById("subject").value;
  let message = document.getElementById("message").value;

  //create JSON object representing user's contact details
  const contactDetails = {
    fName: firstName,
    lName: lastName,
    emailAddress: email,
    subjectContent: subject,
    messageContent: message,
  };

  $.post(`${SERVER_URL}/contacts/sendMessage`, contactDetails, (returnData) => {
    console.log(returnData);
  }).fail((err) => {
    console.log(err.responeText);
  });
  // Wait for 600 ms and display the saved message
  setTimeout(() => {
    responsePart.style.display = "";
    isShown = true;
  }, 600);
}
const formContact = document.getElementById("formContact");

formContact.addEventListener("submit", (event) => {
  event.preventDefault();
  sendMessage(event);
  changeDisplay();
});


function changeDisplay() {
    header.style.display="none";
    contactPart.style.display="none";
    responsePart.style.display="";
}