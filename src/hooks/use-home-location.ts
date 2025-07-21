import { useLocalStorage } from "@/hooks/use-local-storage";

export interface HomeLocation {
  id: string;
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

export function useHomeLocation() {
  const [homeLocation, setHomeLocation] = useLocalStorage<HomeLocation | null>(
    "homeLocation",
    null
  );

  const setHome = (city: Omit<HomeLocation, "id">) => {
    const newHome: HomeLocation = {
      ...city,
      id: `${city.lat}-${city.lon}`,
    };
    setHomeLocation(newHome);
  };

  const clearHome = () => {
    setHomeLocation(null);
  };

  const isHome = (lat: number, lon: number) => {
    return homeLocation?.lat === lat && homeLocation?.lon === lon;
  };

  return {
    homeLocation,
    setHome,
    clearHome,
    isHome,
  };
}
