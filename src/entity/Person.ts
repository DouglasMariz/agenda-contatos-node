import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    OneToMany, BaseEntity
} from 'typeorm';
import {Phone} from "@entity/Phone";

type GenderType = "masculino" | "feminino" | "outro";

@Entity()
export class Person extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar", nullable: false})
    name: string;

    @Column({type: "varchar", nullable: false, unique: true})
    cpf: string;

    @Column({
        type: "enum",
        enum: ["masculino", "feminino", "outro"],
        default: "outro"
    })
    gender: GenderType;

    @OneToMany(
        () => Phone, phone => phone.person,
        {onUpdate: 'CASCADE', onDelete: 'CASCADE', cascade: true, eager: true}
    )
    phone: Phone[];

    @CreateDateColumn({name: "created_at", type: "datetime"})
    createdAt: Date;

    @UpdateDateColumn({name: "updated_at", type: "datetime"})
    updatedAt: Date;

    @DeleteDateColumn({name: "deleted_at", type: "datetime"})
    deletedAt: Date;

}
