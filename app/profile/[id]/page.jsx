'use client';

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = ({ params }) => {
    const searchParams = useSearchParams();
    const username = searchParams.get('name');

    const [allPosts, setAllPosts] = useState([]);
    const router = useRouter();

    const fetchPosts = async () => {
        const postRes = await fetch(`/api/users/${params?.id}/posts`);
        const data = await postRes.json();

        setAllPosts(data);
        console.log(data);
    }
    useEffect(() => {
        if (params?.id) {
            fetchPosts();
        }
    }, [params.id]);

    return (
        <div>
            <Profile
                name={username}
                desc="Let's discover!!!!"
                data={allPosts}
            />
        </div>
    )
}

export default MyProfile;