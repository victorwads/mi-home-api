import express from 'express'
import controller from './controller'
import validators from './validators'

const router = express.Router()

router.get('/status', controller.status)
router.get('/zone', controller.zones)
router.post('/zone', [validators.checkFields], controller.cleanZone)
router.post('/speed', controller.setSpeed)
router.post('/start', controller.generic('activateCleaning', 'cleaning'))
router.post('/spot', controller.generic('activateSpotClean', 'cleaning stop'))
router.post('/stop', controller.stop)
router.post('/find', controller.generic('find', 'listen'))
router.post('/dock', controller.generic('activateCharging', 'going back'))

export default router
