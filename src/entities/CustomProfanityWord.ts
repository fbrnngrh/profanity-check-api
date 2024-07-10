import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";
import { Category } from "./Category";

@Entity()
export class CustomProfanityWord {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    word: string;

    @ManyToOne(() => User)
    user: User;

    @ManyToOne(() => Category)
    category: Category;

    @Column()
    createdAt: Date;
}
