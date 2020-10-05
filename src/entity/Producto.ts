import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    CreateDateColumn
  } from "typeorm";
  import { Field, Int, ObjectType } from "type-graphql";
  
  //ObjectType para poder ver en graphql
  @ObjectType()
  @Entity()
  export class Product extends BaseEntity {
      //Se define como campo graphql  con el decorador @Field, especificar el tipo de dato que podemos consultar en graphql
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Field()
    @Column()
    name!: String;
  
    @Field(() => Int)
    @Column("int", { default: 0 })
    quantity!: number;
  
    @Field(() => String)
    @CreateDateColumn({ type: "timestamp" })
    createdAt!: string;
  }