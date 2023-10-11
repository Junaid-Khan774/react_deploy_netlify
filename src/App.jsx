import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';
import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import EditPost from './EditPost';
import About from './About';
import Missing from './Missing';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import useAxiosFetch from './hooks/useAxiosFetch';
import { useStoreActions } from 'easy-peasy';

function App() {
  const setPosts = useStoreActions((actions) => actions.setPosts);
  const {data, fetchError , isLoading} = useAxiosFetch('http://localhost:3500/posts');
  
  useEffect(() =>{
      setPosts(data);
    }, [data, setPosts])

  return (
    <>
      <Header title="React Blog Posts"/>
      <Nav />
      <Routes>
        <Route exact path='/' element={<Home isLoading = {isLoading} fetchError = {fetchError} />} />
        <Route exact path='/post' element={<NewPost />} />
        <Route exact path='/edit/:id' element={<EditPost />} />
        <Route path='/post/:id' element={<PostPage />} />
        <Route path='/about' element={<About />} />
        <Route path='*' element={<Missing />} />
      </Routes>
      <Footer />

    </>
  )
}

export default App;
