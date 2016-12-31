var BasicFlashcard = require("./basic-card.js");
var ClozeFlashcard = require("./cloze-card.js");
var inquirer = require('inquirer');
var identifier = "...";
var fs = require("fs");
inquirer.prompt([{
    type: "list",
    message: "What would you like to do?",
    choices: ["Read card", "Create card"],
    name: "searchType"
}]).then(function (flashcard) {
    if (flashcard.searchType === "Read card") {
        fs.readFile("log.txt", "utf8", function (error, data) {
            var dataLine = data.split("\n");
            var count = 0;
            readCards(dataLine, count);
        });
    } else if (flashcard.searchType === "Create card") {
        inquirer.prompt([{
            type: "list",
            message: "What type of Card whould you like to Create?",
            choices: ["Cloze", "Basic"],
            name: "cardType"
        }]).then(function (flashcard) {
            if (flashcard.cardType === "Cloze") {
                inquirer.prompt([{
                    type: "input",
                    message: "What is the text? (please use '...' where the cloze should go)",
                    validate: function (input) {
                        if (input.indexOf(identifier) === -1) {
                            console.log("\n" + " *** ERROR: YOU MUST INCLUDE '...' IN TEXT");
                            return false;
                        } else {
                            return true;
                        }
                    },
                    name: "text"
                }, {
                    type: "input",
                    message: "What is the cloze?",
                    name: "cloze"
                }]).then(function (flashcard) {
                    ClozeFlashcard(flashcard.text, flashcard.cloze);
                });
            } else if (flashcard.cardType === "Basic") {
                inquirer.prompt([{
                    type: "input",
                    message: "What is the question?",
                    name: "front"
                }, {
                    type: "input",
                    message: "What is the answer?",
                    name: "back"
                }]).then(function (flashcard) {
                    BasicFlashcard(flashcard.front, flashcard.back);
                });
            }
        });
    }
});

function readCards(array, index) {
    var thisTrivia = array[index].split(",");
    inquirer.prompt([{
        type: "input",
        message: thisTrivia[0],
        name: "question"
    }]).then(function (answer) {
        if (answer.question === thisTrivia[1]) {
            console.log("Good Work!");
            readCards(array, index + 1);
        } else {
            console.log("This is incorrect!");
            inquirer.prompt([{
                type: "confirm",
                message: "would you like to see the answer?",
                name: "fullAnswer",
                default: true
            }]).then(function (see) {
                if (see.fullAnswer === true) {
                    console.log(thisTrivia[1]);
                    readCards(array, index + 1);
                } else {
                    readCards(array, index + 1);
                }
            });
        }
    });
}