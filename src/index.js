import express from 'express'
import cors from 'cors'
import PaymentRoutes from './routes/payment.routes.js'
import { PORT } from './config.js'
import path from 'path'

const app = express()

app.use(cors())

app.use(express.json())

app.use(PaymentRoutes)

app.use(express.static(path.resolve('src/Components/Shop/index.jsx')))

app.listen(PORT)
console.log('Server running on port', PORT)
