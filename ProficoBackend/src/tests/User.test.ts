import initializeDataSource from '../config/appDataSource'
import { User } from '../entity/User'
import request from 'supertest'
import server from '../server'

describe('#App test', () => {
    let token: string

    beforeAll(async () => {
        await request(server).post('/authenticate/register').send({
            email: 'test.forduplicate@test.test',
            password: 'test',
            firstName: 'test',
            lastName: 'test',
        })
        const res = await request(server)
            .post('/authenticate/login')
            .send({ email: 'test.forduplicate@test.test', password: 'test' })
        token = res.body.token
    })

    describe('POST /authenticate/register', () => {
        it('Should save user to database, email is unique', async () => {
            const res = await request(server)
                .post('/authenticate/register')
                .send({
                    email: 'test.test@test.test',
                    password: 'test',
                    firstName: 'test',
                    lastName: 'test',
                })

            expect(res.statusCode).toBe(201)
            expect(res.body).toEqual({
                email: 'test.test@test.test',
                firstName: 'test',
                lastName: 'test',
            })
        })
        it('Should return conflict, email already exists', async () => {
            const res = await request(server)
                .post('/authenticate/register')
                .send({
                    email: 'test.forduplicate@test.test',
                    password: 'test',
                    firstName: 'test',
                    lastName: 'test',
                })

            expect(res.statusCode).toBe(409)
        })
    })

    describe('POST /authenticate/login', () => {
        it('Should return user, password and email correct', async () => {
            const res = await request(server).post('/authenticate/login').send({
                email: 'test.forduplicate@test.test',
                password: 'test',
            })

            expect(res.statusCode).toBe(200)
            expect(res.body).toHaveProperty('user')
            expect(res.body).toHaveProperty('token')
        })
        it('should return not found, password or email incorrect', async () => {
            const res = await request(server)
                .post('/authenticate/login')
                .send({ email: 'test.testwrong@test.test', password: 'test' })

            expect(res.statusCode).toBe(404)
        })
    })

    describe('GET /api/me', () => {
        it('Should return not found because there is no token', async () => {
            const res = await request(server).get('/api/me')

            expect(res.statusCode).toBe(404)
        })
        it('Should return forbidden because token is wrong', async () => {
            const res = await request(server).get('/api/me?token=notrealtoken')

            expect(res.statusCode).toBe(403)
        })
        it('Should return current user', async () => {
            const res = await request(server).get(`/api/me?token=${token}`)

            expect(res.statusCode).toBe(200)
            expect(res.body).toEqual({
                email: 'test.forduplicate@test.test',
                firstName: 'test',
                lastName: 'test',
            })
        })
    })

    describe('GET /api/chuck', () => {
        it('Should return not found because there is no token', async () => {
            const res = await request(server).get('/api/chuck')

            expect(res.statusCode).toBe(404)
        })
        it('Should return forbidden because token is wrong', async () => {
            const res = await request(server).get(
                '/api/chuck?token=notrealtoken'
            )

            expect(res.statusCode).toBe(403)
        })
        it('Should return a random joke', async () => {
            const res = await request(server).get(`/api/chuck?token=${token}`)

            expect(res.statusCode).toBe(200)
            expect(res.body).toHaveProperty('icon_url')
            expect(res.body).toHaveProperty('id')
            expect(res.body).toHaveProperty('url')
            expect(res.body).toHaveProperty('value')
        })
    })

    afterAll(async () => {
        const appDataSource = await initializeDataSource()

        await appDataSource.getRepository(User).delete({
            email: 'test.forduplicate@test.test',
        })
        await appDataSource.getRepository(User).delete({
            email: 'test.test@test.test',
        })

        await appDataSource.destroy()
        server.close()
    })
})
