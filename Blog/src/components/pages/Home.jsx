import React, {useEffect, useState} from 'react'
import appwriteService from "../../appwrite/configure";
import {Container, PostCard} from '../index'
import { useSelector } from 'react-redux';

function Home(){
    const [posts, setPosts] = useState([])
    // 1. Add a loading state, initially set to TRUE
    const [loading, setLoading] = useState(true) 
    const authstatus = useSelector((state) => state.auth.status)
    
    useEffect(() => {
        appwriteService.allPost().then((post) => {
            if(post) {
                setPosts(post.rows || []) 
            }
        }).finally(() => {
            // 2. When the fetch is completely done (success or fail), turn loading OFF
            setLoading(false) 
        })
    }, [])

    // SCENARIO 1: The data is still fetching! Show a loading message.
    if (loading) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            {/* Pro-tip: Added Tailwind's animate-pulse to make it look like a real loader! */}
                            <h1 className="text-2xl font-bold text-gray-500 animate-pulse">
                                Just a sec...
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    // SCENARIO 2: Fetch is done, but user is logged out.
    if (authstatus === false) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    // SCENARIO 3: Fetch is done, user is logged in, but database is empty.
    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                No Post Available
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    // SCENARIO 4: Fetch is done, user is logged in, and posts exist!
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
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

export default Home