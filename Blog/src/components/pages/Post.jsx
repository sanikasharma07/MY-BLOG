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
                {/* 1. Image Card Section */}
                <div className="relative w-full max-w-4xl mx-auto mb-8">
                    {isAuthor && (
                        <div className="absolute right-4 top-4 flex gap-2 z-10">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="px-4 py-2 text-sm shadow-lg hover:bg-green-600 transition-colors">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost} className="px-4 py-2 text-sm shadow-lg hover:bg-red-600 transition-colors">
                                Delete
                            </Button>
                        </div>
                    )}
                    <div className="w-full overflow-hidden rounded-2xl shadow-xl border border-gray-100 bg-white p-2">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="w-full h-auto object-cover rounded-xl"
                        />
                    </div>
                </div>

                {/* 2. Content Card Section */}
                <div className="w-full max-w-4xl mx-auto px-4">
                    <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                        <h1 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">{post.title}</h1>
                        <div className="browser-css w-full text-gray-800 text-lg leading-relaxed">
                            {parse(post.content)}
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    ) : null;
}