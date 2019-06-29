import express from 'express'
import controller from './controller'
import validators from './validators'

const router = express.Router()

// Create
router.post('/zone', [validators.checkFields], controller.cleanZone)

// Get
router.get('/zone', controller.listZones)

export default router
