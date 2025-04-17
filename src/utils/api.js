import axios from "axios";

const totalApi = axios.create({
    baseURL:"https://covid-19-statistics.p.rapidapi.com",
    headers: {
        'x-rapidapi-key': import.meta.env.VITE_API_KEY,
        'x-rapidapi-host': 'covid-19-statistics.p.rapidapi.com'
      },
});


const detailApi = axios.create({
    baseURL:"https://covid-193.p.rapidapi.com",
    headers: {
        'x-rapidapi-key':  import.meta.env.VITE_API_KEY,
        'x-rapidapi-host': 'covid-193.p.rapidapi.com'
      },
});



const countryApi = axios.create({
  baseURL:"https://restcountries.com/v3.1",
});


export { totalApi, detailApi ,countryApi };