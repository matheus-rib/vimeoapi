const express = require('express');
const app = express();

app.use(express.json({ extended: false }));

// Load Index And Vimeo Routes
htmlRoute = require('./routes/index');
vimeoRoute = require('./routes/vimeo');

app.use('/', htmlRoute);
app.use('/vimeo', vimeoRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running in port ${port}`));