import { React, useEffect, useState } from 'react';
import './App.css';
import Post from './components/Post/Post';
import Pagination from './components/Pagination/Pagination';

function App() {

  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  const URL = `https://jsonplaceholder.typicode.com/posts`;

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
      </header>
      {
        data.length > 0 ? (
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
          <h1>No Posts to display</h1>
        )
      }
    </div>
  );
}

export default App;