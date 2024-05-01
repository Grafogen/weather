'use client'
import Navbar from "@/components/Navbar";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {WeatherData} from "@/utils/dataTypes";
import {format, fromUnixTime, parseISO} from "date-fns";
import Container from "@/components/Container";
import KelvinToCels from "@/utils/KelvinToCels";
import WeatherIcon from "@/components/WeatherIcon";
import GetDayOrNight from "@/utils/getDayOrNight";
import {WeatherDetails} from "@/components/WeatherDetails";
import {MToKm} from "@/utils/mToKm";
import SpeedKonv from "@/utils/SpeedKonv";
import Forecast from "@/components/Forecast";
import {loadingCityComp, placeAtom} from "@/app/atom";
import {useAtom} from "jotai";
import {useEffect} from "react";

export default function Home() {
    const [place, setPlace] = useAtom(placeAtom)
    const [loadingCity,] = useAtom(loadingCityComp)


    const {isPending, error, data, refetch} = useQuery<WeatherData>({
        queryKey: ['repoData'],
        queryFn: async () => {
            const {data} = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${place}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=56`,)
            return data
        }
    })


    useEffect(() => {
        refetch()
    }, [place, refetch]);

    if (isPending)
        return (
            <div className="flex items-center min-h-screen justify-center">
                <p className="animate-bounce">Loading...</p>
            </div>
        )

    if (error) return 'An error has occurred: ' + error.message
    console.log("data", data)

    const firstData = data?.list[0]

    const uniqDates = [
        ...new Set(
            data?.list.map((t) => new Date(t.dt * 1000).toISOString().split('T')[0]
            )
        )
    ]

    const firstDataForEachDate = uniqDates.map((date) => {
        return data?.list.find((e) => {
            const entryDate = new Date(e.dt * 1000).toISOString().split("T")[0]
            const entryTime = new Date(e.dt * 1000).getHours()
            return entryDate === date && entryTime >= 6
        })
    })

    return (
        <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
            <Navbar city={data.city.name}/>
            <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
                {loadingCity ? <WeatherSkeleton/> : (<>
                    <section className="space-y-4">
                        <div className="space-y-2">
                            <h2 className='flex gap-1 text-2xl items-end'>
                                <p>{format(parseISO(firstData?.dt_txt ?? ''), 'EEEE')}</p>
                                <p className="text-lg">({format(parseISO(firstData?.dt_txt ?? ''), 'dd.MM.yyyy')})</p>
                            </h2>
                            <Container className="gap-10 px-6 items-center">
                                <div className="flex flex-col px-4">
                                <span className="text-5xl">
                                {KelvinToCels(firstData?.main.temp ?? 0)}°
                                    </span>
                                    <p className="text-xs space-x-1 whitespace-nowrap">
                                        <span>Feels like</span>
                                        <span>{KelvinToCels(firstData?.main.feels_like)}°</span>
                                    </p>
                                    <p className="text-xs space-x-2">
                                        <span>{KelvinToCels(firstData?.main.temp_min)}°↓{" "}</span>
                                        <span>{" "}{KelvinToCels(firstData?.main.temp_max)}°↑</span>
                                    </p>
                                </div>
                                {/*Temprature*/}
                                <div className="flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3">
                                    {data?.list.map((d, i) => {
                                        return <div key={i}
                                                    className="flex flex-col justify-between gap-2 items-center text-xs font-semibold">
                                            <p className="whitespace-nowrap">{format(parseISO(d.dt_txt), "h:mm a")}</p>
                                            <WeatherIcon iconName={GetDayOrNight(d.weather[0].icon, d.dt_txt)}/>
                                            <p>
                                                {KelvinToCels(d?.main.temp ?? 0)}°
                                            </p>
                                        </div>
                                    })}

                                </div>
                            </Container>
                        </div>
                        <div className="flex gap-4">
                            <Container className="w-fit justify-center flex-col px-4 items-center">
                                <p className="capitalize text-center">{firstData.weather[0].description}</p>
                                <WeatherIcon
                                    iconName={GetDayOrNight(firstData?.weather[0].icon ?? '', firstData?.dt_txt ?? '')}/>
                            </Container>
                            <Container className="bg-yellow-300/80 px-6 gap-4 justify-between  overflow-x-auto ">
                                <WeatherDetails
                                    visability={MToKm(firstData?.visibility ?? 10000)}
                                    humidity={`${firstData?.main.humidity}%`}
                                    windSpeed={SpeedKonv(firstData?.wind.speed)}
                                    airPressure={`${firstData?.main.pressure} hPa`}
                                    sunrise={format(fromUnixTime(data?.city.sunrise ?? 23), "H:mm")}
                                    sunset={format(fromUnixTime(data?.city.sunset ?? 31), "H:mm")}/>
                            </Container>
                        </div>
                    </section>
                    <section className="flex w-full flex-col gap-4">
                        <p className="text-2xl"> Forcast (7 days)</p>
                        {firstDataForEachDate.map((d, i) => {
                            return <Forecast key={i}
                                             weatherIcon={d?.weather[0].icon ?? "01d"}
                                             date={format(parseISO(d?.dt_txt ?? ''), "dd.MM")}
                                             day={format(parseISO(d?.dt_txt ?? ''), "EEEE")}
                                             temp={d?.main.temp ?? 0}
                                             feels_like={d?.main.feels_like ?? 0}
                                             temp_min={d?.main.temp_min ?? 0}
                                             tem_max={d?.main.temp_max ?? 0}
                                             description={d?.weather[0].description ?? ''}
                                             visability={`${MToKm(d?.visibility ?? 10000)}`}
                                             humidity={`${d?.main.humidity}%`}
                                             windSpeed={SpeedKonv(d?.wind.speed ?? 0)}
                                             airPressure={`${d?.main.pressure} hPa`}
                                             sunrise={format(fromUnixTime(data?.city.sunrise ?? 23), "H:mm")}
                                             sunset={format(fromUnixTime(data?.city.sunset ?? 31), "H:mm")}/>
                        })}
                    </section>
                </>)}

            </main>
        </div>
    );
}

function WeatherSkeleton() {
    return (
        <section className="space-y-8 ">
            <div className="space-y-2 animate-pulse">
                <div className="flex gap-1 text-2xl items-end ">
                    <div className="h-6 w-24 bg-gray-300 rounded"></div>
                    <div className="h-6 w-24 bg-gray-300 rounded"></div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((index) => (
                        <div key={index} className="flex flex-col items-center space-y-2">
                            <div className="h-6 w-16 bg-gray-300 rounded"></div>
                            <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
                            <div className="h-6 w-16 bg-gray-300 rounded"></div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex flex-col gap-4 animate-pulse">
                <p className="text-2xl h-8 w-36 bg-gray-300 rounded"></p>
                {[1, 2, 3, 4, 5, 6, 7].map((index) => (
                    <div key={index} className="grid grid-cols-2 md:grid-cols-4 gap-4 ">
                        <div className="h-8 w-28 bg-gray-300 rounded"></div>
                        <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
                        <div className="h-8 w-28 bg-gray-300 rounded"></div>
                        <div className="h-8 w-28 bg-gray-300 rounded"></div>
                    </div>
                ))}
            </div>
        </section>
    );
}