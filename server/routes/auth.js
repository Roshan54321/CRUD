const router = require('express').Router()
const { authUser } = require('../controllers/users')

router.get('/', authUser)

module.exports = router