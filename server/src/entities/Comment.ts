import { ManyToOne } from "typeorm";
import BaseEntity from "./Entity";
import { Post } from "./Post";



export class Comment extends BaseEntity {
    @ManyToOne((type) => Post, (post) => post.comments)
    post:Post;

}