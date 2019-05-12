const express = require('express');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator/check')

const business = require('../queries/business')

const app = express();
const PORT = 5000;

app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.use(bodyParser.json());

// API Routes for Business
app.get('/businesses', business.getBusinesses)
app.get('/business/:id', business.getBusinessById)
app.post('/business', [
    check('name').isLength({ min: 1 }).trim().escape(),
    check('location').isLength({ min: 1 }).trim().escape(),
    check('type').trim().escape()
  ], (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(422).json({ errors: errors.array() });
    }

    business.createBusiness(request, response);
})
app.put('/business/:id', [
    check('name').isLength({ min: 1 }).trim().escape(),
    check('location').isLength({ min: 1 }).trim().escape(),
    check('type').trim().escape()
  ], (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(422).json({ errors: errors.array() });
    }

    business.updateBusiness(request, response);
})
app.delete('/business/:id', business.deleteBusiness)
app.get('/business/:id/staff', business.getBusinessStaff)

app.listen(PORT, function(){
    console.log('Server is running on Port:',PORT);
});