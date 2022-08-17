const { Router } = require('express');
const { getUsers, register, login, protected, logout } = require('../controllers/auth');
const { validationMiddleware } = require('../middlewares/validations-middleware')
const { registerValidation, loginValidation } = require('../validators/auth');
const { userAuth } = require('../middlewares/auth-middleware')
const router = Router();


// ROUTES

// get all users (TESTING ROUTE)
router.get('/get-users', getUsers);
// protected route
router.get('/protected', userAuth, protected);
// register
router.post('/register', registerValidation, validationMiddleware, register);
// login
router.post('/login', loginValidation, validationMiddleware, login)
// logout
router.get('/logout', logout);

module.exports = router;