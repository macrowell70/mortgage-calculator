import React from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

export const handleChange = evt => {
  const {name, value} = evt.target
  evt.preventDefault();
  return(values => ({...values, [name]: value}));
};

function App() {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/income');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome! Let's get started</h1>
        <button onClick={handleClick}>Click To Begin</button>
      </header>
    </div>
  );
}

export default App;
