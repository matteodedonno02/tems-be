import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Article } from "./article.entity";

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  idCategory?: number

  @Column({ type: 'varchar'})
  name: string

  @Column({type:'varchar', nullable: true})
  image? : string

  @Column({type:'boolean', default : false})
  disabled: boolean

  @ManyToMany(() => Article)
  @JoinTable()
  articles: Article[]

}