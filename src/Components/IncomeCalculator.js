import React, {useState} from 'react';
import './IncomeCalculator.css';

const initialFormValues = {
    paycheck: '',
    frequency: '',
    calculatedInc: ''
};

export default function IncomeCalculator(props) {
    const [paycheckIsEntered, setPaycheckIsEntered] = useState(false);
    const [formValues, setFormValues] = useState(initialFormValues);

    const pickMultiple = (frequency) => {
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
    }

    const handleSubmit = evt => {
        const {paycheck, frequency} = formValues
        evt.preventDefault();
        const calculatedInc = 
            Math.round(paycheck * pickMultiple(frequency)/12 * 100)/100;
        setFormValues(({
            ['paycheck']: '',
            ['frequency']: '',
            ['calculatedInc']: calculatedInc
        }));
        setPaycheckIsEntered(true);
    };

    const handleReset = () => {
        setFormValues(initialFormValues);
        setPaycheckIsEntered(false)
      }

    return (
        <div className='Income-calculator'>
            <header className='Income-header'>
                <h2>First Calculate Your Income</h2>
            </header>
            <div className='form-container'>
                <form className='Income-form' onSubmit={handleSubmit}>
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
                        {`Your calculated monthly income: $${formValues.calculatedInc}`}
                        <button>Next Page</button>
                    </div>
                )}
            </div>
        </div>
    )
}