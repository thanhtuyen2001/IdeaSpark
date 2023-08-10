'use client';

import React from 'react'
import { useState, useEffect } from 'react';
import PromptCard from './PromptCard';
import PostCard from './PostCard';

const PromptCardList = function ({data, handleTagClick}) {
  const [searchText, setSearchText] = useState('');

  return (
    <div className='mt-16 prompt_layout'>
      {
        data.map((post) => (
          // <PromptCard
          //   key={post._id}
          //   post={post}
          //   handleTagClick={handleTagClick}
          // />
          <PostCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
          />
        ))
      }
    </div>
  )
}
const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);
  const [searchedPost, setSearchedPost] = useState([]);

  const fetchPosts = async () => {
    const response = await fetch('/api/post');
    const data = await response.json();
    setPosts(data);
  }
  useEffect(() => {
    fetchPosts();
  }, [])

  const filtPrompts = function (searchText) {
    const regex = new RegExp(searchText, "i");

    return posts.filter(post => regex.test(post.creator.username) || regex.test(post.tag) || regex.test(post.prompt));
  }

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);

    const result = filtPrompts(e.target.value);
    // console.log(result);
    setSearchedPost(result);
  }
  
  const handleTagClick = (tagName) => {
    // console.log(e.target);
    setSearchText(tagName);
    const result = filtPrompts(tagName);
    setSearchedPost(result);
  }

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input type="text" placeholder='Search for a tag or username' required
          className='search_input peer'
          value={searchText}
          onChange={handleSearchChange} 

        />
      </form>

      {
        searchText ? (
          <PromptCardList data={searchedPost}/>
        ) : (
          <PromptCardList data={posts}
          handleTagClick={handleTagClick}
          />
        )
      }
      
    </section>
  )
}

export default Feed;

