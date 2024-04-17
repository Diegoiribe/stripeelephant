import { Router } from 'express'
import { createSession } from '../controllers/payment.controller.js'

const router = Router()

router.post('/create-checkout-session', createSession)
router.get('/success', (req, res) =>
  res.redirect('http://localhost:3000/success')
)
router.get('/cancel', (req, res) => res.redirect('http://localhost:3000/'))

export default router
