import { Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Article } from "./article.entity";

@Entity()
export class SoldItem {
  @PrimaryGeneratedColumn()
  idSoldItem?: number

  @Column({ type: "datetime"})
  buyingDate: Date;

  @Column({type:'decimal'})
  price: number

  @Column({type:'decimal'})
  quantity: number

  @ManyToOne(() => Article)
  article: Article

}