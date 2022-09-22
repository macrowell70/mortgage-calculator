import React, { useState, useEffect } from 'react';

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
        })})
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
        <div className='Expenses-Calculator'>
            <header className='Expenses-Header'>
                <h2>Next, Let's Find Out What Your Monthly Expenses Are</h2>
            </header>
            <div className='form-container'>
                <form>
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
                    <button type='button' onClick={addCreditCard}>Add Credit Card</button>
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
                    <button type='button' onClick={addOther}>Add Other Account</button>
                </form>
            </div>
        </div>
    )
}