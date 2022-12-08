import React from "react";
import { useParams, Link } from "react-router-dom";

export default function Detail({ posts }) {
  const { id } = useParams();

  const [post] = posts.filter((post) => {
    return post.id === parseInt(id);
  });

  if (post) {
    const { title, body, username } = post;
    return (
      <div className='mt-4'>
        <p className='text-2xl font-semibold mb-3'>{title}</p>
        <p className='text-base mb-4'>{body}</p>
        <div className='flex justify-between mb-10 items-center'>
          <Link to='/'>
            <button className='bg-gray-500 text-white rounded py-2 px-4 opacity-100 hover:opacity-75'>
              Back to posts
            </button>
          </Link>
          <p className='text-base font-semibold'>{username}</p>
        </div>
        <p className='text-lg font-semibold mb-4'>Comments</p>
        <ul>
          {post.comments.map(({ id, body, name, email }) => {
            return (
              <li key={id} className='mb-6'>
                <p className='text-base mb-1 font-semibold'>{name}</p>
                <p className='text-sm text-gray-500 mb-1 italic'>{email}</p>
                <p className='text-sm'>{body}</p>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
  return <div>Wrong ID, no detail found</div>;
}
