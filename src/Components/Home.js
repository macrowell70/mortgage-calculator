import React from 'react';

function Home(props) {
    const { handleNavigate } = props

    return (
        <div className='Home'>
            <header className="App-header">
                <h1>Welcome! Let's get started</h1>
                <button onClick={() => handleNavigate('/income')}>Click To Begin</button>
            </header> 
        </div>
    )
}

export default Home