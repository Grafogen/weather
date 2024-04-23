import React from 'react';
import Container from "@/components/Container";
import WeatherIcon from "@/components/WeatherIcon";
import {WeatherDetails, WeatherProps} from "@/components/WeatherDetails";
import KelvinToCels from "@/utils/KelvinToCels";


export interface Forecast extends WeatherProps {
    weatherIcon: string;
    date: string;
    day: string;
    temp: number;
    feels_like: number;
    temp_min: number;
    tem_max: number;
    description: string;
}

const Forecast = (props:Forecast) => {
    return (
        <Container className='gap-4'>
            <section className='flex gap-4 items-center px-4'>
                <div>
                    <WeatherIcon iconName={props.weatherIcon}/>
                    <p>{props.date}</p>
                    <p className="text-sm">{props.day}</p>
                </div>
                <div className='flex flex-col px-4'>
                    <span className='text-5xl'>{KelvinToCels(props.temp)}°</span>
                    <p className='text-xs space-x-1 whitespace-nowrap'>
                        <span> Feels like</span>
                        <span>{KelvinToCels(props.feels_like)}°</span>
                    </p>
                    <p className='capitalize'> {props.description}</p>
                </div>
            </section>
            <section className='overflow-x-auto flex justify-between gap-4 px-4 w-full pr-10'>
                <WeatherDetails {...props}/>
            </section>
        </Container>
    );
};

export default Forecast;