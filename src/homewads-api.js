import express from 'express'
import serveIndex from 'serve-index'
import server from './config/server'
import bodyParser from 'body-parser'
import logger from 'morgan'
import validator from 'express-validator'
import DuckDns from './modules/duckDns'
import versionRoutes from './routes/v1/routes'
import { motionArchive, archivePath } from './routes/v1/motion/controller'

// Services
DuckDns()

// UI Server
const home = express()
home.use(logger('dev'))
home.use(express.static('public'))
home.use(archivePath, express.static(motionArchive))
home.use(archivePath, serveIndex(motionArchive))

// API Server
const api = express()
server.cors(api)
api.use(bodyParser.json())
api.use(bodyParser.urlencoded({ extended: false }))
api.use(validator())
api.use(logger('dev'))
api.use('/api/v1', versionRoutes)

server.start(api, home)
export default server
