import {
  FaTemperatureArrowDown,
  FaTemperatureArrowUp,
  FaTemperatureLow,
} from 'react-icons/fa6';
import { WiHumidity } from 'react-icons/wi';
import useWeather from '../hooks/useWeather';

const CountryClimateDetails = () => {
  const { data, error, isLoading, country } = useWeather();

  const climateCondition = data?.weather[0];
  const weatherData = [
    {
      property: 'Feels like',
      value: data?.main.feels_like.toString(),
      isInDegreeCelcius: true,
      icon: <FaTemperatureLow className="w-full h-full" />,
    },
    {
      property: 'Temp min',
      value: data?.main.temp_min.toString(),
      isInDegreeCelcius: true,
      icon: <FaTemperatureArrowDown className="w-full h-full" />,
    },
    {
      property: 'Temp max',
      value: data?.main.temp_max.toString(),
      isInDegreeCelcius: true,
      icon: <FaTemperatureArrowUp className="w-full h-full" />,
    },
    {
      property: 'Humidity',
      value: data?.main.humidity.toString(),
      isInDegreeCelcius: false,
      icon: <WiHumidity className="w-full h-full" />,
    },
  ];

  if (error) return <p className="text-red-600">{error.message}</p>;

  if (isLoading)
    return (
      <div className="w-12 h-12 border-4 border-blue-950 border-t-transparent rounded-full animate-spin m-6" />
    );

  return (
    <div className="h-full px-7 py-8">
      <h1 className="text-white text-3xl">{data?.name}</h1>
      <p className=" font-semibold text-gray-400">{country?.name.common}</p>
      <div className="mb-10 border-[0_0_2px_0] border-gray-600">
        <img
          src={`https://openweathermap.org/img/wn/${climateCondition?.icon}@2x.png`}
          alt={climateCondition?.description}
        />
        <div className="flex justify-between pb-6">
          <p className="text-white text-4xl">{data?.main.temp}&deg;C</p>
          <p className="text-2xl text-gray-400 self-center">
            {climateCondition?.description}
          </p>
        </div>
      </div>

      {weatherData.map((data) => (
        <div
          key={data.property}
          className="bg-gradient-to-br from-[#274369] to-[#2B4B85] backdrop-blur-xs text-white rounded-2xl p-6 shadow my-5 flex justify-start ring ring-[#50648b]"
        >
          <span className="text-gray-400 mr-4 text-2xl">{data.icon}</span>
          <span>
            <p className="text-[17px]">{data.property}:</p>{' '}
            <span className="text-gray-400 ">
              {data.value}
              {data.isInDegreeCelcius ? <span>&deg;C</span> : '%'}
            </span>
          </span>
        </div>
      ))}
    </div>
  );
};

export default CountryClimateDetails;
