export interface WeatherData {
    weather: [{
        main: string,
        description: string,
        icon: string,
        id: number
    }],
    main: {
        temp: number,
        temp_min: number,
        temp_max: number,
        humidity: number,
        pressure: number
    },
    wind: {
        speed: number,
        deg: number
    },
    clouds: {
        all: number
    },
    name: string,
    sys: {
        country: string,
        sunrise: number,
        sunset: number
    }
}