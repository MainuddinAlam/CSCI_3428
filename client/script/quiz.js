/**
 * Purpose: The javascript file for the quiz page. This javascript file makes
 * part of the markup of the quiz page based on the number of questions.
 * It also checks and grades each question. Finally it displays the grades to
 * the user.
 *
 * Author: Mainuddin Alam Irteja (A00446752). Mainuddin Alam Irteja wrote this
 * whole file to make the quiz page functional.
 */

//global
//constant for the quiz div
const quizDiv = document.getElementById("quizPart");

//global
//constant for the div which contains the questions and the radio buttons
const contentsDiv = document.getElementById("content");

//global
//constant for using modals
const modal = document.getElementById("modal");

//global
//constant for the resultsDiv
const resultsDiv = document.getElementById("results");

//global
//constant for the div where mark will be displayed
const marks = document.getElementById("marks");

//global
//constant for the header part of the page
const header = document.getElementById("header");

//global
//global variable to store the quiz info
let quizInfo;

/**
 * Purpose: This function does a GET request to the server at the
 * URL = http://140.184.230.209:3026/quiz/getQuiz. This function calls
 * an anonymous callback function which retrieves the quiz information.
 *
 * @param "/quiz/getQuiz" is the url destination to be recognized
 * @param Anonymous callbqck function gets executed once the GET request has
 * been successfully recognized.
 *
 *        Purpose: The purpose of the anonymous callback function is to retrieve
 *        all the quiz information from the MongoDB database. The information
 *        retrieved is used to make all the questions in the quiz.html page
 *
 *        @param returnData the quiz information stored in the MongoDb database
 * Author: Mainuddin Alam Irteja (A00446752)
 */
$.get(`${SERVER_URL}/quiz/getQuiz`, (returnData) => {
  quizInfo = returnData;
  // Call the function to add all the MCQs
  displayAllMCQ(quizInfo);
}).fail((err) => {
  // Show the error if the request fails
  console.log(err.responeText);
});

/**
 * Purpose: The purpose of this function is to display all the multiple choice
 * questions to the French village website. The JSON object, questionsInfo has
 * all the information of the quiz. A for each loop will loop through the
 * JSON object and display the questions.
 *
 * @param {*} questionsInfo the JSON object containing the quiz information
 *
 * Author: Mainuddin Alam Irteja (A00446752)
 */
function displayAllMCQ(questionsInfo) {
  // Randomize the JSON object with all the questions info
  questionsInfo.sort((a, b) => 0.5 - Math.random());
  // loop throught the JSON object and display the questions
  questionsInfo.forEach((questionInfo, qNum) => {
    // shift the qNum so that it starts from 1
    qNum++;
    // constant for creating the legend tag
    const legend = document.createElement("legend");
    // constant for ceating a span tag
    const spanTag = document.createElement("span");
    // constant for creating a fieldset tag and setting its id
    const fSet = document.createElement("fieldset");
    fSet.id = `question${qNum}`;
    // Setting the innerText of the legend with the multiple choice question
    legend.innerText = `${qNum}. ${questionInfo.question}`;
    // Add the question to the fieldset
    fSet.appendChild(legend);

    // Call the function to create all the options for a question
    // Include the corresponding options of the question, fieldset and
    // question number as parameters
    createOptions(questionInfo.options, fSet, qNum);

    // Set the innerText and id of the span element
    // The innerText of the span element contains a message called "Saved"
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
 * Purpose: The purpose of this function is to create the options of a single
 * multiple choice question. This function also shows a message called
 * "Saved" when an option is selected.
 *
 * @param {*} optionsList All the options of a multiple choice question
 * @param {*} fSet The required fieldset where we will add the options
 * @param {*} questionNum The question number
 *
 *  Author: Mainuddin Alam Irteja (A00446752)
 */
function createOptions(optionsList, fSet, questionNum) {
  // Randomize the options pf a question
  optionsList.sort((a, b) => 0.5 - Math.random());
  optionsList.forEach((option) => {
    // constant for creating div tag which will contain one radio button
    const optionsDiv = document.createElement("div");
    // constant for creating the input tag
    const radioBtn = document.createElement("input");
    // constant for creating the label the radio button
    const labelTag = document.createElement("label");

    // variable used to get the particular span element
    let check;

    // Set attributes to the input tag
    radioBtn.type = "radio";
    radioBtn.name = "Options" + questionNum;
    radioBtn.value = option;
    radioBtn.id = option;

    // Make the radio buttons functional
    // Display the saved message to the user when a
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
 * Purpose: The purpose of this function is to show the modal. The modal
 * is used to check whether user really wants to submit the quiz. The dialog
 * element has a built in showModal() function which shows the modal.
 * I use the constant, modal which has the id of the dialog element.
 * I use the constant to access the showModal function. Hence it shows the
 * modal.
 *
 * Author: Mainuddin Alam Irteja (A00446752)
 */
function showModal() {
  modal.showModal();
}

/**
 * Purpose: The purpose of this function is to close the modal.
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
 * Purpose: The purpose of this function is to check answers when the
 * save button of the modal is clicked. Once the algorithm for checking
 * answers is executed, the displayAnswers(correctAnswers) function will
 * be called to display the results to the user.
 *
 * Author: Mainuddin Alam Irteja (A00446752)
 */
function checkAnswers() {
  // counter variable to track number of correct answers
  let correctAnswers = 0;
  // loop through the questions
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
  // Call the function to display the results to the user
  displayResults(correctAnswers);
  //We close the modal for good pratice
  closeModal();
}

/**
 * Purpose: The purpose of this function is to display results.
 * The function calculate the percentage of correct answers. It then
 * gets the id of the div where the percentage will be shown. Finally, we
 * hide the div containing the quiz and display the div containing the results.
 *
 * Author: Mainuddin Alam Irteja (A00446752)
 *
 * @param {*} correctAns The number of correct answers
 */
function displayResults(correctAns) {
  // Calculate quiz percentage
  let percentage = (correctAns / quizInfo.length) * 100;
  // Hide the quiz div and display the results div
  quizDiv.style.display = "none";
  resultsDiv.style.display = "";
  //Add the percentage to the div
  marks.innerHTML = "You scored: " + percentage.toFixed(2) + "%";
  // Create a JSConfetti object to display the confetti based on the score
  new JSConfetti().addConfetti({
    emojis: ["🍁", "🍏", "🍎", "🍀", "☘️"],
    emojiSize: 30,
    confettiNumber: Math.round(percentage) * 3,
  });
}
