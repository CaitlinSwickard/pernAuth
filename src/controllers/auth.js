const db = require('../db');
const { hash } = require('bcryptjs');
const { sign } = require('jsonwebtoken');
const { SECRET } = require('../constants');


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
      error: error.message,
    })
  }
}


// login route
exports.login = async (req, res) => {
  let user = req.user;

  let payload = {
    id: user.user_id,
    email: user.email,
  }

  try {
    // JWT token
    const token = await sign(payload, SECRET)
    return res.status(200).cookie('token', token, { httpOnly: true }).json({
      success: true,
      message: 'Log in successful!'
    })

  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: error.message,
    })
  }
}


// protected route
exports.protected = async (req, res) => {
  try {

    return res.status(200).json({
      info: 'protected info'
    })

  } catch (error) {
    console.log(error.message)
  }
}


// logout route
exports.logout = async (req, res) => {
  try {
    // clear cookie from login session
    return res.status(200).clearCookie('token', { httpOnly: true }).json({
      success: true,
      message: 'Logged out!',
    })

  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      error: error.message,
    })
  }
}