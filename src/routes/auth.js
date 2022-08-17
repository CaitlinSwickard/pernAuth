const { Router } = require('express');
const { getUsers, register, login, protected, logout } = require('../controllers/auth');
const { validationMiddleware } = require('../middlewares/validations-middleware')
const { registerValidation, loginvalidation } = require('../validators/auth');
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
router.post('/login', loginvalidation, validationMiddleware, login)
// logout
router.get('/logout', userAuth, logout);

module.exports = router;