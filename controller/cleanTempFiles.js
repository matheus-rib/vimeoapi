const path = require('path');
const fs = require('fs');
const uploadCache = require('../controller/upload');

module.exports = () => {
    // Clean the files existing in /tmp
    let tempDirectory = path.join(__dirname, "..\\tempFiles\\");
    fs.readdir(tempDirectory, (err, files) => {
        if(err){
            throw err;
        }
        files.forEach((file) => {
            fs.unlink(path.join(tempDirectory, file), err => {
                if(err){
                    throw err;
                }
            });
        });
    });

    // Clean the Upload object
    cleanUpload = uploadCache.modules
    for(let _uploadProperty in uploadCache.modules){
        cleanUpload[_uploadProperty] = "";
    }
}