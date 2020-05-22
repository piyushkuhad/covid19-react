//import React from 'react';

const NumberFormat = ({formatNum}) => {
    return new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(formatNum);
}

export default NumberFormat;