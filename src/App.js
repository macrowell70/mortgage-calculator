import React from 'react';
import './App.css';

export const handleChange = evt => {
  const {name, value} = evt.target
  evt.preventDefault();
  return(values => ({...values, [name]: value}));
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome! Let's get started</h1>
        <a href='/income'>
          <button>Click To Begin</button>
        </a>
      </header>
    </div>
  );
}

export default App;
