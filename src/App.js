import { React, useEffect, useState } from 'react';
import './App.css';
import Post from './components/Post/Post';
import Pagination from './components/Pagination/Pagination';
import SearchBar from './components/SearchBar/SearchBar';

function App() {

  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [searchResults, setSearchResults] = useState('');

  const URL = `https://jsonplaceholder.typicode.com/posts`;

  const handleSearch = (query) => {
    let searchTerm = query.target.value;
    return setSearchResults(searchTerm);

  }

  useEffect(() => {
    fetch(URL)
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error('Something went wrong awhile requestingf posts');
      })
      .then((results) => {
        setData(results);
      })
      .catch((error) => setError(error.message));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Let's Paginate</h1>
        <SearchBar
          change={handleSearch}
        />
      </header>
      {
        data.length > 0 && searchResults === '' ? (
          <>
            <Pagination
              data={data}
              RenderComponent={Post}
              title="Posts"
              pageLimit={5}
              dataLimit={10}
            />
          </>
        ) :
          data.length > 0 && searchResults === '' ? (
            <>
              <Pagination
                data={data}
                RenderComponent={Post}
                title="Posts"
                pageLimit={5}
                dataLimit={10}
              />
            </>
          ) : (
            data?.filter(
              (val) => {
                if (val.title.toLowerCase().includes((searchResults).toLowerCase())) {
                  return val;
                }
              }
            )
          ).map((val, key) => {
            return (
              <Post
                key={key}
                title={val.title}
                body={val.body}
              />
            )
          })
      }
    </div>
  );
}

export default App;