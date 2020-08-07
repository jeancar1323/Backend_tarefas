const express = require('express')
module.exports = router = express.Router()
const TaskControlle = require('../controller/TaskController')
const TaskValidation = require('../middleware/TaskValidation')


router.post('/task', TaskValidation, TaskControlle.create)

router.put('/task/:id', TaskValidation, TaskControlle.update)
router.get('/task/:id', TaskControlle.show)
router.delete('/task/:id', TaskControlle.delete)

router.get('/task/filter/all/:macanddress', TaskControlle.all)
router.get('/task/filter/late/:macanddress', TaskControlle.late)
router.get('/task/filter/today/:macanddress', TaskControlle.today)
router.get('/task/filter/week/:macanddress', TaskControlle.week)
router.get('/task/filter/month/:macanddress', TaskControlle.month)
router.get('/task/filter/year/:macanddress', TaskControlle.year)

router.put('/task/:id/:done', TaskControlle.done)



