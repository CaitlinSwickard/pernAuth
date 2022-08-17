const { check } = require('express-validator');
const db = require('../db');
const { compare } = require('bcryptjs');

// user name 
const name = check('name').isLength({ min: 3, max: 35 }).withMessage('User name must be between 3 and 35 characters!');

// user email
const email = check('email').isEmail().withMessage('Please provide valid email!');

// check if email exists 
// $1 equals 1 item of array
const emailExists = check('email').custom(async (value) => {
  const { rows } = await db.query('SELECT * from users WHERE email = $1', [
    value,
  ])
  if (rows.length) {
    throw new Error('Email already exists!');
  }
})

// user password
const password = check('password').isLength({ min: 6, max: 35 }).withMessage('Password must be between 6 and 35 characters!');

// login validation
// check email
const loginFieldsCheck = check('email').custom(async (value, { req }) => {
  const user = await db.query('SELECT * from users WHERE email = $1', [value])
  if (!user.rows.length) {
    throw new Error('Email does not exist!')
  }
  // check password
  const validPassword = await compare(req.body.password, user.rows[0].password)
  if (!validPassword) {
    throw new Error('Wrong password!')
  }
  req.user = user.rows[0]
})

module.exports = {
  registerValidation: [name, email, emailExists, password],
  loginvalidation: [loginFieldsCheck],
}