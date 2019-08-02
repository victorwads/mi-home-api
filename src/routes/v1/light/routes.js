import express from 'express'
import controller from './controller'

const router = express.Router()

router.get('/status/:name*?', controller.status)
router.post('/brightness/:name*?', controller.brightness)
router.post('/temperature/:name*?', controller.temperature)
router.post('/color/:name*?', controller.color)
router.post('/on/:name*?', controller.generic('changePower', 'turned on', [true]))
router.post('/off/:name*?', controller.generic('changePower', 'turned off', [false]))
router.post('/toggle/:name*?', controller.toggle)

export default router
