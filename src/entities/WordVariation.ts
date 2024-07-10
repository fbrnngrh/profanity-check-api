import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

@Entity()
export class WordVariation {
   @PrimaryGeneratedColumn()
   id: number;

   @Column({ length: 50 })
   variation: string;

   @ManyToOne("ProfanityWord", "variations")
   profanityWord: any;
}