import React, { useState, useEffect } from 'react';
import './ExpensesCalculator.css';

const initialFormValues = {
    mortgage: '',
    auto: '',
    taxes: '',
    insurance: '',
    creditCards: [{
        name: 'CC1',
        value: ''
    }],
    other: [{
        name: 'oth1',
        value: ''
    }]
};

export default function ExpensesCalculator(props) {
    const [formValues, setFormValues] = useState(initialFormValues);

    const fields = [
        'mortgage',
        'auto',
        'taxes',
        'insurance'
    ];

    const handleChange = evt => {
        setFormValues(props.handleChange(evt));
    };

    const handleChangeCC = evt => {
        const { name, value } = evt.target;
        setFormValues({...formValues, creditCards: formValues.creditCards.map(cc => {
            if (cc.name === name) return { name: name, value: value }
            else return cc
        })});
    };

    const handleChangeOther = evt => {
        const { name, value } = evt.target;
        setFormValues({...formValues, other: formValues.other.map(oth => {
            if(oth.name === name) return { name: name, value: value }
            else return oth
        })});
    };


    const addCreditCard = () => {
        const number = formValues.creditCards.length + 1;
        const newCC = {name: `CC${number}`, value: ''};
        setFormValues({...formValues, creditCards: formValues.creditCards.concat(newCC)});
    };

    const addOther = () => {
        const number = formValues.other.length + 1;
        const newOther = {name: `oth${number}`, value: ''};
        setFormValues({...formValues, other: formValues.other.concat(newOther)})
    }

    useEffect(() => {
        console.log(formValues)
    }, [formValues])
    
    return (
        <div id='Expenses-Calculator'>
            <header id='Expenses-Header'>
                <h2>Next, Let's Find Out What Your Monthly Expenses Are</h2>
            </header>
            <div className='form-container'>
                <form id='expenses-form' className='form'>
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
                        <button type='button' className='add-button' onClick={addCreditCard}>+</button>    
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
                        <button type='button' className='add-button' onClick={addOther}>+</button>    
                    </div>
                    
                </form>
            </div>
        </div>
    )
}