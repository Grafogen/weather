import React from 'react';

const GetDayOrNight = (iconName:string, dateTimeString:string) => {
    const hours=new Date(dateTimeString).getHours()
    const isDay=hours>=6 && hours<18
    return isDay ? iconName.replace(/.$/, "d") : iconName.replace(/.$/, "n")
};

export default GetDayOrNight;