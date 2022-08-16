const { Router } = require('express');
const router = Router();


// testing routes
router.get('/', (req, res) => {
  return res.send('working')
})

module.exports = router;