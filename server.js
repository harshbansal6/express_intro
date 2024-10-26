const fs  = require('fs');
const path = require('path');
const fsPromises = require('fs').promises;
const express = require('express');
const app = express();
const { logger } = require('./middleware/logEvents');
const cors = require('cors');

const PORT = process.env.PORT || 3000;

app.use(logger);
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use(express.json());
app.use('/', express.static(path.join(__dirname, '/public')));
app.use('/subdir', express.static(path.join(__dirname, '/public')));

app.use('/', require('./routes/root'));
app.use('/subdir', require('./routes/subdir'));
app.use('/employees', require('./routes/api/employees'));


app.all('*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
})

app.get('/hello-page(.html)?', (req, res, next) => {
    console.log("attempted");
    next()

},(req, res) => {
    res.send("hello world")
})

app.use(function (err, req, res , next) {
    console.error(err.stack);
    res.status(500).send(err.message);
})

app.listen(PORT, () => console.log(`server running on port ${PORT}`));