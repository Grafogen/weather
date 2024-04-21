'use client'
import Navbar from "@/components/Navbar";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {WeatherData} from "@/utils/dataTypes";
import {format, parseISO} from "date-fns";

export default function Home() {

    const {isPending, error, data} = useQuery<WeatherData>({
        queryKey: ['repoData'],
        queryFn: async () => {
            const {data} = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=pune&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=56`)
            return data
        }
    })
    if (isPending)
        return (
            <div className="flex items-center min-h-screen justify-center">
                <p className="animate-bounce">Loading...</p>
            </div>
        )

    if (error) return 'An error has occurred: ' + error.message
    console.log("data", data)

    const firstData=data?.list[0]

    return (
        <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
            <Navbar/>
            <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
                <section>
                    <div>
                        <h2 className='flex gap-1 text-2xl items-end'>
                            <p>{format(parseISO(firstData?.dt_txt ?? ''), 'EEEE')}</p>
                        </h2>
                        <div></div>
                    </div>
                </section>
                <section>

                </section>
            </main>
        </div>

    );
}
