const Pool = require('pg').Pool

const db = new Pool({
  user: '',
  host: '',
  database: '',
  password: '',
  port: 5432,
})

module.exports = {
    db
}