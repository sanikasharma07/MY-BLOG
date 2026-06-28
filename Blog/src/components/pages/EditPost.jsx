import React, { useEffect, useState } from "react";
import { Container,PostForm } from "../index";
import appwriteService from '../../appwrite/configure'
import { useNavigate, useParams } from "react-router-dom";

function EditPost(){
    const [posts,setPost]=useState(null)
    const {slug}= useParams()
    const navigate=useNavigate()
     useEffect(()=>{
        if(slug){
            appwriteService.getPost(slug).then((post)=>{
                if(post){
                    setPost(post)
                }
            })
        }
        else {
            navigate('/')
        }
     },[slug,navigate])
return posts?(
      <div className="py-8">
        <Container>
            <PostForm post={posts}/>
        </Container>
      </div>
):null
}
export default EditPost