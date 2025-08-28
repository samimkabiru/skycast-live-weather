import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/weather',
  params: {
    appid: '46b2b9ed8c70a0aca24df4c881f91721',
    units: 'metric',
  },
});
