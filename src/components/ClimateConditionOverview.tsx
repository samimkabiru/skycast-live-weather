import { BsWater } from 'react-icons/bs';
import { FaCloud } from 'react-icons/fa6';
import { LuSunMedium, LuWind } from 'react-icons/lu';
import { WiSunset } from 'react-icons/wi';
import useWeather from '../hooks/useWeather';

const ClimateConditionOverview = () => {
  const { data } = useWeather();
  const timePeriord = data?.sys;
  const sunriseDate = new Date(timePeriord?.sunrise! * 1000);
  const sunsetDate = new Date(timePeriord?.sunset! * 1000);
  const climateConditionOverview = [
    {
      heading: 'wind speed',
      value: data?.wind.speed.toString() + 'km/h',
      icon: <LuWind />,
    },
    {
      heading: 'pressure',
      value: data?.main.pressure.toString() + ' ' + 'hpa',
      icon: <BsWater />,
    },
    {
      heading: 'cloudiness',
      value: data?.clouds.all.toString() + '%',
      icon: <FaCloud />,
    },
    {
      heading: 'sunrise',
      value: sunriseDate.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      icon: <LuSunMedium />,
    },
    {
      heading: 'sunset',
      value: sunsetDate.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      icon: <WiSunset />,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 md:max-w-xl mx-auto lg:max-w-full">
      {climateConditionOverview.map(({ heading, icon, value }) => (
        <div
          key={heading}
          className="bg-gray-50 my-5 py-4 px-5 rounded-2xl flex flex-wrap"
        >
          <span className="text-blue-800 text-3xl pr-5">{icon}</span>
          <div>
            <h3 className="text-gray-500 capitalize">{heading}</h3>
            <p className="text-[19px] sm:text-2xl font-semibold">{value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClimateConditionOverview;
