const TaskModel = require('../model/TaskModel')
const { response } = require('express')

class TaskController{
 async create(req,res){
      const task = new TaskModel(req.body)
      await task.save()
                .then(response =>
                  res.status(200).json(response)
                )
                .catch(error =>{
                  return res.status(500).json(error)
                })

  }

}

module.exports = new TaskController();