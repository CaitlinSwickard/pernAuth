const db = require('../db');

// ROUTES

// get all users route
exports.getUsers = async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM users;')
    console.log(rows)
  } catch (error) {
    console.log(error.message)
  }
}

// register route
exports.register = async (req, res) => {
  try {
    console.log('validation passed')
  } catch (error) {
    console.log(error.message)
  }
}