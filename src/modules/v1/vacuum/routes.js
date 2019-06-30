import express from 'express'
import controller from './controller'
import validators from './validators'

const router = express.Router()

router.get('/zone', controller.listZones)
router.post('/stop', controller.stop)
router.post('/zone', [validators.checkFields], controller.cleanZone)

export default router
