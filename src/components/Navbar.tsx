import React from 'react';
import { FaSun } from "react-icons/fa";
import {FaMapLocationDot} from "react-icons/fa6";
import {MdOutlineMyLocation} from "react-icons/md";
import SearchBox from "@/components/SearchBox";

const Navbar = () => {
    return (
        <div className="shadow-sm sticky top-0 left-0 z-50 bg-white">
            <div className="h-[80px] w-full flex justify-between items-center max-w-7xl px-3 mx-auto">
                <p className="flex items-center justify-center gap-2">
                    <h2 className="text-gray-500 text-3xl">Weather</h2>
                    <FaSun className='text-3xl mt-1 text-yellow-300'/>
                </p>
                <section className="flex gap-2 items-center">
                    <MdOutlineMyLocation className="text-2xl text-gray-500 hover:opacity-80 cursor-pointer" />
                    <FaMapLocationDot className="text-3xl" />
                    <p className="text-slate-900/80 text-sm">
                        Belarus
                    </p>
                    <div>
                        <SearchBox/>
                    </div>
                </section>

            </div>
        </div>
    );
};

export default Navbar;