const db = require('../config/db');

const getStaff = (request, response) => {
    db.pool.query('SELECT * FROM staff ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createStaff = (request, response) => {
    const { business_id, email, first_name, last_name, position, phone_number } = request.body
    db.pool.query('INSERT INTO staff (business_id, email, first_name, last_name, position, phone_number) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id', 
                    [business_id, email, first_name, last_name, position === "" ? null : position, phone_number], (error, result) => {
        if (error) {
            throw error
        }
        response.status(200).json({
            id: result.rows[0].id, 
            business_id: business_id, 
            email: email,
            first_name: first_name,
            last_name: last_name,
            position: position,
            phone_number: phone_number
        })
    })
}

const updateStaff = (request, response) => {
    const id = parseInt(request.params.id)
    const { business_id, email, first_name, last_name, position, phone_number } = request.body

    db.pool.query('UPDATE staff SET business_id = $1, email = $2, first_name = $3, last_name = $4, position = $5, phone_number = $6 WHERE id = $7', 
                    [business_id, email, first_name, last_name, position === "" ? null : position, phone_number, id], (error, result) => {
        if (error) {
            throw error
        }
        response.status(200).json({
            id: id, 
            business_id: business_id, 
            email: email,
            first_name: first_name,
            last_name: last_name,
            position: position,
            phone_number: phone_number
        })
    })
}

const getStaffByBusinessId = (request, response) => {
    const id = parseInt(request.params.id)

    db.pool.query('SELECT * FROM staff WHERE business_id = $1 ORDER BY id ASC', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}

const getStaffById = (request, response) => {
    const id = parseInt(request.params.id)

    db.pool.query('SELECT * FROM staff WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}

const deleteStaff = (request, response) => {
    const id = parseInt(request.params.id)
  
    db.pool.query('DELETE FROM staff WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(id)
    })
}

module.exports = {
    getStaff,
    createStaff,
    updateStaff,
    getStaffByBusinessId,
    getStaffById,
    deleteStaff
}