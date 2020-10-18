const fs = require('fs');
const uploadFile = require('./bucket');
const readAndWriteFile = (singleImage, savePath) => {
    fs.readFile(singleImage.path, function (err, data) {
        fs.writeFile(savePath, data, function (err) {
            if (err) console.log('Error:-' + err);
            uploadFile(savePath,singleImage.originalFilename)
            console.log('Saved To: ' + singleImage.originalFilename + ' - ' + savePath);
        })
    })
}
module.exports = readAndWriteFile