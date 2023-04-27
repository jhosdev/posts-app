import axios from "axios"

const http = axios.create({
    baseURL:"https://jsonplaceholder.typicode.com/"
})

export class PostsApiService{
    getAll() {
        return http.get('posts')
    }

    getPostById(id:string){
        return http.get('posts/'+id)
    };

    getPostComments(id:string){
        return http.get('posts/'+id+'/comments')
    };
    createPost(body:any){
        return http.post('posts',body)
    }

    udapte(id:string,body:any){
        return http.patch('posts/'+id,body)
    }

    delete(id:string){
        return http.delete("posts/"+id)
    }
}