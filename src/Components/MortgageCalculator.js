import React, { useState, useEffect } from 'react';

function MortgageCalculator(props) {
    const { income, expenses, dti, maxPayment, maxMortgage } = props.finalFigures;

    return (
        <div>
            <div id='mortgage-income' className='mortgage-field' >
               {`Monthly income $${income}`} 
            </div>
            <div id='mortgage-expenses' className='mortgage-field' >
                {`Monthly expenses $${expenses}`}
            </div>
            <div id='mortgage-dti' className='mortgage-field' >
                {`Debt-to-income ratio ${dti}%`}
            </div>
            <div id='mortgage-payment' className='mortgage-field' >
                {`Maximum monthly payment $${maxPayment}`}
            </div>
            <div id='mortgage-principle' className='mortgage-field' >
                {`Maximum mortgage principle $${maxMortgage}`}
            </div>
        </div>
    );
};

export default MortgageCalculator;