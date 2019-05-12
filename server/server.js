const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.use(bodyParser.json());

app.listen(PORT, function(){
    console.log('Server is running on Port:',PORT);
});