import express from 'express'
import controller from './controller'

const router = express.Router()

router.post('/detect', controller.detect)
router.post('/movie', controller.movie)

export default router
