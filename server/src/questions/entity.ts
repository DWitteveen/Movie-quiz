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
}