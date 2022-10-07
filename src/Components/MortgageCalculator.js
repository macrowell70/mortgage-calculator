import React, { useState, useEffect } from 'react';

function MortgageCalculator(props) {
    const { income, expenses, dti, maxPayment, maxMortgage } = props.finalFigures;

    const fields = [{
        figure: income,
        lable: 'Monthly income'
    }, {
        figure: expenses,
        lable: 'Monthly expenses'
    }, {
        figure: dti,
        lable: 'Debt-to-income ratio'
    }, {
        figure: maxPayment,
        lable: 'Maximum monthly payment'
    }, {
        figure: maxMortgage,
        lable: 'Maximum mortgage principle'
    }];

    return (
        <div>
            {fields.map((field, i) => (
                <div className='mortgage-field' key={i} >
                    {`${field['lable']} ${field['figure']}`}
                </div>
            ))}
        </div>
    );
};

export default MortgageCalculator;