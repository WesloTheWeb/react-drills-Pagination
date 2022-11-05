import { React, useEffect, useState } from 'react';
import './App.css';
import Box from './components/Box/Box';

function App() {

  const [data, setData] = useState([])

  const URL = `https://jsonplaceholder.typicode.com/posts`;

  useEffect(() => {
    fetch(URL)
      .then((res) => res.json())
      .then((results) => {
        setData(results);
      });
  }, []);

  console.log(data);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Let's Paginate</h1>
      </header>
      {
        data?.map((post) => {
          return (
            <Box
              key={post.id}
              index={post.id}
              header={post.title}
              description={post.body}
            />
          )
        })
      }
    </div>
  );
}

export default App;