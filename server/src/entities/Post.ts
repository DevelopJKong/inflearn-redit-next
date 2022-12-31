import { Vote } from './Vote';
import { User } from './User';
import { BeforeInsert, Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import BaseEntity from './Entity';
import { Sub } from './Sub';
import { Exclude, Expose } from 'class-transformer';
import { Comment } from './Comment';
import { makeId, slugify } from '../utils/helpers';

@Entity('posts')
export class Post extends BaseEntity {
   @Index()
   @Column('varchar')
   identifier: string;

   @Column('varchar')
   title: string;

   @Index()
   @Column('varchar')
   slug: string;

   @Column({ nullable: true, type: 'text' })
   body: string;

   @Column('varchar')
   subName: string;

   @Column('varchar')
   username: string;

   @ManyToOne((_type) => User, (user) => user.posts)
   @JoinColumn({ name: 'username', referencedColumnName: 'username' })
   user: User;

   @ManyToOne((_type) => Sub, (sub) => sub.posts)
   @JoinColumn({ name: 'subName', referencedColumnName: 'name' })
   sub: Sub;

   @OneToMany((_type) => Comment, (comment) => comment.post)
   comments: Comment[];

   @Exclude()
   @OneToMany((_type) => Vote, (vote) => vote.post)
   votes: Vote[];

   @Expose() get url(): string {
      return `r/${this.subName}/${this.identifier}/${this.slug}`;
   }

   @Expose() get commentCount(): number {
      return this.comments?.length;
   }

   @Expose() get voteScore(): number {
      return this.votes?.reduce((memo, curt) => memo + (curt.value || 0), 0);
   }

   protected userVote: number;

   setUserVote(user: User) {
      const index = this.votes?.findIndex((v) => v.username === user.username);
      this.userVote = index > -1 ? this.votes[index].value : 0;
   }

   @BeforeInsert()
   makeIdAndSlug() {
      this.identifier = makeId(7);
      this.slug = slugify(this.title);
   }
}
