import { connectToDB } from "@utils/database";
import Post from "@models/post";

export const GET = async (req, {params}) => {
    try {
        await connectToDB();

        const post = await Post.findById(params.id).populate('creator');
        if(!post){
            return new Response("Prompt not found", {status: 404});
        }
        return new Response(JSON.stringify(post), {status: 200});
    } catch (error) {
        return new Response('Failed to get post', {
            status: 500
        })
    }
}

export const DELETE = async (req, {params}) => {
    try {
        await connectToDB();

        await Post.findByIdAndRemove(params.id);

        return new Response("Post deleted successfully", {status: 200});
    } catch (error) {
        return new Response('Failed to delete post', {
            status: 500
        })
    }
}
export const PATCH = async (req, {params}) => {
    const {prompt, tag} = await req.json();

    try {
        await connectToDB();

        const currentPost = await Post.findById(params.id).populate('creator');
        if(!currentPost){
            return new Response("Post not found", {status: 404});
        }

        currentPost.prompt = prompt;
        currentPost.tag = tag;

        await currentPost.save();

        return new Response("uccessfully updated the Post", {status: 200});
    } catch (error) {
        return new Response('Failed to updated post', {
            status: 500
        })
    }
}