import { Contact } from "src/contact/entities/contact.entity";
import { Tag } from "src/tag/entities/tag.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Unique(["contact", "tag"])
@Entity('contact_tags')
export class ContactTag {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Contact, (c) => c.contactTag)
    contact: Contact

    @ManyToOne(() => Tag, (t) => t.contactTag)
    tag: Tag
}
