import express from 'express'
import server from './config/server'
import bodyParser from 'body-parser'
import logger from 'morgan'
import validator from 'express-validator'
import versionRoutes from './modules/v1/routes'

const app = express()

// Middlewares
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(validator())
app.use(logger('dev'))
app.use('/api/v1', versionRoutes)

server.start(app)
export default app