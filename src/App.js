import React, { useState } from 'react';
import { useNavigate, Route, Link, Routes } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import IncomeCalculator from './Components/IncomeCalculator';
import ExpensesCalculator from './Components/ExpensesCalculator';

const handleChange = evt => {
  const {name, value} = evt.target
  evt.preventDefault();
  return(values => ({...values, [name]: value}));
};

const initialFigures = {
  income: '',
  expenses: ''
};

function App() {
  const [finalFigures, setFinalFigures] = useState(initialFigures);
  const updateFigures = (figure, value) => {
    setFinalFigures({...finalFigures, [figure]: value});
    console.log(finalFigures)
  };

  return (
    <div className="App">
      <React.StrictMode>
        <nav className='main-nav'>
          <Link to='/'>Home</Link>
          <Link to='/income'>Income</Link>
          <Link to='/expenses'>Expenses</Link>
        </nav>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route 
            path='/income' 
            element={<IncomeCalculator 
            handleChange={handleChange}
            updateFigures={updateFigures} />} 
          />
          <Route 
            path='/expenses' 
            element={<ExpensesCalculator
            handleChange={handleChange}
            updateFigures={updateFigures} />} 
          />
        </Routes>
      </React.StrictMode>
    </div>
  );
}

export default App;
