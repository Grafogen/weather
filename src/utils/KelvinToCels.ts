import React from 'react';

const KelvinToCels = (tempInKelv:number) => {
    const temp=tempInKelv-273.15
    return Math.floor(temp);
};

export default KelvinToCels;