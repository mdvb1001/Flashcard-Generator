/* 
Psuedo Code:

PHASE 1 -- BasicFlashcard 

- Constructor function that has two params, so that user can add any Flashcard at will
	FRONT and BACK.  
*/
var BasicFlashcard = require("./basic-card.js");
var inquirer = require('inquirer');
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
            type: "input",
            message: "What question?",
            name: "front"
        }, {
            type: "input",
            message: "What answer?",
            name: "back"
        }]).then(function (flashcard) {
            BasicFlashcard(flashcard.front, flashcard.back);
        });
    }
});
function readCards(array, index) {
    var thisQuestion = array[index].split(",");
    inquirer.prompt([{
        type: "input",
        message: thisQuestion[0],
        name: "question"
    }]).then(function (answer) {
        if (answer.question === thisQuestion[1]) {
            console.log("Good Work!");
        } else {
            console.log("You're so WRONG!");
        }        
        if (index < array.length - 1) {
            readCards(array, index + 1);
        }
    });
}