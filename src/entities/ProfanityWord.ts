import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm"
import { Category } from "./Category"
import { WordVariation } from "./WordVariation"

@Entity()
export class ProfanityWord {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 50, unique: true })
    word: string

    @ManyToOne(() => Category)
    category: Category

    @Column({ default: true })
    isActive: boolean

    @Column()
    createdAt: Date

    @Column()
    updatedAt: Date

    @OneToMany("WordVariation", "profanityWord")
    variations: WordVariation[]
}