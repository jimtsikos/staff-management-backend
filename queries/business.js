const db = require('../config/db');
const utilities = require('../utilities/utilities');

const getBusinesses = (request, response) => {
    db.pool.query('SELECT * FROM business ORDER BY id ASC', (error, results) => {
        if (error) {
			utilities.handleError(response, error);
			return;
        }
        response.status(200).json(results.rows);
    })
}

const createBusiness = (request, response) => {
    const { name, location, type } = request.body
    db.pool.query('INSERT INTO business (name, location, type) VALUES ($1, $2, $3) RETURNING id', [name, location, type === "" ? null : type], (error, result) => {
        if (error) {
			utilities.handleError(response, error);
			return;
        }
        response.status(200).json({
            id: result.rows[0].id, 
            name: name, 
            location: location,
            type: type
        })
    })
}

const updateBusiness = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, location, type } = request.body

    db.pool.query('UPDATE business SET name = $1, location = $2, type = $3 WHERE id = $4', [name, location, type === "" ? null : type, id], (error, result) => {
        if (error) {
			utilities.handleError(response, error);
			return;
        }
        response.status(200).json({
            id: id, 
            name: name, 
            location: location,
            type: type
        })
    })
}

const getBusinessById = (request, response) => {
    const id = parseInt(request.params.id)

    db.pool.query('SELECT * FROM business WHERE id = $1', [id], (error, results) => {
      if (error) {
			utilities.handleError(response, error);
			return;
      }
      response.status(200).json(results.rows)
    })
}

const deleteBusiness = (request, response) => {
    const id = parseInt(request.params.id)
  
    db.pool.query('DELETE FROM business WHERE id = $1', [id], (error, results) => {
        if (error) {
			utilities.handleError(response, error);
			return;
        }
        response.status(200).json(id)
    })
}

module.exports = {
    getBusinesses,
    createBusiness,
    updateBusiness,
    getBusinessById,
    deleteBusiness
}