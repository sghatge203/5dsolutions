
const fs = require('fs');
const AWS = require('aws-sdk');
const ID = process.env.ACCESS_ID;
const SECRET =   process.env.SECRET_KEY;
const BUCKET_NAME =  process.env.BUCKET_NAME;
const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET
});
const uploadFile = (fileName,name) => {
    const fileContent = fs.readFileSync(fileName);
    const params = {
        Bucket:BUCKET_NAME,
        Key: 'momentsImages/'+ name,
        Body: fileContent
    };
    s3.upload(params, function(err, data) {
        if (err) {
            throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
    });
};
module.exports = uploadFile