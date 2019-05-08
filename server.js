const express = require('express');
const app = express();
const path = require('path');

app.use(express.json({ extended: false }));

// Include the HTML Index page
const htmlRouter = express.Router();
htmlRouter.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/view/index.html'));
});


// Upload the files from the form
htmlRouter.post('/', (req, res) => {
    const Formidable = require('formidable');
    const fs = require('fs');
    const form = new Formidable.IncomingForm();

    form.parse(req, (err, fields, files) => {
        let oldPath = files.vimeoVideo.path;

        let pathFile = __dirname + "\\tmp\\" + files.vimeoVideo.name;
        let fileName = files.vimeoVideo.name;
        
        fs.rename(oldPath, pathFile, (err) => {
            if(err){
                console.error(err);
            }
        });

        module.exports = {
            pathFile,
            fileName
        };

        // Include the Vimeo's route
        const vimeo = require('./routes/vimeo');
        app.use('/vimeo', vimeo);
   
        res.sendFile(pathFile);
    });

    res.redirect('/vimeo');
    res.end();
});

app.use('/', htmlRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running in port ${port}`));