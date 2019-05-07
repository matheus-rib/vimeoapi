const express = require('express');
const app = express();
const path = require('path');

// Include the HTML Index page
const htmlRouter = express.Router();
htmlRouter.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/view/index.html'));
});

// Include the Vimeo's route
const vimeo = require('./routes/vimeo');

app.use(express.json({ extended: false }));

app.use('/vimeo', vimeo);
app.use('/', htmlRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running in port ${port}`));