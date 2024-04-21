interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
}

interface Main {
    temp: number;
    feelsLike: number;
    tempMin: number;
    tempMax: number;
    pressure: number;
    seaLevel: number;
    groundLevel: number;
    humidity: number;
    tempKf: number;
}

interface Clouds {
    all: number;
}

interface Wind {
    speed: number;
    deg: number;
    gust: number;
}

interface Sys {
    pod: string;
}

interface Rain {
    h3: number;
}

interface ForecastItem {
    dt: number;
    main: Main;
    weather: Weather[];
    clouds: Clouds;
    wind: Wind;
    visibility: number;
    pop: number;
    rain?: Rain;
    sys: Sys;
    dt_txt: string;
}

interface Coord {
    lat: number;
    lon: number;
}

interface City {
    id: number;
    name: string;
    coord: Coord;
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
}

export interface WeatherData {
    cod: string;
    message: number;
    cnt: number;
    list: ForecastItem[];
    city: City;
}