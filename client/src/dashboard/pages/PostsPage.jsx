import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';
import { useDispatch, useSelector } from "react-redux";

export default function PostsPage()
{
  const { loading, posts } = useSelector((state) => state.posts)

  useEffect(() =>
  {
    const fetchPosts = async () =>
    {
      const res = await fetch('/api/post/getPosts');
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);
  return (
    <div>
      <div className='flex flex-col gap-6 px-3 max-w-6xl'>
        <h1 className='text-xl md:text-2xl xl:text-3xl font-bold
      tracking-tight mb-12'>Welcome to my updates</h1>
        <p className='text-gray-500 text-xs sm:text-sm'>
          Here you'll find a variety of posts on topics such as daily explorations, family,
          web development, software engineering, and programming languages.
        </p>
        <Link
          to='/search'
          className='text-xs sm:text-sm text-teal-500 font-bold hover:underline'
        >
          View all posts
        </Link>
      </div>

      <div className='mx-auto p-3 flex flex-col gap-8 py-7 items-center justify-center'>
        {posts && posts.length > 0 && (
          <div className='flex justify-center items-center flex-col gap-6'>
            <h2 className='text-2xl font-semibold text-center'>Recent Posts</h2>
            <div className='grid lg:grid-cols-3 items-center justify-center gap-4 md:gap-8'>
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to={'/search'}
              className='text-lg text-teal-500 hover:underline text-center'
            >
              View all posts
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
