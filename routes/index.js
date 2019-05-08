const express = require('express');
const path = require('path');

const Upload = require('../controller/upload');

// Include the HTML Index page
const router = express.Router();
router.get('/', (req, res) => {
    pathToRedirect = (Upload.modules.videoURL !== "") ? path.join(__dirname, '../view/preview.html') : path.join(__dirname, '../view/index.html');
    let link = Upload.modules.videoURL;
    res.sendFile(pathToRedirect);
    
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

router.get('/preview', (req, res) => {
    res.sendFile(path.join(__dirname, '../view/preview.html'));
});

module.exports = router;