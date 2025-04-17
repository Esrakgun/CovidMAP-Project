import { createAsyncThunk, current } from "@reduxjs/toolkit";
import { countryApi, detailApi } from "../utils/api";


export const getDetails = createAsyncThunk("covid/getDetails", async (country) => {

  // Ülke Covid Verilerini Alacak ve Api İsteği Atıcam:
  //* const res1 =await detailApi.get("/statistics" , {params:{country}});

  const req1 = detailApi.get("/statistics", { params: { country } });
  // console.log(res1);


  // Ülke Detay Verilerini Alacak ve Api İsteği Atıcam:
  //* const res2 = await countryApi.get(`/name/${country}`);
  const req2 = countryApi.get(`/name/${country}`);
  // console.log(res2);


  // Todo:İki Api'a isteğinide aynı anda atması için yani Paralel atması için:
  const [res1, res2] = await Promise.all([req1, req2]);

  // console.log(res1, res2);

  // İhtiyacımız Olan Verileri Alalım:
  const covid = res1.data.response[0];
  const countryData = res2.data[0];

  // console.log(covid ,countryData);

  // function formatDate(date) {
  //   const options = { year: 'numeric', month: 'long', day: 'numeric' };
  //   const formattedDate = new Date(date).toLocaleDateString('tr-TR', options);
  //   return formattedDate;
  // }




  // Tarihi MM-DD-YYYY formatında almak için replace kullanma
  function formatDate(date) {
    const [year, month, day] = date.split('-');
    return `${month}-${day}-${year}`; // "04-17-2025"
  }
  const data = {
    continent: covid.continent,
    country: covid.country,
    capital: countryData.capital[0],
    currency: Object.values(countryData.currencies)[0].name,
    // date: covid.day,
    // date: formatDate(covid.day), // Türkçe formatta tarih
    date: formatDate(covid.day), // Formatlanmış tarih
    cases: covid.cases.total,
    deaths: covid.deaths.total,
    tests: covid.tests.total,
    population: countryData.population,
    flag: countryData.flags,
  };

  // console.log(data);


  // Payload' return Edicem:

  return data;

});