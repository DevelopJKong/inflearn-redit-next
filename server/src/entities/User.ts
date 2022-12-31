import 'reflect-metadata';
import { Entity, PrimaryGeneratedColumn, Column, Index, OneToMany, BeforeInsert } from 'typeorm';
import { IsEmail, IsNumber, IsOptional, IsString, Length } from 'class-validator';
import bcrypt from 'bcryptjs';
import { Post } from './Post';
import { Vote } from './Vote';

@Entity('users')
export class User {
   @PrimaryGeneratedColumn()
   id: number;

   @Index()
   @IsEmail(undefined, { message: '이메일 주소가 잘못되었습니다' })
   @Length(1, 255, { message: '이메일 주소는 비워둘 수 없습니다' })
   @Column('varchar', { unique: true })
   email: string;

   @Index()
   @Length(3, 32, { message: '사용자 이름은 3자 이상이어야 합니다' })
   @Column('varchar', { unique: true })
   username: string;

   @Length(6, 255, { message: '비밀번호는 6자리 이상이어야 합니다' })
   @Column('varchar')
   password: string;

   @IsString()
   @IsOptional()
   @Column('varchar', { nullable: true })
   firstName: string;

   @IsString()
   @IsOptional()
   @Column('varchar', { nullable: true })
   lastName: string;

   @IsNumber()
   @IsOptional()
   @Column('int', { nullable: true })
   age: number;

   @OneToMany((_type) => Post, (post) => post.user)
   posts: Post[];

   @OneToMany((_type) => Vote, (vote) => vote.user)
   votes: Vote[];

   @BeforeInsert()
   async hashPassword() {
      this.password = await bcrypt.hash(this.password, 6);
   }
}
