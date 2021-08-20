import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToOne,
    JoinColumn,
    BaseEntity
} from 'typeorm';
import {Person} from "@entity/Person";

type PhoneType = "residencial" | "comercial" | "celular" | "whatsapp" | "outro";

@Entity()
export class Phone extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar", nullable: true})
    number: string;

    @Column({
        type: "enum",
        enum: ["residencial", "comercial", "celular", "whatsapp", "outro"],
        default: "outro"
    })
    type: PhoneType;

    @ManyToOne(() => Person, person => person.phone)
    @JoinColumn()
    person: Person;

    @CreateDateColumn({name: "created_at", type: "datetime"})
    createdAt: Date;

    @UpdateDateColumn({name: "updated_at", type: "datetime"})
    updatedAt: Date;

    @DeleteDateColumn({name: "deleted_at", type: "datetime"})
    deletedAt: Date;

}
