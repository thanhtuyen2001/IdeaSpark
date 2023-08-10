'use client';

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";

const CreatePost = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [post, setPost] = useState({ prompt: '', tag: '', photo: '' });
  const [file, setFile] = useState(null);
  const [submitting, setIsSubmitting] = useState(false);

  const uploadImage = async function (file){
    console.log('Uploading photo...');
    // const file = e.target.files[0];
    console.log({file});

    const formData = new FormData();

    formData.append('file', file);
    formData.append('upload_preset', 'IdeaSpark');

    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/ideasparkcloud/image/upload', {
        method: 'POST',
        body: formData  ,
      });
      
      const data = await response.json();
      // console.log(data.url); 
      return data.url;
    } catch (error) {
      console.error(error);
    }
  }

  const createPost = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // console.log("user:", session?.user.id);
    try {
      const imgUrl = await uploadImage(file);

      const response = await fetch('/api/post/new', {
        method: 'POST',
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag,
          photo: imgUrl,
        })
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
      type="Create"
      post={post}
      setPost={setPost}
      handleSubmit={createPost}
      submitting={submitting}
      setImgFile = {setFile}
    />
  )
}

export default CreatePost;

