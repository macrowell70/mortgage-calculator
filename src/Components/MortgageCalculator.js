import React, { useState, useEffect } from 'react';

function MortgageCalculator(props) {
    const { income, expenses } = props.finalFigures;

    return (
        <div>
            <div>
               {`${income}`} 
            </div>
            <div>
                {`${expenses}`}
            </div>
        </div>
    );
};

export default MortgageCalculator;