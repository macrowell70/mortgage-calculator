import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
    
    const handleClick = () => {
        navigate('/income')
    };

    return (
        <div className='Home'>
            <header className="App-header">
                <h1>Welcome! Let's get started</h1>
                <button onClick={handleClick}>Click To Begin</button>
            </header> 
        </div>
    )
}

export default Home