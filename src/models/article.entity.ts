import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  idArticle?: number

  @Column({ type: 'varchar'})
  name: string

  @Column({ type: 'varchar', nullable: true })
  description? : string

  @Column({ type: 'decimal'})
  price : number

  @Column({type:'varchar', nullable: true})
  image? : string

  @Column({type:'boolean', default : false})
  disabled: boolean



}