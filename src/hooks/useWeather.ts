import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import apiClient from '../services/api-client';
import { useState, useEffect } from 'react';

interface CountryClimate {
  name: string;
  sys: {
    country: string;
  };
  weather: [{ main: string; icon: string; description: string }];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
}

interface Coords {
  lat: number;
  lon: number;
}

const useWeather = () => {
  const [cooords, setCoords] = useState<Coords>({} as Coords);

  useEffect(() => {
    if ('geolocation' in navigator)
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => console.error(error.message)
      );
    else console.log('Geolocation is not supported by this browser.');
  }, []);

  const { data, error, isLoading } = useQuery({
    queryKey: ['climate'],
    queryFn: () =>
      apiClient
        .get<CountryClimate>(`?lat=${cooords.lat}&lon=${cooords.lon}`)
        .then((res) => res.data),
  });

  const { data: country } = useQuery({
    queryKey: ['country'],
    queryFn: () =>
      axios
        .get<{ name: { common: string } }>(
          `https://restcountries.com/v3.1/alpha/${
            data?.sys.country || ''
          }?fields=name`
        )
        .then((res) => res.data),
  });

  return { data, error, isLoading, country };
};

export default useWeather;
