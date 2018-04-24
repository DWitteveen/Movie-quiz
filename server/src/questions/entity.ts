import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsString } from "class-validator";
import { BaseEntity } from 'typeorm/repository/BaseEntity'

@Entity()
export default class Question extends BaseEntity {

    @PrimaryGeneratedColumn()
    id?: number

    @IsString()
    @Column('text', {nullable: false})
    question: string

    @IsString()
    @Column('text', {nullable: false})
    answer: string

    @IsString()
    @Column('text', {nullable: false})
    image1: string

    @IsString()
    @Column('text', {nullable: false})
    image2: string

    @IsString()
    @Column('text', {nullable: false})
    image3: string

    @IsString()
    @Column('text', {nullable: false})
    image4: string


}