import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './index.css';
import App, {handleChange} from './App';
import IncomeCalculator from './Components/IncomeCalculator';
import ExpensesCalculator from './Components/ExpensesCalculator';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <React.StrictMode>
      <nav className='main-nav'>
        <Link to='/'>Home</Link>
        <Link to='/income'>Income</Link>
        <Link to='/expenses'>Expenses</Link>
      </nav>
      <Routes>
        <Route exact path='/' element={<App/>} />
        <Route 
          path='/income' 
          element={<IncomeCalculator 
          handleChange={handleChange} />} 
        />
        <Route 
          path='/expenses' 
          element={<ExpensesCalculator
          handleChange={handleChange} />} 
        />
      </Routes>
    </React.StrictMode>
  </Router>
  
);
