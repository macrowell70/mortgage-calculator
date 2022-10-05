import React, { useState, useEffect } from 'react';

function MortgageCalculator(props) {
    const { income, expenses, dti } = props.finalFigures;

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
        </div>
    );
};

export default MortgageCalculator;