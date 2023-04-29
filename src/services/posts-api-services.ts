import axios from "axios"
import type {Post} from "@/models/post.model";

const http = axios.create({
    baseURL:"https://jsonplaceholder.typicode.com/"
})

type DeleteUserResponse = '';
export class PostsApiService{
    getAll() {
        return http.get<Post[]>('posts')
    }

    getPostById(id:number){
        return http.get<Post>('posts/'+id)
    };

    getPostComments(id:number){
        return http.get('posts/'+id+'/comments')
    };
    createPost(body:Post){
        return http.post<Post>('posts',body)
    }

    updatePost(id:number,body:Post){
        return http.patch<Post>('posts/'+id,body)
    }

    delete(id:number){
        return http.delete<DeleteUserResponse>("posts/"+id)
    }
}