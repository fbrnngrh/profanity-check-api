import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class CheckLog {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User)
    user: User;

    @Column("text")
    textChecked: string;

    @Column()
    profanityFound: boolean;

    @Column()
    profanityCount: number;

    @Column()
    createdAt: Date;
}
