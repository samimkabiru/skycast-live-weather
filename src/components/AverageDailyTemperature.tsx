import useLocation from '@/hooks/useLocation';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import useSearchStore from '@/stores/searchStore';

interface FetchForecastDaysResponse {
  location: {
    name: string;
  };
  forecast: {
    forecastday: { date: string; day: { avgtemp_c: number } }[];
  };
}

const AverageDailyTemperature = () => {
  const coords = useLocation();
  const searchText = useSearchStore((s) => s.searchText);
  const locationQuery = searchText ? searchText : `${coords.lat},${coords.lon}`;

  const { data: dailyForecast } = useQuery({
    queryKey: ['Daily Forecast', searchText],
    queryFn: () =>
      axios
        .get<FetchForecastDaysResponse>(
          `https://api.weatherapi.com/v1/forecast.json?key=5f4b641865a74260b9f30530250509&q=${locationQuery}&days=7`
        )
        .then((res) => res.data),
  });
  const forecast = dailyForecast?.forecast.forecastday;
  const data = forecast?.map((forecast) => ({
    name: new Date(forecast.date).toLocaleDateString(navigator.language, {
      month: 'short',
      day: 'numeric',
    }),
    temp: forecast.day.avgtemp_c,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          7-Day Average Daily Temperature in {dailyForecast?.location.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart
              width={500}
              height={200}
              data={data}
              syncId="anyId"
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="temp"
                stroke="#8884d8"
                fill="#8884d8"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default AverageDailyTemperature;
