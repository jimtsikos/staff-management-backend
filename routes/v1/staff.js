const staff = require('../../queries/staff')
const { check, validationResult } = require('express-validator/check')

module.exports = function(app){
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
}