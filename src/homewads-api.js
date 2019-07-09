import express from 'express'
import expressVideo from 'express-video'
import server from './config/server'
import bodyParser from 'body-parser'
import logger from 'morgan'
import validator from 'express-validator'
import versionRoutes from './modules/v1/routes'
import { motionArchive, archivePath } from './modules/v1/motion/controller'

const home = express()
home.use(express.static('public'))
home.use(archivePath, expressVideo.stream(motionArchive))
home.use(logger('dev'))

const api = express()
server.cors(api)
api.use(bodyParser.json())
api.use(bodyParser.urlencoded({ extended: false }))
api.use(validator())
api.use(logger('dev'))
api.use('/api/v1', versionRoutes)

server.start(api, home)
export default server
