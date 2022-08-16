const db = require('../db');
const { hash } = require('bcryptjs');


// ROUTES

// get all users route for testing that users were entered (TESTING ROUTE)
exports.getUsers = async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM users;')
    return res.status(200).json({
      success: true,
      users: rows,
    })

  } catch (error) {
    console.log(error.message)
  }
}



// register route
exports.register = async (req, res) => {
  //destructure the req.body (name, email, password...)
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await hash(password, 10);
    await db.query('INSERT INTO users(name, email, password) values ($1, $2, $3)', [name, email, hashedPassword])

    return res.status(201).json({
      success: true,
      message: "Registration was successful!"
    })

  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: error.message
    })
  }
}