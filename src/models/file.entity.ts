import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Shop } from "./shop.entyty";

@Entity()
export class File {
    @PrimaryGeneratedColumn()
    @Column({primary: true})
    idFile?: number
    
    @PrimaryGeneratedColumn("uuid")
    @Column({unique: true})
    uuid?: string

    @Column()
    fileName: string
}