var fs = require("fs");
module.exports = BasicFlashcard;
// Constructor function for basic flashcards... 
function BasicFlashcard(front, back) {
    this.front = front;
    this.back = back;
    logTxt = "\n" + [front, back];
    // then append input to log.txt
    fs.appendFile("log.txt", logTxt);
}