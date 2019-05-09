const express = require('express');
const path = require('path');

const Upload = require('../controller/upload');
const cleanTempFiles = require('../controller/cleanTempFiles');

// Include the HTML Index / Video Preview page
const router = express.Router();
router.get('/', (req, res) => {
    // If it has a Video URL, then it will load the video preview page, if not, it will send you back tp upload a file
    pathToRedirect = (Upload.modules.videoURL !== "") ? 'preview' : 'index';
    let link = Upload.modules.videoURL;
    let fileName = Upload.modules.fileName;
    res.render(pathToRedirect, { link: link, fileName:  fileName});

    // Clean the tmp directoy and the Upload Object
    cleanTempFiles();
});

// Upload the files from the form
router.post('/', (req, res) => {    
    const Formidable = require('formidable');
    const fs = require('fs');
    const form = new Formidable.IncomingForm();

    form.parse(req, (err, fields, files) => {
        let oldPath = files.vimeoVideo.path;
        let pathFile = oldPath + files.vimeoVideo.name;
        let fileName = files.vimeoVideo.name;

        // Attach some atributes to Upload File to it can be uploaded
        Upload.modules.pathFile = pathFile;
        Upload.modules.fileName = fileName;

        //Include the Vimeo's route
        res.sendFile(pathFile);
        res.redirect('/vimeo');
        res.end();
    });
});

router.post('/afterPreview', (req, res) => {
    // Clean the tmp directoy and the Upload Object and send back to index.ejs
    cleanTempFiles();
    res.redirect('/');
    res.end();
});

module.exports = router;