import express, { type Request, type Response } from 'express'
import crypto from 'crypto'
import { User } from '../entity/User'
import jwt from 'jsonwebtoken'
import { sendRegistrationMail } from '../config/MailTransporter'
import initializeDataSource from '../config/appDataSource'

export const authRouter = express.Router()

authRouter.route('/register').post(async (req: Request, res: Response) => {
    const user = {
        email: req.body.email,
        password: '',
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        salt: '',
    }

    const salt = crypto.randomBytes(128).toString('base64')
    const hash = crypto.pbkdf2Sync(req.body.password, salt, 10000, 64, 'sha512')

    user.password = hash.toString('hex')
    user.salt = salt

    try {
        const appDataSource = await initializeDataSource()

        const userExists = await appDataSource.getRepository(User).findOneBy({
            email: user.email,
        })

        if (userExists == null) {
            const result = await appDataSource.getRepository(User).save({
                ...user,
            })

            await sendRegistrationMail(result)

            await appDataSource.destroy()

            return res.status(201).send({
                email: result.email,
                firstName: result.first_name,
                lastName: result.last_name,
            })
        } else {
            await appDataSource.destroy()
            return res.status(409).send('User already exists!')
        }
    } catch (e) {
        return res.status(500).send('Error with query!')
    }
})

authRouter.route('/login').post(async (req: Request, res: Response) => {
    const loginData = {
        email: req.body.email,
        password: req.body.password,
    }

    try {
        const appDataSource = await initializeDataSource()

        const result = await appDataSource.getRepository(User).findOneBy({
            email: loginData.email,
        })

        if (result == null) {
            await appDataSource.destroy()

            res.status(404).send('User not found!')
        } else {
            await appDataSource.destroy()

            const hash = crypto.pbkdf2Sync(
                loginData.password,
                result.salt === undefined ? '' : result.salt,
                10000,
                64,
                'sha512'
            )

            if (hash.toString('hex') === result.password) {
                const token = jwt.sign(
                    {
                        email: result.email,
                        first_name: result.first_name,
                        last_name: result.last_name,
                    },
                    process.env.JWT_SECRET ?? '',
                    {
                        expiresIn: 7200,
                    }
                )

                res.status(200).json({
                    user: {
                        email: result.email,
                        firstName: result.first_name,
                        lastName: result.last_name,
                    },
                    token,
                })
            } else {
                res.status(404).send('User not found!')
            }
        }
    } catch (e) {
        res.status(500).send('Something went wrong!')
    }
})
