const db = require('../config/db');
const utilities = require('../utilities/utilities');

const getBusinessType = (request, response) => {
    db.pool.query('SELECT UNNEST(enum_range(NULL::business_type)) AS types;', (error, results) => {
        if (error) {
			utilities.handleError(response, error);
			return;
        }
        response.status(200).json(results.rows);
    })
}

const getStaffPosition = (request, response) => {
    db.pool.query('SELECT UNNEST(enum_range(NULL::staff_position)) AS types;', (error, results) => {
        if (error) {
			utilities.handleError(response, error);
			return;
        }
        response.status(200).json(results.rows);
    })
}

module.exports = {
    getBusinessType,
    getStaffPosition
}