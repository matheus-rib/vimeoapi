const express = require('express');
const router = express.Router();

const vimeoConfigs = require('../config/vimeo');
const access_token = vimeoConfigs.accessToken;
const client_id = vimeoConfigs.clientId;
const client_secret = vimeoConfigs.clientSecret;

router.get('/', (req, res) => {
    const fileSettings = require('../server');
    let Vimeo = require('vimeo').Vimeo;
    let client = new Vimeo(client_id, client_secret, access_token);
    let file_name = fileSettings.pathFile;
    client.upload(
        file_name,
        {
            'name': fileSettings.fileName,
            'description': 'API Video Upload for a job application @Tecnospeed'
        },
        (uri) => {
            console.log('Your video URI is: ' + uri);
        },
        (bytes_uploaded, bytes_total) => {
            var percentage = (bytes_uploaded / bytes_total * 100).toFixed(2)
            console.log(bytes_uploaded, bytes_total, percentage + '%')
        },
        (error) => {
            console.log('Failed because: ' + error)
        }
    );

    client.request(uri + '?fields=transcode.status', (error, body, status_code, headers) => {
        if(body.transcode.status === 'complete'){
          console.log('Your video finished transcoding.')
        }else if(body.transcode.status === 'in_progress'){
          console.log('Your video is still transcoding.')
        }else{
          console.log('Your video encountered an error during transcoding.')
        }
    });

    client.request(uri + '?fields=link', (error, body, statusCode, headers) => {
        if(error){
            console.log('There was an error making the request.')
            console.log('Server reported: ' + error)
            return
        }
    
        console.log('Your video link is: ' + body.link)
    });
});

module.exports = router;