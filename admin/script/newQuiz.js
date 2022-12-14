/**
 * Functionality of the newQuiz.html page
 *
 * This javascript file is used to create a new multiple-choice question
 * and add it to the server
 *
 * Author: Mainuddin Alam Irteja (A00446752)
 */

//server url
const SERVER_URL = "http://140.184.230.209:3026";
//array of the options of the question
let optionsList = [];
//boolean to check if message is shown on screen
let isShown = false;

const previewOptions = document.getElementById("previewOptions");

/**
 * Function to save the options of a multiple choice question
 *
 * When user clicks the save option button, the user's option will
 * be added to the array. Then we set the options textfield to empty
 * so that we can update the placeholder. Updating the placeholder
 * tells the user to input the next option.
 *
 * Author: Mainuddin Alam Irteja (A00446752)
 */
function saveOptions() {
    //reference to the textfield where an option is being added
    let option = getOptionReference();

    // ensure new option is not empty
    if (option.value.length == 0) {
        return;
    }

    //add the new option to the options list
    optionsList.push(option.value);
    console.log(optionsList);
    //set the option value to empty string and update the placeholder
    option.value = "";
    option.placeholder = `Enter Option #${optionsList.length + 1}`;

    // update the preview by adding the new item at the end
    populateSavedOPtionsPreview();
}

/**
 * poplate the preview with the items in the option list
 */
function populateSavedOPtionsPreview() {
    // clear the content of the preview
    previewOptions.innerHTML = "";
    // loop through the options
    optionsList.forEach((option, i) => {
        // create the option list
        const listItem = document.createElement("li");

        // create the option text holder
        const text = document.createElement("p");
        text.innerText = option;

        // create the remove option button
        const removeButton = document.createElement("button");

        removeButton.addEventListener("click", () => {
            // remove the option from the array
            optionsList.splice(i, 1);
            // get reference to the input text for the option
            let option = getOptionReference();
            // provide meaningful placehoder text
            option.placeholder = `Enter Option #${optionsList.length + 1}`;
            // upadte the option preview
            populateSavedOPtionsPreview();
        });

        // add the text for the remove option button
        removeButton.innerHTML = "remove";

        // append the text and button to the option list
        listItem.append(text, removeButton);

        // append the option to the preview
        previewOptions.append(listItem);
    });
}

/**
 * Function to generate random options
 *
 * This function does a get request to the server. It gets a random
 * word from the server. This random word is added to the options
 * textfield.
 *
 * Author: Mainuddin Alam Irteja (A00446752)
 */
function generateOptions() {
    //reference to the textfield where an option is being added
    let option = getOptionReference();
    $.get(`${SERVER_URL}/quiz/getWord`, (returnData) => {
        option.value = returnData;
    }).fail((err) => {
        console.log(err.responeText);
    });
}

/**
 * Function to clear all the options
 *
 * This function clears all the options. It does this by assigning
 * the array to be empty. Furthermore, it resets the options textfield
 * to its original state which says, "Enter Option #1".
 *
 * Author: Mainuddin Alam Irteja (A00446752)
 */
function clearOptions() {
    //empty out the options array
    optionsList = [];
    //reference to the textfield where an option is being added
    let option = getOptionReference();
    //set the option value to empty string and update the placeholder
    option.value = "";
    option.placeholder = `Enter Option #1`;

    // update the preview
    populateSavedOPtionsPreview();
}

/**
 * Function which returns the reference of the question textfield
 *
 * Author: Mainuddin Alam Irteja (A00446752)
 * @returns the reference to the question textfield
 */
function getQuestionReference() {
    let question = document.getElementById("question");
    return question;
}

/**
 * Function which returns the reference of the options textfield
 *
 * Author: Mainuddin Alam Irteja (A00446752)
 * @returns the reference to the options textfield
 */
function getOptionReference() {
    let option = document.getElementById("options");
    return option;
}

/**
 * Function which returns the reference of the correct answers textfield
 *
 * Author: Mainuddin Alam Irteja (A00446752)
 * @returns the reference to the correct answers textfield
 */
function getCorrectAnswerReference() {
    let correctAns = document.getElementById("correctAns");
    return correctAns;
}

/**
 * Function to clear the current question
 *
 * This function clears the current question. First it clears the
 * question from the question textfield. Then it calls the clearOptions()
 * function to remove the options. Finally, it clears out the correct
 * answer textfield.
 *
 * Author: Mainuddin Alam Irteja (A00446752)
 */
function clearQuestion() {
    //reference to the textfield where question is being added
    let question = getQuestionReference();
    //reference to the textfield where the correct answer is being added
    let correctAns = getCorrectAnswerReference();
    //clear the question
    question.value = "";
    //clear the options
    clearOptions();
    //clear the correct answer
    correctAns.value = "";
}

/**
 * Function to upload the multiple choice question to the server
 *
 * This function sends the question information to the server. It
 * sends the question information in the form of a JSON object.
 * The JSON object will have the question, options and the correct answer.
 * This function will also clear out all the input textfields so that user
 * can enter another question. This function will also display a message, to
 * the user when they upload one question to the server. The message will say
 * "Your question has been added."
 *
 * Author: Mainuddin Alam Irteja (A00446752)
 */
async function uploadToServer() {
    //reference to the textfield where question is being added
    let question = getQuestionReference();
    //reference to the textfield where the correct answer is being added
    let correctAns = getCorrectAnswerReference();
    //save the details as a JSON object
    const mcqInfo = {
        Question: question.value,
        Options: optionsList,
        Correct_Answer: correctAns.value,
    };

    // check if the question is defined
    if (question.value == 0) {
        alert("Please enter a question");
        return;
    }

    // check if the correct answer matches an option
    if (!optionsList.includes(correctAns.value)) {
        alert("Answer does not match exactly with one of the options");
        return;
    }

    //send the question details to the server
    $.post(`${SERVER_URL}/quiz/addMCQ`, mcqInfo, (returnData) => {
        console.log(returnData);
    }).fail((err) => {
        console.log(err.responeText);
    });
    //clear the current question
    clearQuestion();

    // Wait for 600 ms and display the saved message
    setTimeout(() => {
        //get the reference to the region where the message will be shown
        let message = document.getElementById("message");
        message.style.display = "";
    }, 600);
    //set the boolean variable to true
    isShown = true;
}

/**
 * Function to hide the message which shows up when a question is
 * uploaded to the server
 *
 * Author: Mainuddin Alam Irteja (A00446752)
 */
function checkFocus() {
    if (isShown == true) {
        //get the reference to the region where the message will be shown
        let message = document.getElementById("message");
        //hide the message
        message.style.display = "none";
        //set the boolean variable to false
        isShown = false;
    }
}
