'use client'
import React, {useState} from 'react';
import {FaSun} from "react-icons/fa";
import {FaMapLocationDot} from "react-icons/fa6";
import {MdOutlineMyLocation} from "react-icons/md";
import SearchBox from "@/components/SearchBox";
import axios from "axios";

type Props = {
    country: string
}

const Navbar = (props: Props) => {

    const [city, setCity] = useState('')
    const [error, setError] = useState('')

    const [suggestions, setSuggestions] = useState<string[]>([])
    const [showSuggestions, setShowSuggestions] = useState(false)


    const handleInput = async (value: string) => {
        setCity(value)
        if (value.length >= 3) {
            try {
                const res = await axios.get(`https://api.openweathermap.org/data/2.5/find?q=${value}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`)
                const suggest = res.data.list.map((i: any) => i.name);
                setSuggestions(suggest);
                setError('')
                setShowSuggestions(true)
            } catch (e) {
                setSuggestions([])
                setShowSuggestions(false)
            }
        } else {
            setSuggestions([])
            setShowSuggestions(false)
        }
    }

    const handleSuggestion = (value: string) => {
        setCity(value)
        setShowSuggestions(false)
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if(suggestions.length===0){
            setError('Location not found')
        }else{
            setError('')
            setShowSuggestions(false)
        }
    }

    return (
        <div className="shadow-sm sticky top-0 left-0 z-50 bg-white">
            <div className="h-[80px] w-full flex justify-between items-center max-w-7xl px-3 mx-auto ">
                <p className="flex items-center justify-center gap-2">
                    <h2 className="text-gray-500 text-3xl">Weather</h2>
                    <FaSun className='text-3xl mt-1 text-yellow-300'/>
                </p>
                <section className="flex gap-2 items-center">
                    <MdOutlineMyLocation className="text-2xl text-gray-500 hover:opacity-80 cursor-pointer"/>
                    <FaMapLocationDot className="text-3xl"/>
                    <p className="text-slate-900/80 text-sm">
                        {props.country}
                    </p>
                    <div className='relative'>
                        <SearchBox onSubmit={handleSubmit} value={city}
                                   onChange={e => handleInput(e.target.value)}/>
                        <SuggetionBox {...{showSuggestions, suggestions, handleSuggestion, error}} />
                    </div>
                </section>

            </div>
        </div>
    );
};
export default Navbar;

function SuggetionBox({showSuggestions, suggestions, handleSuggestion, error}: {
    showSuggestions: boolean;
    suggestions: string[];
    handleSuggestion: (i: string) => void;
    error: string
}) {
    return (
        <>
            {((showSuggestions && suggestions.length > 1) || error) && (
                <ul className='mb-4 bg-white absolute border top-[44px] left-0 border-gray-300 rounded-md min-w-[200px] flex flex-col gap-1 py-2 px-2'>

                    {error && suggestions.length < 1 && (<li className='text-red-500 p-1'>{error}</li>)}
                    {suggestions.map((d, i) => {
                        return (
                            <li key={i} onClick={() => handleSuggestion(d)}
                                className='cursor-pointer p-1 rounded hover:bg-gray-200'>
                                {d}
                            </li>
                        )
                    })}
                    <li className='cursor-pointer p-1 rounded hover:bg-gray-200'>

                    </li>

                </ul>
            )}
        </>
    )
}

