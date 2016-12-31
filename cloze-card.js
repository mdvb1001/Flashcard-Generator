var fs = require("fs");
module.exports = ClozeFlashcard;

function ClozeFlashcard(text, cloze) {
    this.text = text;
    this.cloze = text.replace(/.../i, cloze);
    logTxt = "\n" + [text, cloze];
    fs.appendFile("log.txt", logTxt);
}