import express from 'express'
import controller from './controller'
import validators from './validators'

const router = express.Router()

router.get('/status', controller.status)
router.get('/zone', controller.zones)
router.post('/zone', [validators.checkFields], controller.cleanZone)
router.post('/speed', controller.setSpeed)
router.post('/stop', controller.stop)
router.post('/dock', controller.dock)

export default router
