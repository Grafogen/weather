type Props={
    info:string
    icon:React.ReactNode
    value:string
}

export const SingleWeather=(props:Props)=>{
    return(
        <div className="flex flex-col justify-between gap-2 items-center text-xs font-semibold">
        <p className="whitespace-nowrap">{props.info}</p>
        <div className="text-3xl">{props.icon}</div>
        <p>{props.value}</p>
        </div>
    )
}