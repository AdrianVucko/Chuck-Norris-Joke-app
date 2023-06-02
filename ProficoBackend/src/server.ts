import express from 'express'
import { authRouter } from './routes/authenticate'
import bodyParser from 'body-parser'
import { apiRouter } from './routes/api'
import dotenv from 'dotenv'

const app = express()
dotenv.config()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-Requested-With,content-type,Authorization'
    )
    next()
})

app.use('/api', apiRouter)
app.use('/authenticate', authRouter)

const server = app.listen(process.env.PORT, () => {
    console.log(`Application started on port ${process.env.PORT ?? 'error'}`)
})

export default server
