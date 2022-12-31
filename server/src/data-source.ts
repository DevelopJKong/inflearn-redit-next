import { Vote } from './entities/Vote';
import { User } from './entities/User';
import { Post } from './entities/Post';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Sub } from './entities/Sub';
import { Comment } from './entities/Comment';

export const appDataSource = new DataSource({
   type: 'postgres',
   host: 'localhost',
   port: 5432,
   username: 'postgres',
   password: '1234',
   database: 'postgres',
   synchronize: true,
   logging: true,
   entities: [Comment, Post, User, Vote, Sub],
   migrations: [],
   subscribers: [],
});
