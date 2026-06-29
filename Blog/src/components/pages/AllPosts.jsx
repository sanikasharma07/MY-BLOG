import React, { useEffect, useState } from "react";
import {Container,PostCard} from "../index" 
import appwriteService from '../../appwrite/configure'

function AllPosts(){
    const [posts,setPost]=useState([])
   useEffect(()=>{
appwriteService.allPost([]).then((posts)=>{
    if(posts){
        setPost(posts.rows)
    }
})

   },[])
    return(
     <div className="w-full py-8">
        <Container>
            <div className="flex flex-wrap">
                 {posts.map((post)=>(
                    <div key={post.$id} className="p-2 w-1/4">
                        <PostCard 
                            $id={post.$id}
                            title={post.title}
                            featuredImage={post.featuredImage}
                        />
                    </div>
                 ))}
                </div>
        </Container>
     </div>
    )
}
export default AllPosts