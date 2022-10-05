import React, { useState, useEffect } from 'react';
import './IncomeCalculator.css';

const initialFormValues = {
    paycheck: '',
    frequency: ''
};

export default function IncomeCalculator(props) {
    const { updateFigures, handleNavigate, finalFigures } = props;
    const [paycheckIsEntered, setPaycheckIsEntered] = useState(false);
    const [formValues, setFormValues] = useState(initialFormValues);
    const [income, setIncome] = useState(0)

    const pickMultiple = frequency => {
        let multiple = 0;
        switch (frequency) {
            case 'monthly':
                multiple = 12;
                break;
            case 'semi-monthly':
                multiple = 24;
                break;
            case 'bi-weekly':
                multiple = 26;
                break;
            case 'weekly':
                multiple = 52;
        }
        return multiple
    };

    const handleChange = evt => {
        setFormValues(props.handleChange(evt))
        setPaycheckIsEntered(false)
    };

    useEffect(() => {
        const { paycheck, frequency } = formValues;
        setIncome(Math.round(paycheck * pickMultiple(frequency)/12 * 100)/100)
    }, [formValues]);

    const handleSubmit = evt => {
        evt.preventDefault();
        updateFigures('income', income);
        setFormValues(initialFormValues);
        setPaycheckIsEntered(true);
    };

    const handleReset = () => {
        setFormValues(initialFormValues);
        setPaycheckIsEntered(false);
        updateFigures('income', 0)
      };

    return (
        <div className='Income-calculator'>
            <header className='Income-header'>
                <h2>First Calculate Your Income</h2>
            </header>
            <div className='form-container'>
                <form id='income-form' className='form' onSubmit={handleSubmit}>
                    <label>How much do you make?<br></br>
                        <input
                            value={formValues.paycheck}
                            type='number' 
                            placeholder='Typical Paycheck' 
                            name='paycheck'
                            onChange={handleChange}
                        >
                        </input>
                    </label>    
                    <label>How often do you get paid?<br></br>
                        <select name='frequency' onChange={handleChange} value={formValues.frequency}>
                            <option value={''}>--Select Payment Frequency--</option>
                            <option value={'monthly'}>Monthly</option>
                            <option value={'semi-monthly'}>Semi-Monthly{' (twice per month)'}</option>
                            <option value={'bi-weekly'}>Bi-Weekly{' (every two weeks)'}</option>
                            <option value={'weekly'}>Weekly</option>
                        </select>
                    </label>    
                    <div className='button-container'>
                        <button className='submit' type='submit'>Calculate Monthly Income</button>
                        <button className='reset' type='reset' onClick={handleReset}>Reset</button> 
                    </div>
                    
                </form>
                {paycheckIsEntered && (
                    <div 
                        className='calculated-income'>
                        {`Your calculated monthly income: $${finalFigures.income}`}
                        <button onClick={() => handleNavigate('/expenses')}>Next Page</button> 
                    </div>
                )}
            </div>
        </div>
    )
}