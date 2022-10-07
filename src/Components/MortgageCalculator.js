import React, { useState, useEffect } from 'react';

function MortgageCalculator(props) {
    const { income, expenses, dti, maxPayment, maxMortgage } = props.finalFigures;

    const fields = [{
        figure: 'income',
        lable: `Monthly income $${income}`
    }, {
        figure: 'expenses',
        lable: `Monthly expenses $${expenses}`
    }, {
        figure: 'dti',
        lable: `Debt-to-income ratio ${dti}%`
    }, {
        figure: 'payment',
        lable: `Maximum monthly payment $${maxPayment}`
    }, {
        figure: 'principle',
        lable: `Maximum mortgage principle $${maxMortgage}`
    }];

    return (
        <div>
            {fields.map((field, i) => (
                <div id={`mortgage-${field.figure}`} className='mortgage-field' key={i} >
                    {`${field.lable}`}
                </div>
            ))}
        </div>
    );
};

export default MortgageCalculator;