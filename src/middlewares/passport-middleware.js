const passport = require('passport');
const { Strategy } = require('passport-jwt');
const { SECRET } = require('../constants');
const db = require('../db');


// checks if the user sends a cookie = token and returns token
const cookieExtractor = function (req) {
  let token = null;
  if (req && req.cookies) token = req.cookies['token'];
  return token;
}

// option object uses secret and the cookie
const opts = {
  secretOrKey: SECRET,
  jwtFromRequest: cookieExtractor,
}


// passport usage 
passport.use(
  new Strategy(opts, async ({ id }, done) => {
    try {
      const { rows } = await db.query(
        'SELECT user_id, email FROM users WHERE user_id = $1',
        [id]
      )
      // if no users throw error
      if (!rows.length) {
        throw new Error('401 Not Authorized');
      }
      // user object return id and email ONLY
      let user = { id: rows[0].user_id, email: rows[0].email }
      return await done(null, user);

    } catch (error) {
      console.log(error.message);
      done(null, false);
    }
  })
)