const personsRouter = require('express').Router()
const Person = require('../models/person')
const express = require('express')
const morgan = require('morgan')

/*
personsRouter.get('/', (request, response) => {
  response.send('<h1>Tervetuloa puhelinluetteloon!</h1>')
})*/

personsRouter.get('/', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

/*
personsRouter.get('/info', (request, response, next) => {

  const date = new Date()

  Person.find({})
    .then(people => {
      response.send(
        `<p>Phonebook has info for ${people.length} people!</p>
        <p>${date}</p>`)
    })
    .catch(error => next(error))
})*/

personsRouter.get('/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

personsRouter.delete('/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
      console.log(result)
    })
    .catch(error => next(error))
})

personsRouter.post('/', (request, response,next) => {
  const body = request.body

  if (!body.name) return response.status(400).json({ error: 'Name Missing' })
  if (!body.number) return response.status(400).json({ error: 'Number Missing' })

  const  person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
    .catch(error => next(error))
})

personsRouter.put('/:id', (request, response, next) => {
  const { name, number } = request.body

  Person.findById(request.params.id)
    .then(person => {
      if (!person) {
        return response.status(404).end()
      }

      person.name = name
      person.number = number

      return person.save().then((updatedPerson) => {
        response.json(updatedPerson)
      })
    })
    .catch(error => next(error))
})

personsRouter.use(express.static('dist'))
personsRouter.use(express.json())
personsRouter.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

morgan.token('body', (req) => JSON.stringify(req.body))

module.exports = personsRouter