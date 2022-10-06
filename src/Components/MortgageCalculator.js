import React, { useState, useEffect } from 'react';

function MortgageCalculator(props) {
    const { income, expenses, dti, maxPayment } = props.finalFigures;

    return (
        <div>
            <div>
               {`${income}`} 
            </div>
            <div>
                {`${expenses}`}
            </div>
            <div>
                {`${dti}%`}
            </div>
            <div>
                {`${maxPayment}`}
            </div>
        </div>
    );
};

export default MortgageCalculator;