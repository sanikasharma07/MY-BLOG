import React, {useEffect, useState} from 'react'
import appwriteService from "../../appwrite/configure";
import {Container, PostCard} from '../index'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

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
        <div className="w-full min-h-[80vh] items-center py-16 bg-amber-50"> {/* Added a warm, earthy background */}
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
                
                {/* Left Side: The Hook */}
                <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
                    <h1 className="text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                        Every paw, wing, and fin <span className="text-green-600">has a story.</span>
                    </h1>
                    <p className="text-lg text-gray-700 mb-8">
                        Join our community of animal lovers. Share the adventures of your pets, 
                        tips on animal care, or just the cute moments that make life better.
                    </p>
                    
                    <div className="flex gap-4 justify-center md:justify-start">
                        <Link to="/login">
                            <button className="px-8 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition duration-300">
                                Start Posting
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Right Side: High-quality animal photography */}
                <div className="md:w-5/12">
                    <img 
                        src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=800&auto=format&fit=crop" 
                        alt="Cute animal" 
                        className="w-full rounded-2xl shadow-2xl border-4 border-white"
                    />
                </div>
            </div>
        </div>
    );
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
                        <div key={post.$id} className='p-2 w-full sm:w-1/2 lg:w-1/4'>
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