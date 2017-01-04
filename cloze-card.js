var fs = require("fs");
module.exports = ClozeFlashcard;
// Constructor fucntion for Cloze-Deleted flashcards
function ClozeFlashcard(text, cloze) {
	// identifier is used to identify where the cloze-deleted section should go in the text
    var identifier = "---";
    var logTxt = "\n" + [text, cloze];
    this.text = text;
    this.cloze = text.replace(/identifier/i, cloze);
    // then append input to log.txt
    fs.appendFile("log.txt", logTxt);
}