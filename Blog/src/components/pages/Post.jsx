import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../../appwrite/configure";
import { Button, Container } from "../index";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8">
            <Container>
                {/* Image Wrapper Container */}
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2 bg-gray-50">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)} // Swapped to avoid transformation block
                        alt={post.title}
                        className="rounded-xl max-h-100 object-contain"
                    />

                    {isAuthor && (
                        /* Moved from right-6 top-6 to right-2 top-2 for maximum edge positioning */
                        <div className="absolute right-2 top-2 flex gap-1.5 z-10">
                            <Link to={`/edit-post/${post.$id}`}>
                                {/* Added explicit tight padding and smaller text size */}
                                <Button 
                                    bgColor="bg-green-500" 
                                    className="px-3 py-1 text-xs md:text-sm font-medium shadow-md hover:bg-green-600 transition-colors"
                                >
                                    Edit
                                </Button>
                            </Link>
                            <Button 
                                bgColor="bg-red-500" 
                                onClick={deletePost}
                                className="px-3 py-1 text-xs md:text-sm font-medium shadow-md hover:bg-red-600 transition-colors"
                            >
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                
                <div className="w-full mb-6 text-center">
                    <h1 className="text-3xl font-extrabold">{post.title}</h1>
                </div>
                <div className="browser-css w-full max-w-4xl mx-auto px-4 text-lg leading-relaxed">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
}