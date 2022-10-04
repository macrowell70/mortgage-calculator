import React, { useState } from 'react';
import { useNavigate, Route, Link, Routes } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import IncomeCalculator from './Components/IncomeCalculator';
import ExpensesCalculator from './Components/ExpensesCalculator';
import MortgageCalculator from './Components/MortgageCalculator';

const handleChange = evt => {
  const {name, value} = evt.target
  evt.preventDefault();
  return(values => ({...values, [name]: value}));
};

const initialFigures = {
  income: 0,
  expenses: 0
};

function App() {
  const [finalFigures, setFinalFigures] = useState(initialFigures);
  const navigate = useNavigate();

  const updateFigures = (figure, value) => {
    setFinalFigures({...finalFigures, [figure]: value});
  };

  const handleNavigate = page => {
    navigate(page)
  };

  return (
    <div className="App">
      <React.StrictMode>
        <nav className='main-nav'>
          <Link to='/'>Home</Link>
          <Link to='/income'>Income</Link>
          <Link to='/expenses'>Expenses</Link>
          <Link to='/mortgage'>Mortgage</Link>
        </nav>
        <Routes>
          <Route 
            exact path='/' 
            element={<Home 
            handleNavigate={handleNavigate} />} 
          />
          <Route 
            path='/income' 
            element={<IncomeCalculator
            handleNavigate={handleNavigate} 
            handleChange={handleChange}
            updateFigures={updateFigures} />} 
          />
          <Route 
            path='/expenses' 
            element={<ExpensesCalculator
            handleChange={handleChange}
            updateFigures={updateFigures} />} 
          />
          <Route 
            path='/mortgage'
            element={<MortgageCalculator
            finalFigures={finalFigures} />}
          />
        </Routes>
      </React.StrictMode>
    </div>
  );
}

export default App;
