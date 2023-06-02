import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity({ name: 'user' })
export class User {
    @PrimaryColumn({ name: 'email', type: 'varchar', length: 100 })
    email!: string

    @Column({ name: 'password', type: 'varchar', length: 255 })
    password!: string

    @Column({ name: 'first_name', type: 'varchar', length: 100 })
    first_name!: string

    @Column({ name: 'last_name', type: 'varchar', length: 100 })
    last_name!: string

    @Column({ name: 'salt', type: 'varchar', length: 255 })
    salt!: string
}
