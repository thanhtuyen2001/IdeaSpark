'use client';

import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const PostCard = ({ post, handleDelete, handleEdit, handleTagClick }) => {
    const { data: session } = useSession();
    const [copied, setCopied] = useState(false);
    const router = useRouter();
    const pathName = usePathname();
    console.log(post.photo);

    const handleCopy = () => {
        setCopied(true);
        navigator.clipboard.writeText(post.prompt);
        setTimeout(() => {
            setCopied(false);
        }, 3000);
    }

    const handleProfileClick = () => {
        if (post.creator._id === session.user.id)
            return router.push('/profile');

        router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
    }
    return (
        <div className='prompt_card'>
            <div className='flex justify-between items-start gap-5'>
                <div className='flex-1 flex justify-start items-center gap-3 cursor-pointer'>
                    <Image
                        src={post.creator.image}
                        alt="avatar"
                        width={30}
                        height={30}
                        className="rounded-full object-contain"
                        onClick={handleProfileClick}
                    />

                    <div className='flex flex-col'>
                        <h3 className='font-satoshi font-semibold text-gray-900 '
                            onClick={handleProfileClick}
                        >{post.creator.username}</h3>
                        <p className='font-inter text-sm text-gray-500 '>{post.creator.email}</p>
                    </div>
                </div>

                <div className='copy_btn' >
                    <Image
                        src={copied ? "/assets/icons/tick.svg" : "/assets/icons/copy.svg"}
                        alt='copy icon'
                        width={12}
                        height={12}
                        onClick={handleCopy}
                    />
                </div>
            </div>

            <div className='my-4'>

            <p className=' font-satoshi text-sm text-gray-700'>{post.prompt}</p>
            <p
                className='font-inter text-sm blue_gradient cursor-pointer'
                onClick={() => { handleTagClick && handleTagClick(post.tag) }}
                >
                {post.tag}
            </p>
                </div>

            <Image
                src={post.photo}
                alt="post Image"
                width={270}
                height={270}
                className="rounded-lg object-contain"
                // onClick={handleProfileClick}
            />
           

            {(post.creator._id === session?.user.id && pathName === "/profile" &&
                <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
                    <p className='font-inter text-sm green_gradient cursor-pointer'
                        onClick={handleEdit}
                    >
                        Edit
                    </p>
                    <p className='font-inter text-sm green_gradient cursor-pointer'
                        onClick={handleDelete}
                    >
                        Delete
                    </p>
                </div>

            )}
        </div>
    )
}

export default PostCard;