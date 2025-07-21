import { House } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { WeatherData } from "@/api/types";
import { toast } from "sonner";
import { useHomeLocation } from "@/hooks/use-home-location";

interface HomeLocationButtonProps {
  data: WeatherData;
}

export function HomeLocationButton({ data }: HomeLocationButtonProps) {
  const { homeLocation, setHome, clearHome } = useHomeLocation();
  const isHomeLocation =
    homeLocation?.lat === data.coord.lat &&
    homeLocation?.lon === data.coord.lon;

  const handleToggleHome = () => {
    if (isHomeLocation) {
      clearHome();
      toast.error(`${data.name} removed as Home Location`);
    } else {
      setHome({
        name: data.name,
        lat: data.coord.lat,
        lon: data.coord.lon,
        country: data.sys.country,
      });
      toast.success(`${data.name} set as Home Location`);
    }
  };

  return (
    <Button
      variant={isHomeLocation ? "default" : "outline"}
      size="icon"
      onClick={handleToggleHome}
      className={isHomeLocation ? "bg-green-500 hover:bg-green-600" : ""}
    >
      <House className={`h-4 w-4 ${isHomeLocation ? "fill-current" : ""}`} />
    </Button>
  );
}
