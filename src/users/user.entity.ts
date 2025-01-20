import { Reports } from './../reports/reports.entity';
import {Entity, Column, PrimaryGeneratedColumn, AfterInsert, OneToMany } from 'typeorm';

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({default: true})
    admin: boolean
    
    @OneToMany(() => Reports, (report) => report.user)
    reports: Reports[];

    @AfterInsert()
    logInsert(){
        console.log('User inserted into database')
    }
}