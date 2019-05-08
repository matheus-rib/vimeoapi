module.exports = function waitProccess(uri, client){
    setTimeout(() => { 
        client.request(uri + '?fields=transcode.status', (error, body) => {
            let statusResponse = body.transcode.status;
            console.log(statusResponse);

            if(statusResponse !== "in_progress" ){
                isReady = (statusResponse === "complete");
                return {
                    isReady,
                    error
                }
            }
            waitProccess(uri, client);
        });

    }, 3000);  
};