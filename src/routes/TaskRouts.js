const express = require('express')
module.exports = router = express.Router()
const TaskControlle = require('../controller/TaskController')
const TaskValidation = require('../middleware/TaskValidation')

router.post('/task',TaskValidation ,TaskControlle.create)
