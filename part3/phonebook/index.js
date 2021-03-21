const express = require("express")
const morgan = require("morgan")

const app = express()

app.use(express.json())
app.use(morgan('tiny'))

let phonebook = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4
  }
]


app.get("/", (request, response) => {
  response.send("<h1>Phonebook</h1>")
})


app.get("/info", (request, response) => {
  const current_time = new Date()
  const entries = phonebook.length
  response.send(
    `<p> Phonebook has info for ${entries} people </p>
    <p> ${current_time} </p>`
  )
})


app.get("/api/persons", (request, response) => {
  response.json(phonebook)
})


app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id)
  const entry = phonebook.find(p => p.id === id)
  if(entry) {
    response.json(entry)
  }
  else {
    response.status(404).end()
  }
})


app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id)
  const entry = phonebook.find(p => p.id === id)

  if(entry) {
    phonebook = phonebook.filter(p => p.id !== id)
    response.status(204).end()
  }
  else {
    response.status(404).end()
  }
})


const generateID = () => {
  return Math.floor( Math.random() * 200 )
}


app.post("/api/persons", (request, response) => {
  const body = request.body

  // Fail if name/number is missing or if name already exists
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name and/or number missing'
    })
  }
  else if (phonebook.some(p => p.name === body.name)) {
    return response.status(409).json({
      error: 'name already exists in phonebook'
    })
  }

  const entry = {
    name: body.name,
    number: body.number,
    id: generateID()
  }

  phonebook = phonebook.concat(entry)
  response.json(entry)
})

const PORT = 3001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))