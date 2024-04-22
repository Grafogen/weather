import React from 'react';
import { FaEye } from "react-icons/fa6";
import { LuDroplet } from "react-icons/lu";
import { FaWind } from "react-icons/fa";
import { WiBarometer } from "react-icons/wi";
import { BsSunrise } from "react-icons/bs";
import { BsSunset } from "react-icons/bs";
import {SingleWeather} from "@/components/SingleWeather";

type WeatherProps={
    visability:string
    humidity:string
    windSpeed:string
    airPressure:string
    sunrise:string
    sunset:string
}

 export function WeatherDetails (props:WeatherProps)  {
    const {visability, sunrise, sunset, humidity, windSpeed, airPressure}=props
    return (
        <div>
            <SingleWeather
            info={'Visability'}
            icon={<FaEye />}
            value={visability}
            />
            <SingleWeather
                info={'Humidity'}
                icon={<LuDroplet />}
                value={humidity}
            />
            <SingleWeather
                info={'Wind speed'}
                icon={<FaWind />}
                value={windSpeed}
            />
            <SingleWeather
                info={'Air pressure'}
                icon={<WiBarometer  />}
                value={airPressure}
            />
            <SingleWeather
                info={'Sunrise'}
                icon={<BsSunrise />}
                value={sunrise}
            />
            <SingleWeather
                info={'Sunset'}
                icon={<BsSunset />}
                value={sunset}
            />
        </div>
    );
};

