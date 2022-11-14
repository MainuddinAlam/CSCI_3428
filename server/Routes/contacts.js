require("dotenv").config();
const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

router.post("/sendMessage", (req, res) => {
    let emailContent = req.body;
    console.log(emailContent);
    console.log(emailContent.fName);
    try {
        mail(emailContent);
        return res.status(200).send("Message Successfully Sent!");
    } catch (error) {
        res.status(400).send("Message Could not be Sent");
    }
});

//Algorithm implemented from W3Schools
function mail(content) {
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.GROUP_GMAIL,
            pass: process.env.GMAIL_PWD,
        },
    });

    //send user message to group project gmail
    let hostOptions = {
        from: process.env.GROUP_GMAIL,
        to: process.env.GROUP_GMAIL,
        subject: content.subjectContent,
        html: `<p>Email was sent from: ${content.emailAddress}</p>
     <p>The name of the person is: ${content.fName} ${content.lName}</p>
     <p>Message: ${content.messageContent}</p>`,
    };

    transporter.sendMail(hostOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });

    //send user a mail to let him know we will reply with help as soon as we can
    let userOptions = {
        from: process.env.GROUP_GMAIL,
        to: content.emailAddress,
        subject: content.subjectContent,
        html: `<p>Thank you for your message. We will reply as soon as we can.</p>`,
    };

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
