/**
 * Purpose: The purpose of this Javascript file is to send emails
 * to the French village website and to the user who messaged
 * French village.
 *
 * Author: Joshua Kivaria (A00450062). Joshua Kivaria wrote the code for sending
 * emails.
 * Author: Mainuddin Alam Irteja (A00446752). Mainuddin Alam Irteja debugged
 * the code. Currently the emails will be send to an email which Mainuddin
 * Alam Irteja has setup.
 */

//require dotenv module for accessing environment files
require("dotenv").config();
//global
//constant to require the express module
const express = require("express");
//global
//constant for the Router to be used
const router = express.Router();
//global
//constant to require the nodemailer module
const nodemailer = require("nodemailer");

/**
 * Purpose: The purpose of this express function is to receive a POST request
 * at the URL = http://140.184.230.209:3026/contacts/sendMessage. This express
 * function calls an anonymous callback function once the post request is
 * recognized.
 *
 * @param "/contacts/sendMessage" is the url
 * @param anonymous callback function gets executed once POST request is
 * recognized.
 *
 *        Purpose: The purpose of the anonymous callback function is to
 *        send emails to the French village gmail and a confirmation mail
 *        to the person who sent the email.
 *
 *        @param req the request object which has the email content details from
 *        the person who messaged French village using the contact form.
 *        @param res the result object which has the message to the client side
 *        to let the person know whether the request was successful or not.
 *
 *        @returns the result object to the client
 *
 * Author: Joshua Kivaria (A00450062)
 * Author: Mainuddin Alam Irteja (A00446752)
 */
router.post("/sendMessage", (req, res) => {
  //get the email content
  let emailContent = req.body;
  try {
    //call the function to send the emails
    mail(emailContent);
    return res.status(200).send("Message Successfully Sent!");
  } catch (error) {
    res.status(400).send("Message Could not be Sent");
  }
});

/**
 * Purpose: The purpose of this function is to send emails to the email
 * of French village and a confirmation email to the person who originally
 * messaged French village. The algorithm was adapted from W3Schools.
 * link: https://www.w3schools.com/nodejs/nodejs_email.asp
 *
 * @param {*} content the information of the person who messaged French
 * village.
 *
 * Author: Joshua Kivaria (A00450062)
 * Author: Mainuddin Alam Irteja (A00446752)
 */
function mail(content) {
  //create a transporter object
  //process.env.GROUP_GMAIL is the gmail Mainuddin Alam Irteja has
  //setup currently.
  //process.env.GMAIL_PWD is the app password of the gmail
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GROUP_GMAIL,
      pass: process.env.GMAIL_PWD,
    },
  });

  //format the user's message so that a email can be sent
  //the group gmail will be used to send the user's message to the group
  //gmail
  let hostOptions = {
    from: process.env.GROUP_GMAIL,
    to: process.env.GROUP_GMAIL,
    subject: content.subjectContent,
    html: `<p>Email was sent from: ${content.emailAddress}</p>
     <p>The name of the person is: ${content.fName} ${content.lName}</p>
     <p>Message: ${content.messageContent}</p>`,
  };
  //send the user's message to the group project gmail
  transporter.sendMail(hostOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
  //format the confirmation message that is going to be send to the user.
  //The gmail will be sent from the group project gmail to the user's email.
  let userOptions = {
    from: process.env.GROUP_GMAIL,
    to: content.emailAddress,
    subject: content.subjectContent,
    html: `<p>Thank you for your message. We will reply as soon as we can.</p>`,
  };
  //send user a confirmation mail to let him know we will reply with help
  //as soon as we can
  transporter.sendMail(userOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}
// use to connect the routes defined in this file to the main
module.exports = router;
