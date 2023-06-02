import { DataSource } from 'typeorm'

const initializeDataSource = async (): Promise<DataSource> => {
    const appDataSource = new DataSource({
        type: 'mysql',
        host: 'localhost',
        port: 3307,
        username: 'root',
        password: '',
        database: 'profico',
        entities: ['src/entity/*.ts'],
        logging: false,
        synchronize: true,
    })

    return await appDataSource.initialize()
}

export default initializeDataSource
