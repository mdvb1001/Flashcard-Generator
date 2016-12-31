var fs = require("fs");
module.exports = ClozeFlashcard;

function ClozeFlashcard(text, cloze) {
    var identifier = "...";
    var logTxt = "\n" + [text, cloze];
    this.text = text;
    this.cloze = text.replace(/.../i, cloze);
    fs.appendFile("log.txt", logTxt);
}