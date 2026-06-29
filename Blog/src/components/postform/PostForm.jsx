import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {Button,Input,Select,RTE} from '../index'
import appwriteService from "../../appwrite/configure";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PostForm({post}){
    const {register, handleSubmit, watch, setValue, control, getValues} = useForm({
        defaultValues:{
           title: post?.title || '',
           slug: post?.slug || '',
           content: post?.content || '',
           status: post?.status || 'active',
        },
    })
    
    const navigate = useNavigate()
    const userData = useSelector(state => state.auth.userData)
    
    const selectedImage = watch("image");
    const [previewUrl, setPreviewUrl] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (selectedImage && selectedImage.length > 0) {
            const tempUrl = URL.createObjectURL(selectedImage[0]);
            setPreviewUrl(tempUrl);
            return () => URL.revokeObjectURL(tempUrl);
        } else {
            setPreviewUrl(null);
        }
    }, [selectedImage]);

    const submit = async (data) => {
        setLoading(true);
        try {
            if (post) {
                const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

                if (file) {
                    appwriteService.deleteFile(post.featuredImage);
                }

                delete data.image; 

                const dbPost = await appwriteService.updatePost(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : post.featuredImage,
                });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            } else {
                const file = await appwriteService.uploadFile(data.image[0]);

                if (file) {
                    const fileId = file.$id;
                    data.featuredImage = fileId;
                    delete data.image; 

                    const dbPost = await appwriteService.createPost({
                        ...data,
                        userId: userData?.$id,
                        username: userData?.name || "MeowBlogger",
                    });

                    if (dbPost) {
                        navigate(`/post/${dbPost.$id}`);
                    }
                }
            }
        } catch (error) {
            console.error("Submission failed:", error);
        } finally {
            setLoading(false);
        }
    }

    const slugTransform = useCallback((value) => {
        if(value && typeof value=='string' ){
            return value.trim()
            .toLowerCase()
            .replace(/[^a-zA-Z\d\s]+/g,'-')
            .replace(/\s/g,'-')
        }
        return ''
    }, [])
 
    useEffect(() => {
        const subscription = watch((value, {name}) => {
            if(name === 'title'){
                setValue('slug', slugTransform(value.title, {shouldValidate: true}))
            }
        })
        return () => {
            subscription.unsubscribe()
        }
    }, [watch, slugTransform, setValue])

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-full lg:w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            
            <div className="w-full lg:w-1/3 px-2 mt-4 lg:mt-0">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4 file:bg-blue-600 file:text-white file:px-4 file:py-2 file:rounded-md file:border-0 file:mr-4 hover:file:bg-blue-700"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />

                {previewUrl && (
                    <div className="w-full mb-4">
                        <p className="text-sm text-gray-500 mb-1 font-bold">New Image Preview:</p>
                        <img src={previewUrl} alt="Preview" className="rounded-lg border border-gray-300 shadow-sm w-full object-cover" />
                    </div>
                )}

                {post && !previewUrl && (
                    <div className="w-full mb-4">
                        <p className="text-sm text-gray-500 mb-1 font-bold">Current Image:</p>
                        <img src={appwriteService.getFilePreview(post.featuredImage)} alt={post.title} className="rounded-lg w-full object-cover" />
                    </div>
                )}

                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button 
                    type="submit" 
                    bgcolor={post ? "bg-green-500" : undefined} 
                    disabled={loading}
                    className="w-full transition-all duration-200 ease-in-out active:scale-95 active:opacity-80"
                >
                    {loading ? "Submitting..." : (post ? "Update" : "Submit")}
                </Button>
            </div>
        </form>
    );
}

export default PostForm