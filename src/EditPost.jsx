import React from 'react'
import { useEffect } from 'react';
import { useParams, Link , useNavigate} from 'react-router-dom';
import { format } from 'date-fns';
import { useStoreState, useStoreActions } from 'easy-peasy';

const EditPost = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  
  const posts = useStoreState((state) => state.posts);    
    const editTitle = useStoreState((state) => state.editTitle);
    const editBody = useStoreState((state) => state.editBody);
    
    const editPost = useStoreActions((actions) => actions.editPost);
    const setEditTitle = useStoreActions((actions) => actions.setPostTitle);
    const setEditBody = useStoreActions((actions) => actions.setPostBody);
  
    const getPostById = useStoreState((state) => state.getPostById);
    const post = getPostById(id);
    useEffect(() =>{
        if(post){
            setEditTitle(post.title);
            setEditBody(post.body);
        }

    }, [post, setEditTitle, setEditBody])

    const handleEdit = (id) => {
      const dateTime = format(new Date(), 'MMM dd, yyyy pp');
      const updatedPost = { id, title: editTitle, dateTime, body: editBody };
      editPost(updatedPost);  
      navigate('/');
      
    }

  return (
    <main>
        {editTitle && <>
        <h2>Edit Post</h2>
        <form onSubmit= {(e) => e.preventDefault()}>
        <label htmlFor="postTitle">Title:</label>
        <input
        id='postTitle'
        type="text"
        required
        value={editTitle}
        onChange={(e)=>setEditTitle(e.target.value)} />
        <label htmlFor="postBody">Post:</label>
        <textarea
        id='postBody'
        required
        value={editBody}
        onChange={(e) =>setEditBody(e.target.value)} />
        <button type='submit' onClick={() => handleEdit(post.id)}>Update</button>
        </form>
        </>
        }
        {!editTitle && 
        <>
        <h2>Post Not Found</h2>
        <p>Well, that's disappointing.</p>
        <p>
          <Link to='/'>Visit our Home Page</Link>
        </p>
        </>  
        }
    </main>
  )
}

export default EditPost;