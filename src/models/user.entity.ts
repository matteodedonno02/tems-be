import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    idUser?: number

    @Column({ length: 256 })
    username: string

    @Column({ type: 'char', length: 128 })
    password: string
}