const express = require('express');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator/check')
const cors = require('cors');

const business = require('../queries/business')
const staff = require('../queries/staff')

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

// API Routes for Staff
app.get('/staff', staff.getStaff)
app.get('/staff/:id', staff.getStaffById)
app.post('/staff', [
    check('business_id').isNumeric(),
    check('email').isEmail().trim().escape(),
    check('first_name').isLength({ min: 1 }).trim().escape(),
    check('last_name').isLength({ min: 1 }).trim().escape(),
    check('position').isLength({ min: 1 }).trim().escape(),
    check('phone_number').trim().escape()
  ], (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(422).json({ errors: errors.array() });
    }

    staff.createStaff(request, response);
})
app.put('/staff/:id', [
    check('business_id').isNumeric(),
    check('email').isEmail().trim().escape(),
    check('first_name').isLength({ min: 1 }).trim().escape(),
    check('last_name').isLength({ min: 1 }).trim().escape(),
    check('position').isLength({ min: 1 }).trim().escape(),
    check('phone_number').trim().escape()
  ], (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(422).json({ errors: errors.array() });
    }

    staff.updateStaff(request, response);
})
app.delete('/staff/:id', staff.deleteStaff)
app.get('/staff/business/:id', staff.getStaffByBusinessId)

app.listen(PORT, function(){
    console.log('Server is running on Port:',PORT);
});
