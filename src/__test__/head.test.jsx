import { render, screen } from "@testing-library/react";
import configureStore from "redux-mock-store";
import { thunk } from "redux-thunk";
import Head from "../pages/detail/head";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { mockData } from "../utils/constants";

// import { configureStore } from '@reduxjs/toolkit'; bu değil mock olanı projeye  yukledık ve kullanıyoruz.

// Redux kullanan bileşenler için sahete store'lar oluşturmamızı sağlayacak fonksiyon
const mockStore = configureStore([thunk]);


it("Store yüklenme durumundayken ekrana loader basılır", () => {

    // Yüklenme durumunda Sahte bir store oluştur.
const store = mockStore({isLoading :true ,error :null ,data :null});

    // Bileşeni Renderla:
    render(
        <Provider store={store}>
          <BrowserRouter>
            <Head />
          </BrowserRouter>
        </Provider>
      );

    // Ekranda Loader var mı?
  screen.getByTestId("head-loader");

});

// __________________________________________________________

it("Store'a veri geldiğinde ekrana ülke ve bayrak verisi basılır.", () => {

    // Yüklenme durumunda Sahte bir store oluştur.
const store =mockStore({isLoading :false ,error :null ,data :null})

    // Bileşeni Renderla
    render(
        <Provider store={store}>
          <BrowserRouter>
            <Head />
          </BrowserRouter>
        </Provider>
      );

    // Ekranda Loader yok mu?
    const element =screen.queryByTestId("head-loader");
    expect(element).toBeNull();
     
});

// ___________________________________________________________

it("Store'da yüklenme bittiğinde Loader ekrandan gider", () => {
    // Sahte store oluştur
const store =mockStore({isLoading: false, error: null, data: mockData});
    // Bileşeni Renderla
    render(
        <Provider store={store}>
          <BrowserRouter>
            <Head />
          </BrowserRouter>
        </Provider>
      );
    // Ülke ismi ekrana geliyor mu?
    screen.getByRole("heading", { name: mockData.country });

    // resim ekranda mı?
    const img =screen.getByAltText(mockData.flag.alt);
    expect(img).toHaveAttribute("src", mockData.flag.png);

});
