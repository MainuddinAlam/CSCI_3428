/**
 * Purpose: The purpose of this Javascript file is to provide
 * the functionality of the newQuiz.html page.
 *
 * Author: Mainuddin Alam Irteja (A00446752). Mainuddin Alam Irteja
 * all the functions except the  populateSavedOptionsPreview() function.
 * Author: Muhammad Altaf Agowun (A00448118). Muhammad Altaf Agowun wrote
 * the populateSavedOptionsPreview() function.
 */

//global
//constant to represent the server url
const SERVER_URL = "http://140.184.230.209:3026";
//global
//constant to represent a preview of the options user will enter
const previewOptions = document.getElementById("previewOptions");
//global
//array to represent the options of the question
let optionsList = [];
//global
//boolean variable to check if message is shown on screen
let isShown = false;

/**
 * Purpose: The purpose of the function is to save the options of a
 * multiple choice question. When user clicks the save option button,
 * the user's option will be added to the array. Then we set the options
 * textfield to empty so that we can update the placeholder. Updating the
 * placeholder tells the user to input the next option.
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
  //set the option value to empty string and update the placeholder
  option.value = "";
  option.placeholder = `Enter Option #${optionsList.length + 1}`;
  // update the preview by adding the new item at the end
  populateSavedOptionsPreview();
}

/**
 * Purpose: The purpose of this function is to provide a
 * preview with the items in the option list to the user. The function
 * initially clears the preview. When an option is saved, the user can
 * view that and all options. The preview has a remove button for each
 * option where the user can remove their desired option.
 *
 *  Author: Muhammad Altaf Agowun (A00448118)
 */
function populateSavedOptionsPreview() {
  // clear the content of the preview
  previewOptions.innerHTML = "";
  // loop through the options
  optionsList.forEach((option, i) => {
    // constant to create the option list
    const listItem = document.createElement("li");

    // constant to create the option text holder
    const text = document.createElement("p");
    text.innerText = option;

    // constant to create the remove option button
    const removeButton = document.createElement("button");

    removeButton.addEventListener("click", () => {
      // remove the option from the array
      optionsList.splice(i, 1);
      // get reference to the input text for the option
      let option = getOptionReference();
      // provide meaningful placehoder text
      option.placeholder = `Enter Option #${optionsList.length + 1}`;
      // upadte the option preview
      populateSavedOptionsPreview();
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
 * Purpose: The purpose of this function is to generate random options.
 *
 * Author: Mainuddin Alam Irteja (A00446752)
 */
function generateOptions() {
  //reference to the textfield where an option is being added
  let option = getOptionReference();
  /**
   * Purpose: The purpose of this is to do a GET request at
   * URL = http://140.184.230.209:3026/quiz/getWord. This function calls
   * an anonymous callback function which retrieves the random word.
   *
   * @param "/quiz/getWord" is the url destination to be recognized
   * @param Anonymous callbqck function gets executed once the GET request has
   * been successfully recognized.
   *
   *        Purpose: The purpose of the anonymous callback function is to return
   *        the random word from the server and setting the word in the option
   *        textfield
   *
   *        @param returnData the random word retrieved from the server
   *
   * Author: Mainuddin Alam Irteja (A00446752)
   */
  $.get(`${SERVER_URL}/quiz/getWord`, (returnData) => {
    //set the option with the random word
    option.value = returnData;
  }).fail((err) => {
    //Show the error if the request fails
    console.log(err.responeText);
  });
}

/**
 * Purpose: THe purpose of this function is to clear all the options.
 * It does this by assigning the array to be empty. Furthermore, it resets the
 * options textfield to its original state which says, "Enter Option #1".
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
  populateSavedOptionsPreview();
}

/**
 * Purpose: The purpose of this function is to return the
 * reference of the question textfield.
 *
 * Author: Mainuddin Alam Irteja (A00446752)
 * @returns the reference to the question textfield
 */
function getQuestionReference() {
  let question = document.getElementById("question");
  return question;
}

/**
 * Purpose: The purpose of this function is to return the
 * reference of the options textfield.
 *
 * Author: Mainuddin Alam Irteja (A00446752)
 * @returns the reference to the options textfield
 */
function getOptionReference() {
  let option = document.getElementById("options");
  return option;
}

/**
 * Purpose: The purpose of this function is to return the
 *  reference of the correct answers textfield
 *
 * Author: Mainuddin Alam Irteja (A00446752)
 * @returns the reference to the correct answers textfield
 */
function getCorrectAnswerReference() {
  let correctAns = document.getElementById("correctAns");
  return correctAns;
}

/**
 * Purpose: The purpose of this function is to clear the current question.
 * First it clears the question from the question textfield. Then it calls
 * the clearOptions() function to remove the options. Finally, it clears
 * out the correct answer textfield.
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
 * Purpose: The purpose of the function is to upload the multiple choice
 * question to the server. It sends the question information in the form
 * of a JSON object. The JSON object will have the question, options
 * and the correct answer. This function will also clear out all the input
 * textfields so that user can enter another question. This function will
 * also display a message, to the user when they upload one question to
 * the server. The message will say "Your question has been added."
 *
 * Author: Mainuddin Alam Irteja (A00446752)
 */
async function uploadToServer() {
  //reference to the textfield where question is being added
  let question = getQuestionReference();
  //reference to the textfield where the correct answer is being added
  let correctAns = getCorrectAnswerReference();
  /*create JSON object representing the question details
  contactDetails = {
    Question: {
      type: [String]
    },
    Options: {
      type: [String Array]
    },
    Correct_Answer: {
      type: [String]
    }
  }
  */
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

  /**
   * Purpose: The purpose of this function is to do a POST request
   * to the server at the URL = http://140.184.230.209:3026/quiz/addMCQ.
   * This function calls an anonymous callback function which sends new
   * multiple choice question to the server.
   *
   * @param "/quiz/addMCQ" is the url destination to be recognized
   * @param mcqInfo The JSON object with multiple choice question information
   * @param Anonymous callbqck function gets executed to send the POST request
   * to the server
   *
   *        Purpose: The purpose of the anonymous callback function is to POST
   *        the JSON object containing the multiple choice question information to
   *        the server and to console.log(returnData) to check whether the information
   *        is being sent or not.
   *
   *        @param returnData the information retrieved from the server
   *
   *
   * Author: Mainuddin Alam Irteja (A00446752)
   */
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
 * Purpose: The purpose of this function is to hide the message which shows
 * up when a question is uploaded to the server
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
