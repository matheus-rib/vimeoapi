const express = require('express');
const path = require('path');

const Upload = require('../controller/upload');
const cleanTempFiles = require('../controller/cleanTempFiles');

// Include the HTML Index / Video Preview page
const router = express.Router();
router.get('/', (req, res) => {
    pathToRedirect = (Upload.modules.videoURL !== "") ? 'preview' : 'index';
    let link = Upload.modules.videoURL;
    res.render(pathToRedirect, { link: link });
    cleanTempFiles();
});

// Upload the files from the form
router.post('/', (req, res) => {    
    const Formidable = require('formidable');
    const fs = require('fs');
    const form = new Formidable.IncomingForm();

    form.parse(req, (err, fields, files) => {
        let oldPath = files.vimeoVideo.path;
        let pathFile = path.join(__dirname, "..\\tmp\\") + files.vimeoVideo.name;
        let fileName = files.vimeoVideo.name;
        
        fs.rename(oldPath, pathFile, (err) => {
            if(err){
                console.error(err);
            }
        });

        Upload.modules.pathFile = pathFile;
        Upload.modules.fileName = fileName;

        //Include the Vimeo's route
        res.sendFile(pathFile);
        res.redirect('/vimeo');
        res.end();
    });
});

router.post('/afterPreview', (req, res) => {
    cleanTempFiles();
    res.redirect('/');
    res.end();
});

module.exports = router;