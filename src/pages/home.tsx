import React from "react";
import { Link } from "react-router-dom";

export default function Posts({ posts }) {
  if (posts) {
    return (
      <ul className='list-none mt-4'>
        {posts.map(({ id, title, body, username, comments }) => (
          <Link to={`/detail/${id}`} key={id}>
            <div className='border-2 border-gray-500 rounded border-solid px-6 py-4 mb-4 hover:opacity-75 opacity-100'>
              <p className='text-xl mb-3 font-semibold'>{title}</p>
              <p className='mb-3 text-base'>
                {body.slice(0, 100).concat("...")}
              </p>
              <div className='flex justify-between'>
                <p className='text-base italic gray-500'>{username}</p>
                <p className='text-base italic gray-500'>
                  Comments: {comments}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </ul>
    );
  }
  return <div>posts loading...</div>;
}
