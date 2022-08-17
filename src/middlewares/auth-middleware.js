// using passport function
const passport = require('passport')

// protected route with token
exports.userAuth = passport.authenticate('jwt', { session: false })