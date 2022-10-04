import React, { useEffect } from 'react';

function MortgageCalculator(props) {
    const { finalFigures } = props;

    return (
        <div>
            <div>
               {`${finalFigures.income}`} 
            </div>
            <div>
                {`${finalFigures.expenses}`}
            </div>
        </div>
    );
};

export default MortgageCalculator;