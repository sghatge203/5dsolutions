const fs = require('fs');
const readAndWriteFile = (singleImage, savePath) => {
    fs.readFile(singleImage.path, function (err, data) {
        fs.writeFile(savePath, data, function (err) {
            if (err) console.log('Error:-' + err);
            console.log('Saved To: ' + singleImage.originalFilename + ' - ' + savePath);
        })
    })
}
module.exports = readAndWriteFile