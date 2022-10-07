import React, { useState, useEffect } from 'react';
import './ExpensesCalculator.css';

const initialFormValues = {
    mortgage: '',
    auto: '',
    taxes: '',
    insurance: '',
    creditCards: [{
        name: 'creditCards1',
        value: ''
    }],
    other: [{
        name: 'other1',
        value: ''
    }]
};

export default function ExpensesCalculator(props) {
    const { updateFigures, finalFigures, handleNavigate } = props
    const [formValues, setFormValues] = useState(initialFormValues);
    const [expenses, setExpenses] = useState();
    const [expensesAreEntered, setExpensesAreEntered] = useState(false);

    const fields = [
        'mortgage',
        'auto',
        'taxes',
        'insurance'
    ];

    useEffect(() => {
        let totalExpenses = 0
        for (const field of fields) {
            if (formValues[field]) 
                totalExpenses += parseInt(formValues[field]);
        };
        for (const cc of formValues.creditCards) {
            if (cc.value)
                totalExpenses += parseInt(cc.value)
        };
        for (const oth of formValues.other) {
            if (oth.value)
                totalExpenses += parseInt(oth.value);
        };
        setExpenses(totalExpenses);
    }, [formValues]);

    const handleChange = evt => {
        setFormValues(props.handleChange(evt));
        setExpensesAreEntered(false);
    };

    const handleChangeCC = evt => {
        const { name, value } = evt.target;
        setFormValues({...formValues, creditCards: formValues.creditCards.map(cc => {
            if (cc.name === name) return { name: name, value: value }
            else return cc
        })});
        setExpensesAreEntered(false);
    };

    const handleChangeOther = evt => {
        const { name, value } = evt.target;
        setFormValues({...formValues, other: formValues.other.map(oth => {
            if(oth.name === name) return { name: name, value: value }
            else return oth
        })});
        setExpensesAreEntered(false)
    };

    const addField = field => {
        const number = formValues[field].length + 1;
        const newField = {name: field + `${number}`, value: ''};
        setFormValues({...formValues, [field]: formValues[field].concat(newField)});
    };

    const delField = field => {
        const last = formValues[field].length;
        setFormValues({...formValues, [field]: formValues[field].filter(indField => {
            return indField.name !== `${field}${last}`
        })});
    };

    const handleSubmit = evt => {
        evt.preventDefault()
        updateFigures('expenses', expenses)
        setFormValues(initialFormValues);
        setExpensesAreEntered(true);
    };

    const handleReset = () => {
        setFormValues(initialFormValues);
        updateFigures('expenses', 0);
        setExpensesAreEntered(false);
    };
    
    return (
        <div id='Expenses-Calculator'>
            <header id='Expenses-Header'>
                <h2>Next, Let's Find Out What Your Monthly Expenses Are</h2>
            </header>
            <div className='form-container'>
                <form id='expenses-form' className='form' onSubmit={handleSubmit}>
                    <div id='expenses-fields-container' className='static-fields-container'>
                        {fields.map((field, i) => (
                            <input
                                key={i}
                                value={formValues[field]}
                                type='number'
                                placeholder={`monthly ${field} payment`}
                                name={field}
                                onChange={handleChange}
                            >
                            </input>
                        ))}    
                    </div>
                    <div id='credit-cards-container' className='dynamic-fields-container'>
                        {formValues.creditCards.map((cc, i) => (
                            <input
                                key={i}
                                value={cc.value}
                                type='number'
                                placeholder='minimum monthly payment'
                                name={cc.name}
                                onChange={handleChangeCC}
                            >
                            </input>
                        ))}
                        <button type='button' className='add-button' onClick={() => addField('creditCards')}>+</button>
                        {formValues.creditCards.length > 1 && 
                            <button type='button' className='del-button' onClick={() => delField('creditCards')}>-</button>}    
                    </div>
                    <div id='other-container' className='dynamic-fields-container'>
                        {formValues.other.map((oth, i) => (
                            <input
                                key={i}
                                value={oth.value}
                                type='number'
                                placeholder='Monthly Payment'
                                name={oth.name}
                                onChange={handleChangeOther}
                            >
                            </input>
                        ))}
                        <button type='button' className='add-button' onClick={() => addField('other')}>+</button>
                        {formValues.other.length > 1 &&
                            <button type='button' className='del-button' onClick={() => delField('other')}>-</button>}    
                    </div>
                    <div className='button-container'>
                        <button className='submit' type='submit'>Add Expenses</button>
                        <button className='reset' type='reset' onClick={handleReset}>Reset</button>    
                    </div>    
                </form>
                {expensesAreEntered && (
                    <div className='calculated-expenses' >
                        {`Your calculated monthly expenses are $${finalFigures.expenses}`}
                        <button onClick={() => handleNavigate('/mortgage')}>Next Page</button>
                    </div>
                )}
            </div>
        </div>
    )
}