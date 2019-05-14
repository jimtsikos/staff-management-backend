const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

const corsOptions = {
    origin: 'http://localhost:3000'
}

app.use(cors(corsOptions));
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.use(bodyParser.json());

require('../routes/v1/business')(app);
require('../routes/v1/staff')(app);

app.listen(PORT, function(){
    console.log('Server is running on Port:',PORT);
});