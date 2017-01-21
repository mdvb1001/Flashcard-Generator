// Load the NPM Package Inquirer for terminal prompts 
var inquirer = require('inquirer');
// Assign variable to fs in order to use constructor functions found in seperate files
var fs = require("fs");
// Fetch function in basic-card.js
var BasicFlashcard = require("./basic-card.js");
// Fetch function in basic-card.js
var ClozeFlashcard = require("./cloze-card.js");
// Defines where the deleted portion of text should be in text of cloze-delelted flashcards
var identifier = "---";
// Creates a "Prompt" with a series of commands: Create of Read
startPrompt();

function startPrompt() {
    inquirer.prompt([{
        type: "list",
        message: "What would you like to do?",
        choices: ["Create card", "Read card"],
        name: "searchType"
            // Once a command is chosen, then... 
    }]).then(function (flashcard) {
        if (flashcard.searchType === "Create card") {
            // If user selects Create command, then two other commands are prompted
            createCard();
        } else if (flashcard.searchType === "Read card") {
            fs.readFile("log.txt", "utf8", function (error, data) {
                var dataLine = data.split("\n");
                var count = 0;
                return readCards(dataLine, count);
            });
        }
    });
}

function createCard() {
    inquirer.prompt([{
        type: "list",
        message: "What type of Card whould you like to Create?",
        choices: ["Basic", "Cloze"],
        name: "cardType"
            // Once a this second command is chosen, then...
    }]).then(function (flashcard) {
        // If user selects Basic then a basic cards is created in this two-step process
        if (flashcard.cardType === "Basic") {
            // User inputs the question     
            inquirer.prompt([{
                type: "input",
                message: "What is the question?",
                validate: function (input) {
                    if (input === '') {
                        console.log('Error: You must type something!');
                        return false;
                    } else {
                        return true;
                    }
                },
                name: "front"
            }, {
                // User inputs the answer
                type: "input",
                message: "What is the answer?",
                validate: function (input) {
                    if (input === '') {
                        console.log('Error: You must type something!');
                        return false;
                    } else {
                        return true;
                    }
                },
                name: "back"
            }]).then(function (flashcard) {
                // ... then constructor function in basic-card.js appends data to log.txt
                BasicFlashcard(flashcard.front, flashcard.back);
                startPrompt();
            });
            // If user selects Cloze then a cloze cards is created in this two-step process
        } else if (flashcard.cardType === "Cloze") {
            inquirer.prompt([{
                // User inputs the text with "..."
                type: "input",
                message: "What is the partial text? (type '---' to indicate deleted portion)",
                // If user forget to add "..." then an error message is prompted
                validate: function (input) {
                    if (input === '') {
                        console.log('Error: You must type something!');
                        return false;
                    } else if (input.indexOf(identifier) === -1) {
                        console.log("\n" + " *** ERROR: YOU MUST INCLUDE '---' IN TEXT");
                        return false;
                    } else {
                        return true;
                    }
                },
                name: "text"
            }, {
                // If user fills out first step appropriately, then user is ashed to input answer (missing bit)
                type: "input",
                message: "What is the deleted portion?",
                validate: function (input) {
                    if (input === '') {
                        console.log('Error: You must type something!');
                        return false;
                    } else {
                        return true;
                    }
                },
                name: "cloze"
            }]).then(function (flashcard) {
                // ... then constructor function in cloze-card.js appends data to log.txt
                ClozeFlashcard(flashcard.text, flashcard.cloze);
                startPrompt();
            });
        }
    });
    // If user selects Read, then each card is displayed one at a time
}
// This function displays the flashcards... 
function readCards(array, index) {
    if (index < array.length) {
        // The 'front' or 'text' part of the card is split from 'back' or 'cloze' part
        var thisTrivia = array[index].split(",");
        // Here the 'front' or 'text' portion of the card is displayed
        inquirer.prompt([{
            type: "input",
            message: thisTrivia[0],
            name: "question"
        }]).then(function (answer) {
            // If the input by user matched the 'back' or 'cloze'...
            if (answer.question === thisTrivia[1]) {
                // This message appears
                console.log("Good Work!");
                readCards(array, index + 1);
                // If the input does not match... 
            } else {
                // This message appears and... 
                console.log("This is incorrect!");
                // User is prompted to confirm whether or not the answer should be revealed
                return inquirer.prompt([{
                    type: "confirm",
                    message: "would you like to see the answer?",
                    name: "fullAnswer",
                    default: true
                }]).then(function (see) {
                    // then... here the answer is shown and the next card is displayed
                    if (see.fullAnswer === true) {
                        console.log(thisTrivia[1]);
                        return readCards(array, index + 1);
                        // ... or here, the next card is shown only  
                    } else {
                        console.log(index + 1);
                        return readCards(array, index + 1); 
                    }
                });
            }
        });
    } else {
        startPrompt();
    }
 }