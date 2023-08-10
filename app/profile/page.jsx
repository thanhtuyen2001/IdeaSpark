'use client';

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = () => {
  const { data: session } = useSession();
  const [myPosts, setMyPosts] = useState([]);
  const router = useRouter();

  const fetchPosts = async () => {
    const postRes = await fetch(`/api/users/${session.user.id}/posts`);
    const data = await postRes.json();

    setMyPosts(data);
    // console.log(data);
  }
  useEffect(() => {
    if (session?.user.id) {
      fetchPosts();
    }
  }, [session?.user.id]);

  const handleDelete = async function (prompt) {
    const hasConfirmDelete = confirm('Are you sure you want to delete this prompt?');

    if (hasConfirmDelete) {
      try {
        await fetch(`/api/post/${prompt._id.toString()}`, {
          method: 'DELETE',
        });

        const posts = myPosts.filter(post => post._id !== prompt._id);
        setMyPosts(posts);
      } catch (error) {
        console.log(error);
      }
    }
  }
  const handleEdit = (prompt) => {
    router.push(`/update-prompt?id=${prompt._id}`);
  }

  return (
    <div>
      <Profile
        name="My"
        desc="Welcome to your personalized profile page. Share your exceptional ideas and inspire others with the power of your imagination"
        data={myPosts}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
    </div>
  )
}

export default MyProfile;