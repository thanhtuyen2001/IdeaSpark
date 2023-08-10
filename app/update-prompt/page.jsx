'use client';

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Form from "@components/Form";

const UpdatePage = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [submitting, setIsSubmitting] = useState(false);
    const [post, setPost] = useState({ prompt: '', tag: '' });

    const promptId = searchParams.get('id');

    useEffect(() => {
        const getPrompt = async function () {
            const response = await fetch(`/api/post/${promptId}`);

            const data = await response.json();
            setPost({
                prompt: data.prompt,
                tag: data.tag,
            });
            console.log({data})
            return data;
        }

        if (promptId)
            getPrompt();

    }, [promptId]);




    const updatePrompt = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        if(!promptId) return alert('Missing prompt id');

        try {
            const response = await fetch(`/api/post/${promptId}`, {
                method: 'PATCH',
                body: JSON.stringify(post),
            });
            

            if (response.ok) {
                router.push("/");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsSubmitting(false);
        }
    }
    return (
        <Form
            type="Update"
            post={post}
            setPost={setPost}
            handleSubmit={updatePrompt}
            submitting={submitting}

        />
    )
}

export default UpdatePage;



