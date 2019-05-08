const express = require('express');
const app = express();
const path = require('path');

app.use(express.json({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Load HTML (Front-end) And Vimeo Routes
htmlRoute = require('./routes/html');
vimeoRoute = require('./routes/vimeo');

app.use('/', htmlRoute);
app.use('/vimeo', vimeoRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running in port ${port}`));