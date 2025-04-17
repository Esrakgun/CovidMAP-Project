import configureStore from "redux-mock-store";
import { thunk } from "redux-thunk";
import { mockData } from "../utils/constants";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import Content from "../pages/detail/content";

const mockStore = configureStore([thunk]);

it("Store Yüklenme Durumundayken Ekrana Loader Gelir", () => {
  const store = mockStore({ isLoading: true, error: null, data: null });

  render(
    <Provider store={store}>
      <Content />
    </Provider>
  );

  screen.getAllByTestId("content-loader");
});

it("Store Hata Durumundayken Ekrana Error Gelir", () => {
  const store = mockStore({ isLoading: false, error: "İnternetiz çok yavaş", data: null });

  render(
    <Provider store={store}>
      <Content />
    </Provider>
  );

  screen.getByTestId("error");
});

it("Store Veri Geldiğinde Nesnedeki Her Bir Değer İçin Ekrana Kart Basılır", () => {
  const store = mockStore({ isLoading: false, error: null, data: mockData });

  render(
    <Provider store={store}>
      <Content />
    </Provider>
  );

  // data nesnesini diziye çevir
  const arr = Object.entries(mockData).filter(([key]) => key !== "flag");

  // dizideki her değer için kart içerisinde bilgiler basılır
  arr.forEach((item) => {
    // ekrana item'ın key değeri basılıyor mu?
    screen.getByText(item[0]);

    // ekrana item'ın value değeri basılıyor mu?
    screen.getByText(item[1]);
  });
});