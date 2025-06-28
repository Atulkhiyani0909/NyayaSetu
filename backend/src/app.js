import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors';

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
  origin: "*", // or use process.env.FRONTEND_URL
  credentials: true
}));
app.use(express.static('public'))
app.use(cookieParser())

import adminRoutes from './routers/admin.routes.js'
import userRoutes from './routers/user.routes.js'

app.use('/user', userRoutes)
app.use('/admin',adminRoutes)


export default app 


