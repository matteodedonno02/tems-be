import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Article } from "./article.entity";
import { File } from "./file.entity";

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  idCategory?: number

  @Column({ type: 'varchar' })
  name: string

  @OneToOne(() => File, (file) => file.idFile)
  @JoinColumn()
  image: File

  @Column({ type: 'boolean', default: false })
  disabled: boolean

  @ManyToMany(() => Article, (article) => article.categories)
  @JoinTable()
  articles: Article[]

}