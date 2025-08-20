import { ContactTag } from "src/contact-tag/entities/contact-tag.entity";
import { PhoneNumber } from "src/phone-number/entities/phone-number.entity";
import { Tag } from "src/tag/entities/tag.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Unique(["userId", "email"])
@Entity("contacts")
export class Contact {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    nickName: string

    @Column()
    email: string

    @Column()
    userId: number;

    @ManyToOne(() => User, (u) => u.contacts)
    @JoinColumn({ name: "userId" })
    users: User

    @Column({ default: false })
    favorite: boolean


    @CreateDateColumn()
    createdAt: Date

    @DeleteDateColumn()
    deletedAt: Date

    @OneToMany(() => ContactTag, (c) => c.contact)
    contactTag: ContactTag[]

    @OneToMany(() => PhoneNumber, (p) => p.PhoneNumberContact)
    phoneNumbers: PhoneNumber[]

    @Column({ nullable: true })
    avtarUrl: string


    toggelFaverate(){
         this.favorite=!this.favorite;
    }


}
