import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"


const app = express()

const corsOption = {
    origin: 'http//localhost:5173',
    credential: true
}

app.use(cors(corsOption))

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())


export { app }