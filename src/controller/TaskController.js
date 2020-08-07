const TaskModel = require('../model/TaskModel')
const { response } = require('express')
const mongoose = require('../config/database')
const current = new Date()
const { startOfDay, endOfDay, startOfWeek, endOfWeek,
  startOfMonth, endOfMonth, startOfYear, endOfYear } = require('date-fns')

class TaskController {
  async create(req, res) {
    const task = new TaskModel(req.body)
    await task.save()
      .then(response =>
        res.status(200).json(response)
      )
      .catch(error => {
        return res.status(500).json(error)
      })

  }

  async update(req, res) {
    await TaskModel
      .findOneAndUpdate({ '_id': req.params.id }, req.body, { new: true })
      .then(response => res.status(200).json(response))
      .catch(response => res.status(500).json(response))
  }

  async all(req, res) {
    await TaskModel.find({ macanddress: { '$in': req.params.macanddress } })
      .sort('when')
      .then(response => res.status(200).json(response))
      .catch(response => res.status(500).json(response))
  }

  async show(req, res) {
    await TaskModel.findById(req.params.id)
      .then(response => {
        if (response)
          return res.status(200).json(response)
        else
          return res.status(404).json({ error: "Id não encontrado" })

      })
      .catch(response => res.status(500).json(response))
  }

  // arrow function
  delete = async (req, res) => {
    await TaskModel.deleteOne({ '_id': req.params.id })
      .then(response => res.status(200).json(response))
      .catch(error => res.status(500).json(error))

  }

  done = async (req, res) => {
    await TaskModel.findByIdAndUpdate(
      { '_id': req.params.id },
      { 'done': req.params.done },
      { new: true }
    )
      .then(response => res.status(200).json(response))
      .catch(error => res.status(500).json(error))
  }

  //$lt - last then 
  late = async (req, res) => {
    await TaskModel
      .find({
        'when': { '$lt': current },
        'macanddress': { '$in': req.params.macanddress },
        'done': { '$in': false },
      })
      .sort()
      .then(response => res.status(200).json(response))
      .catch(error => res.status(500).json(error))
  }
  //$gte = igual ou maior 
  today = async (req, res) => {
    await TaskModel
      .find({
        'macanddress': { '$in': req.params.macanddress },
        'when': { '$gte': startOfDay(current), '$lte': endOfDay(current) },
      })
      .sort()
      .then(response => res.status(200).json(response))
      .catch(error => res.status(500).json(error))
  }

  week = async (req, res) => {
    await TaskModel
      .find({
        'macanddress': { '$in': req.params.macanddress },
        'when': { '$gte': startOfWeek(current), '$lte': endOfWeek(current) },

      })
      .sort()
      .then(response => res.status(200).json(response))
      .catch(error => res.status(500).json(error))
  }

  month = async (req, res) => {
    await TaskModel
      .find({
        'macanddress': { '$in': req.params.macanddress },
        'when': { '$gte': startOfMonth(current), '$lte': endOfMonth(current) },

      })
      .sort()
      .then(response => res.status(200).json(response))
      .catch(error => res.status(500).json(error))
  }

  year = async (req, res) => {
    await TaskModel
      .find({
        'macanddress': { '$in': req.params.macanddress },
        'when': { '$gte': startOfYear(current), '$lte': endOfYear(current) },

      })
      .sort()
      .then(response => res.status(200).json(response))
      .catch(error => res.status(500).json(error))
  }



}

module.exports = new TaskController();