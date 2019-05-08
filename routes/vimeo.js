const express = require('express');
const router = express.Router();

const uploadedFile = require('../controller/upload');

const vimeoConfigs = require('../config/vimeo');
const access_token = vimeoConfigs.accessToken;
const client_id = vimeoConfigs.clientId;
const client_secret = vimeoConfigs.clientSecret;

router.get('/', (req, res) => {
    let Vimeo = require('vimeo').Vimeo;
    let client = new Vimeo(client_id, client_secret, access_token);
    let file_name = uploadedFile.modules.pathFile;
    client.upload(
        file_name,
        {
            'name': uploadedFile.modules.fileName,
            'description': 'API Video Upload for a job application @Tecnospeed'
        },
        (uri) => {
            client.request(uri + '?fields=transcode.status', (error, body) => {
                console.log(body.transcode.status);
            });

            client.request(uri + '?fields=link', (error, body) => {
                if(body.link){
                    uploadedFile.modules.videoURL = body.link;
                    //uploadedFile.modules.videoURL = body.embed.html.replace('\\','');
                    console.log(body);
                }
                res.redirect('../');
                res.end();
            });
        },
        (bytes_uploaded, bytes_total) => {
            var percentage = (bytes_uploaded / bytes_total * 100).toFixed(2)
            console.log(bytes_uploaded, bytes_total, percentage + '%')
        },
        (error) => {
            console.log('Failed because: ' + error)
        }
    );
});

module.exports = router;