const path = require('path');
const fs = require('fs');
const uploadCache = require('../controller/upload');

module.exports = () => {
    // Clean the Upload object
    cleanUpload = uploadCache.modules
    for(let _uploadProperty in uploadCache.modules){
        cleanUpload[_uploadProperty] = "";
    }
}