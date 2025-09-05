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

interface FetchForecastDaysResponse {
  location: {
    name: string;
  };
  forecast: {
    forecastday: { day: { avgtemp_c: number } }[];
  };
}

const AverageDailyTemperature = () => {
  const coords = useLocation();

  const { data: dailyForecast } = useQuery({
    queryKey: ['Daily Forecast'],
    queryFn: () =>
      axios
        .get<FetchForecastDaysResponse>(
          `https://api.weatherapi.com/v1/forecast.json?key=5f4b641865a74260b9f30530250509&q=${coords.lat},${coords.lon}&days=7`
        )
        .then((res) => res.data),
  });
  const forecast = dailyForecast?.forecast.forecastday;
  const forecastMap = {
    day1: forecast?.[0].day,
    day2: forecast?.[1].day,
    day3: forecast?.[2].day,
    day4: forecast?.[3].day,
    day5: forecast?.[4].day,
    day6: forecast?.[5].day,
    day7: forecast?.[6].day,
  };

  const data = [
    {
      name: 'Day 1',
      temp: forecastMap.day1?.avgtemp_c,
    },
    {
      name: 'Day 2',
      temp: forecastMap.day2?.avgtemp_c,
    },
    {
      name: 'Day 3',
      temp: forecastMap.day3?.avgtemp_c,
    },
    {
      name: 'Day 4',
      temp: forecastMap.day4?.avgtemp_c,
    },
    {
      name: 'Day 5',
      temp: forecastMap.day5?.avgtemp_c,
    },
    {
      name: 'Day 6',
      temp: forecastMap.day6?.avgtemp_c,
    },
    {
      name: 'Day 7',
      temp: forecastMap.day7?.avgtemp_c,
    },
  ];

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
