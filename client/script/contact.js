/**
 * Purpose: The purpose of this Javascript file is to provide the functionality
 * of the Contact Us Page of the French village website.
 *
 * Author: Joshua Kivaria (A00450062). Joshua Kivaria wrote the code to
 * make sure that user details get send to the server.
 * Author: Mainuddin Alam Irteja (A00446752). Mainuddin Alam Irteja wrote
 * the changeDisplay() function. Mainuddin Alam Irteja debugged the code to
 * check for errors.
 */

//global
//constant to get the reference of the header part pf the page
const header = document.getElementById("header");
//global
//constant to get the reference of the contact part pf the page
const contactPart = document.getElementById("contactPart");
//global
//constant to get the reference of the response part pf the page
const responsePart = document.getElementById("responsePart");
//global
//constant to get the reference of the form in the contact page
const formContact = document.getElementById("formContact");
//global
//set the boolean variable to false
let isShown = false;

/**
 * Purpose: The purpose of this function is to send the user's message
 * to French village. The function takes user's first name, last name,
 * email address, the subject matter and the message from the contact
 * form respectively. User's information is saved as a JSON object. The
 * JSON object is sent to the server which is needed to send user's message
 * to French village.
 *
 * @param {*} event When user clicks to submit the form present in the
 * Contact Us page
 *
 * Author: Joshua Kivaria (A00450062)
 */
function sendMessage(event) {
  //prevent the information from disapperaing when the
  //submit form is clicked
  event.preventDefault();

  //get the user's first name
  let firstName = document.getElementById("firstName").value;
  //get the user's last name
  let lastName = document.getElementById("lastName").value;
  //get the user's email address
  let email = document.getElementById("emailAddress").value;
  //get the subject of the email
  let subject = document.getElementById("subject").value;
  //get the message to be sent
  let message = document.getElementById("message").value;

  /*create JSON object representing user's contact details
  
  contactDetails = {
    fName: {
      type: [String]
    },
    lName: {
      type: [String]
    },
    emailAddress: {
      type: [String],
      required: must include a valid email,
    },
    subjectContent: {
      type: [String]
    },
    messageContent: {
      type: [String]
    }
  }
  */
  const contactDetails = {
    fName: firstName,
    lName: lastName,
    emailAddress: email,
    subjectContent: subject,
    messageContent: message,
  };

  /**
   * Purpose: This function does a POST request to the server at the
   * URL = http://140.184.230.209:3026/contacts/sendMessage. This function
   * calls an anonymous callback function which sends the user's message to
   * French village.
   *
   * @param "/contacts/sendMessage" is the url
   * destination to be recognized
   * @param contactDetails The JSON object with user's message
   * @param Anonymous callbqck function gets executed to send the POST request
   * to the server
   *
   *        Purpose: The purpose of the anonymous callback function is to send
   *        the user's message to French village and to use console.log(return)
   *        to check whether user's message was sent or not.
   *
   *        @param returnData the information returned from the server
   *
   * Author: Joshua Kivaria (A00450062)
   * Author: Mainuddin Alam Irteja (A00446752)
   */
  $.post(`${SERVER_URL}/contacts/sendMessage`, contactDetails, (returnData) => {
    //console.log(returnData) to check if the message has been sent
    console.log(returnData);
  }).fail((err) => {
    //console.log(err.responseText) to check if error is present
    console.log(err.responeText);
  });
  // Wait for 600 ms and display the saved message
  setTimeout(() => {
    //display the response part of the page
    responsePart.style.display = "";
    //set the boolean variable to true
    isShown = true;
  }, 600);
}

//event listener to listen when the user submits the form
formContact.addEventListener("submit", (event) => {
  //prevent the information from disapperaing when the
  //submit form is clicked
  event.preventDefault();
  //call the function to send the message to French village
  sendMessage(event);
  //call the function to change the display
  changeDisplay();
});

/**
 * Purpose: The purpose of this function is to change the display from
 * the contact part of the page to the response part of the page.
 *
 * Author: Mainuddin Alam Irteja (A00446752).
 */
function changeDisplay() {
  //hide the header
  header.style.display = "none";
  //hide the contact part of the page
  contactPart.style.display = "none";
  //display the response part of the page
  responsePart.style.display = "";
}
