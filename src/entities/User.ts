import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50, unique: true })
    username: string;

    @Column({ length: 64, unique: true })
    apiKey: string;

    @Column({ length: 100, unique: true })
    email: string;

    @Column()
    createdAt: Date;

    @Column({ nullable: true })
    lastLogin: Date;
}
