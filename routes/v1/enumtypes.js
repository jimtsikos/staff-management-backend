const enumtypes = require('../../queries/enumtypes')

module.exports = function(app){
    app.get('/types/businesstype', enumtypes.getBusinessType)
	app.get('/types/staffposition', enumtypes.getStaffPosition)
}