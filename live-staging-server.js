'use strict'

const express = require('express')

const port = 8080
const app = express()

app.use('/trivia-app/', express.static('build'))
app.listen(port, () => console.log(`listening on port ${port}!`))
