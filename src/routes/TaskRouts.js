const express = require('express')
const router = express.Router()
const TaskControlle = require('../controller/TaskController')

router.post('/task', TaskControlle.create)

module.exports = router;