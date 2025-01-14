import {Entity, Column, PrimaryGeneratedColumn, AfterInsert } from 'typeorm';
import { Exclude } from 'class-transformer';
@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @AfterInsert()
    logInsert(){
        console.log('User insert into database')
    }
}