import React, { useState, useEffect } from 'react';
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
  expenses: 0,
  dti: 0,
  maxPayment: 0,
  maxMortgage: 0
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

  useEffect(() => {
    const { income, expenses } = finalFigures
    const dti = Math.round((expenses/income)*100) || 0;
    setFinalFigures({...finalFigures, dti: dti});
  }, [finalFigures.income, finalFigures.expenses]);

  useEffect(() => {
    const { income, dti } = finalFigures;
    const diffDti = 42 - dti;
    const maxPayment = Math.round(income * diffDti)/100;
    setFinalFigures({...finalFigures, maxPayment: maxPayment });
  }, [finalFigures.dti]);

  useEffect(() => {
    const { maxPayment } = finalFigures;
    const r = .05/12;
    const n = 360;
    const exp = Math.pow((1 + r), n);
    const denom = (r * exp)/(exp - 1);
    const maxMortgage = Math.round((maxPayment/denom)*100)/100;
    setFinalFigures({...finalFigures, maxMortgage: maxMortgage})
  }, [finalFigures.maxPayment]);

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
            finalFigures={finalFigures}
            handleNavigate={handleNavigate} 
            handleChange={handleChange}
            updateFigures={updateFigures} />} 
          />
          <Route 
            path='/expenses' 
            element={<ExpensesCalculator
            finalFigures={finalFigures}
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
