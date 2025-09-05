import { useState, useEffect } from 'react';

interface Coords {
  lat: number;
  lon: number;
}

const useLocation = () => {
  const [coords, setCoords] = useState<Coords>({} as Coords);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) =>
        setCoords({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        })
      );
    } else console.log('Geolocation is not supported by this browser.');
  }, []);

  return coords;
};

export default useLocation;
