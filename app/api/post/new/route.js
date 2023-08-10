import Post from "@models/post";
import { connectToDB } from "@utils/database";

export const POST = async (req) => {
    const {userId, prompt, tag, photo} = await req.json();

    try {
        await connectToDB();

        const newPost = new Post({ creator: userId, prompt, tag, photo });
        // console.log(newPost);
        await newPost.save();
        return new Response(JSON.stringify(newPost), {status: 201});
    } catch (error) {
        return new Response('Failed to create a new post', {
            status: 500
        })
    }
}