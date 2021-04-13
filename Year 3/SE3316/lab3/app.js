const path = require('path');
const express = require('express');
var cors = require ('cors');

const port = 2039;
const app = express();
app.use(express.json());
// app.use(express.urlencoded());

app.use(cors({
    origin:['http://localhost:2039','http://127.0.0.1:2039', 'http://localhost:4200'],
    credentials:true
}));

app.use(function (req, res, next) {

    res.header('Access-Control-Allow-Origin', "http://localhost:4200");
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
});

app.use('/public', express.static(__dirname + '/src/public'));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/src/index.html'));
});

const scheduleRoute = require('./src/routes/schedule');
const courseRoute = require('./src/routes/courses');

app.use('/', courseRoute);
app.use('/', scheduleRoute);

// app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
