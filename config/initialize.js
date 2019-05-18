const db = require('../config/db');

const initialize = () => {
    const query = 
    "   DO $$ \
        BEGIN \
            IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'business_type') THEN \
                CREATE TYPE business_type AS ENUM ('bar', 'restaurant', 'club', 'hotel', 'cafe'); \
            END IF; \
        END$$; \
    \
        DO $$ \
        BEGIN \
            IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'staff_position') THEN \
                CREATE TYPE staff_position AS ENUM ('kitchen', 'service', 'PR'); \
            END IF; \
        END$$; \
    \
        CREATE TABLE IF NOT EXISTS business ( \
            ID SERIAL PRIMARY KEY NOT NULL, \
            name VARCHAR(200) NOT NULL, \
            location VARCHAR NOT NULL, \
            type business_type DEFAULT NULL \
        ); \
    \
        CREATE TABLE IF NOT EXISTS staff ( \
            ID SERIAL PRIMARY KEY NOT NULL, \
            business_id INTEGER REFERENCES business(id) NOT NULL, \
            email VARCHAR(200) NOT NULL, \
            first_name VARCHAR(200) NOT NULL, \
            last_name VARCHAR(200) NOT NULL, \
            position staff_position NOT NULL, \
            phone_number VARCHAR(50) DEFAULT NULL \
        );";

    db.pool.query(query, (error) => {
        if (error) {
            console.error(error);
            return;
        }
    })
}

module.exports = {
    initialize
}