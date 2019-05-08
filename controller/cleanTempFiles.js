const path = require('path');
const fs = require('fs');

module.exports = () => {
    let tempDirectory = path.join(__dirname, "..\\tmp\\");
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
}