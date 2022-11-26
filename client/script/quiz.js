/**
 * The javascript file for the quiz page. This javascript file makes part of
 * the markup of the quiz page based on the number of questions. It also
 * checks and grades each question. Finally it displays the grades to
 * the user.
 *
 *  Author: Mainuddin Alam Irteja (A00446752)
 */

//constants for the quiz div
const quizDiv = document.getElementById("quizPart");

// This is the div which contains the questions and the radio buttons
const contentsDiv = document.getElementById("content");

// Creating constant for using modals
// It gets the id of the dialog element
const modal = document.getElementById("modal");

//constant for the resultsDiv
const resultsDiv = document.getElementById("results");

//constant for the div where mark will be displayed
const marks = document.getElementById("marks");

// reference to the header part
const header = document.getElementById("header");

//global variable to store the quiz info
let quizInfo;

//get request to retrieve the quiz information from the database
$.get(`${SERVER_URL}/quiz/getQuiz`, (returnData) => {
    quizInfo = returnData;
    // Call the method to add all the MCQs
    displayAllMCQ(quizInfo);
}).fail((err) => {
    console.log(err.responeText);
});

/**
 * The purpose of this function is to display all the multiple choice
 *  questions.
 *
 * The questionsInfo is the JSON object which is needed to display
 * the multiple choice questions to the page.
 *
 * We start by randomizing the Javascript object so that each questions appear
 * randomly. The function has a forEach which loops through the JSON object.
 * In each iteration of the loop a fieldset is being created. In the fieldset,
 * we create the legend and the radio buttons. The legend is the question and
 * the labels of the radio button are the options of the multiple choice
 * queston.
 *
 * Author: Mainuddin Alam Irteja (A00446752)
 *
 * @param {*} questionsInfo the JSON object containing the quiz information
 */
function displayAllMCQ(questionsInfo) {
    // Randomize the object and loop through the questions
    questionsInfo.sort((a, b) => 0.5 - Math.random());
    questionsInfo.forEach((questionInfo, qNum) => {
        // shift the qNum so that it starts from 1
        qNum++;

        // Creating the legend tag
        const legend = document.createElement("legend");

        // Create a span tag
        const spanTag = document.createElement("span");

        // Creating a fieldset tag and setting its id
        const fSet = document.createElement("fieldset");
        fSet.id = `question${qNum}`;

        // Setting the innerText of the legend with the multiple choice question
        legend.innerText = `${qNum}. ${questionInfo.question}`;

        // Add the question to the fieldset
        fSet.appendChild(legend);

        // Add the method to create all the options for a question
        // Include the corresponding options of the question, fieldset and
        // question number as parameters
        createOptions(questionInfo.options, fSet, qNum);

        // Set the innerText and id of the span element
        // The innerText of the span element contains a tick mark
        // This is used to indicate to the user that option was saved when
        // he checks a radio button
        spanTag.innerHTML = "Saved";
        spanTag.id = `tMark${qNum}`;
        // Setting span tag to hidden by default
        spanTag.style.display = "none";

        // Add the spanTag mark to the fieldset
        legend.append(spanTag);

        // Add the fieldset element to the contentsDiv
        contentsDiv.appendChild(fSet);
    });
}

/**
 * The purpose of this function is to create the options of a single
 * multiple choice question
 *
 * The function starts with looping through the optionsList. We randomize
 * the optionsList so that each option appears randomly.For each option,
 * we create a div, input and label tag. The input tag and label tag is
 * used to make the radio buttons. The label of the radio button is an
 * option of the mcq. The radio button will be added to the div we created.
 * The div will be added to the fieldset of the related question.
 *
 * Author: Mainuddin Alam Irteja (A00446752)
 *
 * @param {*} optionsList All the options of a multiple choice question
 * @param {*} fSet The required fieldset where we will add the options
 * @param {*} questionNum The question number
 */
function createOptions(optionsList, fSet, questionNum) {
    // Randomize the options by shuffling
    optionsList.sort((a, b) => 0.5 - Math.random());
    optionsList.forEach((option) => {
        // Creating div tag which will contain one radio button
        const optionsDiv = document.createElement("div");
        // Creating the input tag
        const radioBtn = document.createElement("input");
        // Label the radio button
        const labelTag = document.createElement("label");

        // Variable used to get the particular span element
        let check;

        // Set attributes to the input tag
        radioBtn.type = "radio";
        radioBtn.name = "Options" + questionNum;
        radioBtn.value = option;
        radioBtn.id = option;

        // Make the radio buttons functional
        // Display the saved message and tick mark to the user when a
        // particular option is chosen
        radioBtn.onclick = function () {
            // Get the particular span element id
            check = document.getElementById(`tMark${questionNum}`);

            // It is needed when user tries to change options of an mcq
            check.style.display = "none";

            // Wait for 500 ms and display the saved message and the tick mark
            setTimeout(() => {
                check.style.display = "";
            }, 500);
        };

        // Set attributes of the label tag of the radio button
        labelTag.htmlFor = option;
        labelTag.innerHTML = option;

        // Add an option to the div
        optionsDiv.append(radioBtn, labelTag);

        // Add the div containing the option to the required fieldset
        fSet.append(optionsDiv);
    });
}

/**
 * The purpose of this function is to show the modal
 *
 * Modal is used to check whether user really wants to submit the quiz
 *
 * The dialog element has a built in showModal() function which shows the
 * modal. I use the constant, modal which has the id of the dialog element.
 * I use the constant to access the showModal function. Hence it shows the
 * modal.
 *
 * Author: Mainuddin Alam Irteja (A00446752)
 */
function showModal() {
    modal.showModal();
}

/**
 * The purpose of this function is to close the modal
 *
 * Modal is used to check whether user really wants to submit the quiz
 *
 * The dialog element has a built in close() function which closes the
 * modal. I use the constant, modal which has the id of the dialog element.
 * I use the constant to access the close function. Hence it closes the
 * modal.
 *
 * Author: Mainuddin Alam Irteja (A00446752)
 */
function closeModal() {
    modal.close();
}

/**
 * The purpose of this function is to check answers when the save button
 * of the modal is clicked.
 *
 * This function initializes a counter variable.This function loops through
 * the questions. For each iteration, we will get the name attribute for a
 * set of options of a particular question. We will check if an option from
 * the set of options is selected. If an option is checked and if it matches
 * with the actual answer, the counter variable is incremented. Finally,
 * displayResults(correctAnswers) method is called to display results to the
 * user. Finally we close the modal for good practice.
 *
 * Author: Mainuddin Alam Irteja (A00446752)
 */
function checkAnswers() {
    // Creating counter to track correct answers
    let correctAnswers = 0;
    for (let i = 0; i < quizInfo.length; i++) {
        // Get the name of the radio buttons of a particular mcq
        let radios = document.getElementsByName(`Options${i + 1}`);
        // Loop through the radio buttons
        for (const radio of radios) {
            // Check if an option is selected
            if (radio.checked) {
                // Check if answer matches
                if (radio.value == quizInfo[i].answer) {
                    correctAnswers++;
                }
            }
        }
    }

    // Display the results to the user
    displayResults(correctAnswers);

    //We close the modal for good pratice
    closeModal();
}

/**
 * The purpose of this function is to display results.
 *
 * The function calculate the percentage of correct answers. It then
 * gets the id of the div where the percentage will be shown. Finally, we
 * hide the div containing the quiz and display the div containing the results.
 *
 * Author: Mainuddin Alam Irteja (A00446752)
 *
 * @param {*} correctAns The number of correct answers
 */
function displayResults(correctAns) {
    //Calculate quiz percentage
    let percentage = (correctAns / quizInfo.length) * 100;

    //Hide the quiz div and display the results div
    quizDiv.style.display = "none";
    resultsDiv.style.display = "";

    //Add the percentage to the div
    marks.innerHTML = "You scored: " + percentage.toFixed(2) + "%";

    // create a JSConfetti object to display the confetti based on the score
    new JSConfetti().addConfetti({
        emojis: ["🍁", "🍏", "🍎", "🍀", "☘️"],
        emojiSize: 30,
        confettiNumber: Math.round(percentage) * 3,
    });
}
