var fs = require("fs");
module.exports = BasicFlashcard;

function BasicFlashcard(front, back) {
    this.front = front;
    this.back = back;
    logTxt = "\n" + [front, back];
    fs.appendFile("log.txt", logTxt);
}