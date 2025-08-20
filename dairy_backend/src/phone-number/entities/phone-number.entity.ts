import { Contact } from "src/contact/entities/contact.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("phone_numbers")
export class PhoneNumber {
    @PrimaryGeneratedColumn()
    phoneNumberId:number

    @Column()
    phoneNumber:string

    @ManyToOne(()=>Contact,(p)=>p.phoneNumbers)
    @JoinColumn({name:"contactId"})
    PhoneNumberContact:Contact
}
