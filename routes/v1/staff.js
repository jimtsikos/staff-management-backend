const staff = require('../../queries/staff')
const { check, validationResult } = require('express-validator/check')

module.exports = function(app){
	app.get('/staff', staff.getStaff)
	app.get('/staff/business/:id', staff.getStaffByBusinessId)
	app.get('/staff/member/:id', staff.getMemberById)
	app.post('/staff/member', [
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

		staff.createMember(request, response);
	})
	app.put('/staff/member/:id', [
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

		staff.updateMember(request, response);
	})
	app.delete('/staff/member/:id', staff.deleteMember)
}