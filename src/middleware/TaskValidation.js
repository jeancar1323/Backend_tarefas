const TaskModel = require('../model/TaskModel')
const { isPast } = require('date-fns');
const { exists } = require('../model/TaskModel');

module.exports = TaskValidation = async (req, res, next) => {

  const { macanddress, type, title, description, when } = req.body;

  if (!macanddress)
    return res.status(400).json({ error: 'macanddress é obrigatória' })
  else if (!type)
    return res.status(400).json({ error: 'tipo é obrigatória' })
  else if (!title)
    return res.status(400).json({ error: 'titulo é obrigatória' })
  else if (!description)
    return res.status(400).json({ error: 'descrição é obrigatória' })
  else if (!when)
    return res.status(400).json({ error: 'data é obrigatória' })
  else if (isPast(new Date(when)))
    return res.status(400).json({ error: "data não pode estar no passado" })
  else {

    exist = await TaskModel.findOne({
      'when': { '$eq': new Date(when) },
      'macanddress': { '$in': macanddress }
    })

    if (exist) {
      return res.status(400).json({ error: "Já existe uma tarefa nesse dia e horario" })
    }

    next()

  }
}

