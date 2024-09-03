"use client";

import { ChangeEvent, useState, FormEvent } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CloudIcon, ThermometerIcon, MapPinIcon, Heart } from "lucide-react";
import ScrollOnInputFocus from "./ui/ScrollOnInputFocus";

type errorOccurType = number | undefined;

interface WeatherData {
  temperature: errorOccurType;
  description: string;
  location: string;
  unit: string;
}

const WeatherWidget = () => {
  const [location, setLocation] = useState<string>("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedLocation = location.trim();
    if (trimmedLocation === "") {
      setError("Please enter a valid location");
      setWeather(null);
      return;
    }
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${trimmedLocation}&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
      );
      if (!response.ok) {
        throw new Error("City not found");
      }
      const data = await response.json();
      const weatherData: WeatherData = {
        temperature: Math.floor(data.main.temp),
        description: data.weather[0].description,
        location: data.name,
        unit: "C",
      };
      console.log(weatherData.description);
      setWeather(weatherData);
    } catch (error) {
      console.error("Sorry! Error fetching weather data:", error);
      setError("City not found. Please try again.");
      setWeather(null);
    } finally {
      setIsLoading(false);
    }
  };

  function getTemperatureMessage(temp: errorOccurType, unit: string): string {
    if (typeof temp === "number") {
      if (unit === "C") {
        if (temp < 0) {
          return `It's freezing out there at ${temp}°C. Don't forget your gloves!`;
        } else if (temp < 10) {
          return `A crisp and cool ${temp}°C. Perfect for a light jacket.`;
        } else if (temp < 20) {
          return `Perfect weather for getting things done at ${temp}°C, just lounging in the sun!`;
        } else if (temp < 30) {
          return `If you're not sweating at ${temp}°C, are you even trying to stay cool?`;
        } else {
          return `It's hot at ${temp}°C. Stay hydrated!`;
        }
      }
    }
    return `${temp}°C`;
  }

  function getWeatherMessage(des: string): string {
    switch (des.toLowerCase()) {
      case "clear sky":
        return "The sky is clear and sunny.";
      case "few clouds":
        return "A few clouds are scattered in the sky.";
      case "scattered clouds":
        return "The sky is partly cloudy with scattered clouds.";
      case "broken clouds":
        return "Clouds are broken, covering the sky intermittently.";
      case "shower rain":
        return "Expect occasional showers of rain throughout the day.";
      case "rain":
        return "Rain is falling steadily.";
      case "thunderstorm":
        return "Thunderstorms are occurring with potential lightning.";
      case "snow":
        return "Snow is falling, covering everything in white.";
      case "mist":
        return "Visibility is reduced due to misty conditions.";
      default:
        return des;
    }
  }

  function getLocationMessage(loc: string): string {
    const currHour = new Date().getHours();
    const isNight = currHour >= 18 || currHour < 6;

    return `${loc} ${isNight ? "at Night" : "During the Day"}`;
  }

  return (
    <div className="container flex min-h-screen flex-col justify-center items-center p-6 sm:p-8 bg-black">
      <ScrollOnInputFocus />
      <Card className="flex flex-col shadow-lg rounded-2xl border-4 border-current shadow-slate-300 self-center items-center p-3 w-full sm:w-[35%]">
        <CardHeader className="items-center">
          <CardTitle className="text-[18px] sm:text-[20px]">
            Weather Widget
          </CardTitle>
          <CardDescription className="text-[11px] sm:text-[16px]">
            Search for the current weather condition in your city
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSearch}
            className="searchBar flex flex-col sm:flex-row items-center justify-between w-full py-3"
          >
            <Input
              placeholder="Enter a city name"
              className="w-full sm:w-[300px] mb-3 sm:mb-0"
              value={location}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setLocation(e.target.value)
              }
            />
            <Button
              type="submit"
              className="w-full sm:w-auto mx-3"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Search"}
            </Button>
          </form>
          {error && <div className="mt-4 text-red-500">{error}</div>}
          {weather && (
            <div className="mt-4 grid gap-2">
              <div className="flex items-center gap-2">
                <ThermometerIcon className="w-6 h-6" />
                <div>
                  {weather
                    ? getTemperatureMessage(weather.temperature, weather.unit)
                    : "N/A"}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <CloudIcon className="w-6 h-6" />
                <div>
                  {weather ? getWeatherMessage(weather.description) : "N/A"}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MapPinIcon className="w-6 h-6" />
                <div>
                  {weather ? getLocationMessage(weather.location) : "N/A"}
                </div>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="text-xs mt-8 text-center border-t-2 pt-2 flex flex-col justify-center items-center">
          <div className="flex items-center gap-1 leading-1">
            <span>created by</span>
            <Heart className="w-4 h-4 text-red-500" />
          </div>
          <p className="name text-[10px] underline tracking-wider leading-5 mt-1">
            <span>S</span>heikh <span>J</span>ibran <span>A</span>hmed
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export { WeatherWidget, ScrollOnInputFocus };
