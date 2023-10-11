import React from 'react';
import Feed from './Feed';
import { useStoreState } from 'easy-peasy';

const Home = ({isLoading, fetchError}) => {
  const searchResults = useStoreState((state) => state.searchResults);
  
  return (
    <main>
      {isLoading && <p>Loading Posts...</p>}
      {!isLoading && fetchError && <p>{fetchError}</p>}
    {!isLoading && !fetchError && (searchResults.length ? <Feed posts={searchResults} /> : <p>No Posts to display</p> )

      }
      {/* {posts.length ? (
        <Feed posts = {posts} />
      ): (
        <p style={{marginTop: "2rem"}}> No Posts to display.</p>
      )} */}

    </main>
    
  )
}

export default Home;