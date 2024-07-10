import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 20, unique: true })
    name: string

    @Column("text", { nullable: true })
    description: string
}
