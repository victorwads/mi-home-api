import express from 'express'
import vacuum from './vacuum/routes'
import motion from './motion/routes'

const router = express.Router()
/**
 * Use the modules routes. It's safer doing in a separate file than magically, to
 * be sure nester routes will be applied correctly.
 */
router.get('/', (req, res) => {
  res.status(200).json(req.headers)
})

router.use('/vacuum', vacuum)
router.use('/motion', motion)

// Return router
export default router
