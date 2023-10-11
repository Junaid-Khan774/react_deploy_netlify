import React from 'react';
import {Link, useParams} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {useStoreState, useStoreActions} from 'easy-peasy';
const PostPage = () => {
const {id} = useParams();
const navigate = useNavigate();
const deletePost = useStoreActions((actions) => actions.deletePost);
const getPostById = useStoreState((state) => state.getPostById);
const post = getPostById(id);

const handleDelete = async (id) => {
  deletePost(id);
  navigate('/');
}

  return (
    <main>
      <article>
        {post && 
        <>
        <h2>{post.title}</h2>
        <p>{post.dateTime}</p>
        <p>{post.body}</p>
        <Link to = {`/edit/${post.id}`}> <button>Edit Post</button> </Link>
        <button onClick={() =>handleDelete(post.id)}> Delete Post</button>
        </>
        }
        {!post && 
        <>
        <h2>Post Not Found</h2>
        <p>Well, that's disappointing.</p>
        <p>
          <Link to='/'>Visit our Home Page</Link>
        </p>
        </>
          
        }

      </article>
    </main>
    
  )
}

export default PostPage;