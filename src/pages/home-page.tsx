import { useState } from "react";
import { useHomeLocation } from "@/hooks/use-home-location";
import {
  useWeatherQuery,
  useForecastQuery,
  useReverseGeocodeQuery,
} from "@/hooks/use-weather";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, ChevronDown, Home } from "lucide-react";
import { CurrentWeather } from "@/components/current-weather";
import { HourlyTemperature } from "@/components/hourly-temperature";
import { WeatherDetails } from "@/components/weather-details";
import { WeatherForecast } from "@/components/weather-forecast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function HomePage() {
  const { homeLocation } = useHomeLocation();
  const [forecastDays, setForecastDays] = useState(5);

  if (!homeLocation) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>No Home Location</AlertTitle>
        <AlertDescription>
          You have not set a home location yet. Go to any city and click "Set as
          Home Location".
        </AlertDescription>
      </Alert>
    );
  }

  const weatherQuery = useWeatherQuery(homeLocation);
  const forecastQuery = useForecastQuery(homeLocation);
  const locationQuery = useReverseGeocodeQuery(homeLocation);

  const locationName = locationQuery.data?.[0];

  if (weatherQuery.error || forecastQuery.error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to fetch weather data. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  if (!weatherQuery.data || !forecastQuery.data) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight flex items-center gap-2">
          <Home className="h-6 w-6 text-blue-500" />
          Home Location
        </h1>
      </div>

      <div className="grid gap-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <CurrentWeather
            data={weatherQuery.data}
            locationName={locationName}
          />
          <HourlyTemperature data={forecastQuery.data} />
        </div>

        <div className="grid gap-6 md:grid-cols-2 items-start">
          <WeatherDetails data={weatherQuery.data} />

          <div className="space-y-4">
            <DropdownMenu>
              <DropdownMenuTrigger className="px-4 py-2 border rounded-md flex items-center gap-2">
                Choose forecast for following days
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Following days</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setForecastDays(3)}>
                  3 days
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setForecastDays(5)}>
                  5 days
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <WeatherForecast data={forecastQuery.data} days={forecastDays} />
          </div>
        </div>
      </div>
    </div>
  );
}
