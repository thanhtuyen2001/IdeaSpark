import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
import Post from "@models/post";

export const GET = async (req, {params}) => {
    // console.log("params", params);

    try {
        await connectToDB();
        const prompts = await Prompt.find({creator: params.id}).populate('creator');
        const posts = await Post.find({creator: params.id}).populate('creator');
        // console.log("params", prompts);

        return new Response(JSON.stringify(posts), {status: 200});
    } catch (error) {
        return new Response('Failed to fetch all prompts', {
            status: 500
        })
    }
}