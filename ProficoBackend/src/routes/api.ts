import express, {
    type NextFunction,
    type Request,
    type Response,
} from 'express'
import jwt from 'jsonwebtoken'
import { User } from '../entity/User'
import axios from 'axios'
import initializeDataSource from '../config/appDataSource'

export const apiRouter = express.Router()

apiRouter.use(function (req: Request, res: Response, next: NextFunction) {
    let token: string | undefined =
        req.params.token ??
        req.headers.authorization?.replace('Bearer ', '') ??
        req.body.token

    if (token === undefined && req.originalUrl.includes('token='))
        token = req.originalUrl.split('token=')[1]

    if (token !== undefined && token.trim().length !== 0) {
        try {
            const jwtSecret = process.env.JWT_SECRET ?? ''
            const decoded = jwt.verify(token, jwtSecret)
            req.body.decoded = decoded
            next()
        } catch (e) {
            return res.status(403).send('Wrong token!')
        }
    } else {
        return res.status(404).send('No token!')
    }
})

apiRouter.get('/chuck', async function (req: Request, res: Response) {
    try {
        const result = await axios.get(
            'https://api.chucknorris.io/jokes/random'
        )
        res.json(result.data)
    } catch (e) {
        res.status(500).send('Something went wrong!')
    }
})

apiRouter.get('/me', async function (req: Request, res: Response) {
    try {
        const appDataSource = await initializeDataSource()

        const result = await appDataSource.getRepository(User).findOneBy({
            email: req.body.decoded.email,
        })

        await appDataSource.destroy()

        res.status(200).json({
            email: result?.email,
            firstName: result?.first_name,
            lastName: result?.last_name,
        })
    } catch (e) {
        res.status(500).send('Error with query!')
    }
})
