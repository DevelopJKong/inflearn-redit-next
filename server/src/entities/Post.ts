import { Sub } from './Sub';
import { Column, Entity, ManyToOne } from 'typeorm';
import BaseEntity from './Entity';

@Entity('posts')
export class Post extends BaseEntity {
  @ManyToOne(() => Sub, (sub) => sub.posts)
  @Column()
  sub: string;
}
