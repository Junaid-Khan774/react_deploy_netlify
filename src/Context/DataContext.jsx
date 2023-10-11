import React from 'react'
import { createContext, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import Api from '../Api/posts';
import useAxiosFetch from '../hooks/useAxiosFetch';
const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    const {data, fetchError , isLoading} = useAxiosFetch('http://localhost:3500/posts');
    useEffect(() =>{
      setPosts(data);
    }, [data])
    // useEffect(() => {
    //   const fetchPosts = async () => {
    //     try {  
    //       const response = await Api.get('/posts');
    //       setPosts(response.data);
    //     } catch (err) {
    //       //Not in the 200 response range.
    //       if (err.response) {
    //         console.log(err.response.data);
    //         console.log(err.response.status);
    //         console.log(err.response.headers);
    //       }
    //       else {
    //         console.log(`Error: ${err.message}`)
    //       }
    //     }
    //   }
    //   fetchPosts();
    // }, [])
  
    useEffect(() => {
      const filteredResults = posts.filter(post =>
        ((post.body).toLowerCase()).includes(search.toLowerCase())
        ||
        ((post.title).toLowerCase()).includes(search.toLowerCase()))
      setSearchResults(filteredResults.reverse());
    }, [posts, search])
     
      
    return (
        <DataContext.Provider value={{
            search , setSearch ,
            searchResults , fetchError , isLoading ,
            posts, setPosts

        }} > {children} </DataContext.Provider>
    )
}
export default DataContext;