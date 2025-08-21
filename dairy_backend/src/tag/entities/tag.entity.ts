import { ContactTag } from "src/contact-tag/entities/contact-tag.entity";
import { Contact } from "src/contact/entities/contact.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('tags')
export class Tag {
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique:true})
    tagName: string

    // @OneToMany(() => ContactTag, (c) => c.tag)
    // contactTag: ContactTag

    @ManyToMany(()=>Contact,(contact)=>contact.tags)
    
    contacts:Contact[]
}
