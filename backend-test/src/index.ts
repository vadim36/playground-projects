const express = require('express')
import { config } from 'dotenv'
import { Pool } from 'pg'
import { Request, Response } from 'express'
config()

const app = express()
const {PORT} = process.env

const database = new Pool({
  user: 'postgres',
  password: '12345678',
  host: 'localhost',
  port: 5432,
  database: 'testdb'
})

app.use(express.json())

app.post('/user', async (request: Request, response: Response):Promise<Response> => {
  const {name, surname}: User = request.body
  const date = new Date()
  const newPerson = await database.query(`
    INSERT INTO person (name, surname) VALUES ($1, $2) RETURNING *
  `, [name, surname])
  return response.send(newPerson.rows[0])
})


app.listen(PORT, () => console.log(`Work on ${PORT}`))