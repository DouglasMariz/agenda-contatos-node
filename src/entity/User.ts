import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BeforeInsert, BeforeUpdate,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    BaseEntity
} from 'typeorm';
import bcrypt from 'bcryptjs';

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar", nullable: false})
    firstName: string;

    @Column({type: "varchar", nullable: true})
    lastName: string;

    @Column({type: "varchar", nullable: false, unique: true})
    email: string;

    @Column({type: "varchar", nullable: false})
    password: string;

    @CreateDateColumn({name: "created_at", type: "datetime"})
    createdAt: Date;

    @UpdateDateColumn({name: "updated_at", type: "datetime"})
    updatedAt: Date;

    @DeleteDateColumn({name: "deleted_at", type: "datetime"})
    deletedAt: Date;

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8);
    }
}
