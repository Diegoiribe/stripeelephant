import express from 'express'
import cors from 'cors'
import PaymentRoutes from './routes/payment.routes.js'
import { PORT } from './config.js'
import path from 'path'

const app = express()

app.use(cors('https://localhost:3001'))

app.use(express.json())

app.use(PaymentRoutes)

app.listen(PORT)
console.log('Server running on port', PORT)
