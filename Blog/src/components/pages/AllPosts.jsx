import React, { useEffect, useState } from "react";
import { Container, PostCard } from "../index" 
import appwriteService from '../../appwrite/configure'
import { useSelector } from "react-redux";

function AllPosts() {
    const [loading,setLoading]=useState(true)
    const [posts, setPost] = useState([])
    
    // 1. Grab the current user's data from Redux
    const userData = useSelector((state) => state.auth.userData)

    useEffect(() => {
        appwriteService.allPost([]).then((posts) => {
            // 2. Make sure we actually got posts AND we have a logged-in user
            if (posts && userData) {
                const allThePosts = posts.rows || []
                
                // 3. THE MAGIC: Filter out everyone else's posts!
                const userPosts = allThePosts.filter(
                    (post) => post.userId === userData.$id
                )
                
                // 4. Update the state with ONLY the logged-in user's posts
                setPost(userPosts)
            }
        }).finally(()=>{
            setLoading(false)
        })
    
    }, [userData]) // Let React know to re-run this if the user changes
    if (loading) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            {/* Pro-tip: Added Tailwind's animate-pulse to make it look like a real loader! */}
                            <h1 className="text-2xl font-bold text-gray-500 animate-pulse">
                                Loading posts...
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    // Optional: Add a quick check so they don't just see a blank screen if they have 0 posts
    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <h1 className="text-2xl font-bold text-black">
                        You haven't written any posts yet🐾
                    </h1>
                </Container>
            </div>
        )
    }

    return(
     <div className="w-full py-8">
        <Container>
            <div className="flex flex-wrap">
                 {posts.map((post) => (
                    <div key={post.$id} className="p-2 w-full sm:w-1/2 lg:w-1/4">
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