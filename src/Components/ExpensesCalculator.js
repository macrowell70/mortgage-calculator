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

    const handleChangeDyn = evt => {
        const { name, value, className } = evt.target;
        setFormValues({...formValues, [className]: formValues[className].map(field => {
            if (field.name === name) return { name: name, value: value }
            else return field
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
                        {fields.map((field) => (
                            <div key={field}>
                                <label htmlFor={field}>Enter your monthly {`${field}`} payment</label><br></br>
                                <input
                                    id={field}
                                    value={formValues[field]}
                                    type='number'
                                    placeholder={`$0.00`}
                                    name={field}
                                    onChange={handleChange}
                                >
                                </input>
                            </div>
                        ))}    
                    </div>
                    <label htmlFor='credit-cards-container'>Enter your minimum monthly credit card payments</label>
                    <div id='credit-cards-container' className='dynamic-fields-container'>
                        {formValues.creditCards.map((cc) => (
                                <input
                                    key={cc.name}
                                    className='creditCards'
                                    value={cc.value}
                                    type='number'
                                    placeholder='$0.00'
                                    name={cc.name}
                                    onChange={handleChangeDyn}
                                >
                                </input>
                        ))}
                        <button type='button' className='add-button' onClick={() => addField('creditCards')}>+</button>
                        {formValues.creditCards.length > 1 && 
                            <button type='button' className='del-button' onClick={() => delField('creditCards')}>-</button>}    
                    </div>
                    <label htmlFor='other-container' >Any other monthly payments you may have</label>
                    <div id='other-container' className='dynamic-fields-container'>
                        {formValues.other.map((oth) => (
                            <input
                                key={oth.name}
                                className='other'
                                value={oth.value}
                                type='number'
                                placeholder='$0.00'
                                name={oth.name}
                                onChange={handleChangeDyn}
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