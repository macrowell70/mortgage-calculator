import React, { useState } from 'react';

const initialFormValues = {
    mortgage: '',
    auto: '',
    taxes: '',
    insurance: '',
    creditCards: [],
    other: []
};

export default function ExpensesCalculator(props) {
    const [formValues, setFormValues] = useState(initialFormValues);

    const handleChange = evt => {
        setFormValues(props.handleChange(evt));
    };
    
    return (
        <div className='Expenses-Calculator'>
            <header className='Expenses-Header'>
                <h2>Next, Let's Find Out What Your Monthly Expenses Are</h2>
            </header>
            <div className='form-container'>

            </div>
        </div>
    )
}