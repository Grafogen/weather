import React from 'react';



const SpeedKonv = (inMs:number) => {
    const speed=inMs*3.6

    return `${speed.toFixed(0)}km/h`
};

export default SpeedKonv;