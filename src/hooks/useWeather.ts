import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import apiClient from '../services/api-client';
import useSearchStore from '../stores/searchStore';
import useLocation from './useLocation';

interface CountryClimate {
  name: string;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  wind: {
    speed: number;
  };
  clouds: {
    all: number;
  };
  weather: [{ main: string; icon: string; description: string }];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
    pressure: number;
  };
}

interface CountryNameResponse {
  name: { common: string };
}

const useWeather = () => {
  const place = useSearchStore((s) => s.searchText);
  const coords = useLocation();
  const query = place ? `?q=${place}` : `?lat=${coords.lat}&lon=${coords.lon}`;

  const { data, error, isLoading } = useQuery({
    queryKey: ['climate', place],
    queryFn: () => apiClient.get<CountryClimate>(query).then((res) => res.data),
  });

  const { data: country } = useQuery({
    queryKey: ['country', place],
    queryFn: () =>
      axios
        .get<CountryNameResponse>(
          `https://restcountries.com/v3.1/alpha/${
            data?.sys.country || ''
          }?fields=name`
        )
        .then((res) => res.data),
  });

  return { data, error, isLoading, country };
};

export default useWeather;
