import React from 'react';
import {TbCloudSearch} from "react-icons/tb";
import {cn} from "@/utils/cn";

type Props = {
    classname?:string
    value: string
    onChange: React.ChangeEventHandler<HTMLInputElement> | undefined
    onSubmit: React.FormEventHandler<HTMLFormElement> | undefined
}

const SearchBox = (props: Props) => {
    return (
        <form onSubmit={props.onSubmit} className={cn("flex relative items-center justify-center h-10", props.classname)}>
            <input onChange={props.onChange}
                   value={props.value} type="text" placeholder="Search location..."
                   className="px-4 py-2 w-[230px] border border-gray-300
            rounded-l-md border-s-2 focus:outline-none focus:border-blue-500 h-full"
            />
            <button
                className="px-4 py-[9px] bg-blue-500 text-white rounded-r-md focus:outline-none hover:bg-blue-600  h-full">
                <TbCloudSearch className=""/>
            </button>
        </form>
    );
};

export default SearchBox;