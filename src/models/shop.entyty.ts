import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { File } from "./file.entity";

@Entity()
export class Shop {
    @Column({primary: true})
    shopName: string
    
    @OneToOne(() => File)
    @JoinColumn()
    logoFile: File
}