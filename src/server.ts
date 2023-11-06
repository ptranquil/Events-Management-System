import dotenv from 'dotenv'
import { connectToDB } from './db'
import routes from './routes/index'
import cors from "cors"
import express, { Response } from "express"
dotenv.config()
const app = express()

app.use(cors({
    origin: "*",
    methods: ['POST', 'GET', 'PATCH', 'DELETE', 'OPTIONS', 'PUT'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Getting data in json format
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const PORT = process.env.PORT
app.listen(PORT, () => {
    connectToDB()
    app.use('/', routes)
})
