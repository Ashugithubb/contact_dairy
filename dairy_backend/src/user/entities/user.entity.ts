import { Contact } from "src/contact/entities/contact.entity";
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {

    @PrimaryGeneratedColumn()
    userId:number

    @Column({unique:true})
    email:string

    @Column()
    firstName:string

     @Column()
    lastName:string

    @Column({select:false})
    password:string
    
    @OneToMany(()=>Contact,(c)=>c.users)
    contacts:Contact[]

}
