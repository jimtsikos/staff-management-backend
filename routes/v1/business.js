const business = require('../../queries/business')
const { check, validationResult } = require('express-validator/check')

module.exports = function(app){
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
}