
import { fireEvent, render, screen } from "@testing-library/react";
import Error from "../components/error";

it("Error Component'ı Hata Mesajını Gösterir", () => {
  // Test Edilebilir Sahte Bir Fonksiyon Oluştur
  const mockFn = jest.fn();

  //Bileşeni Renderla
  render(<Error info="İnternetiz Çok Yavaş" refetch={mockFn} />);

  // Hata Mesajı Ekranda Mı?
  screen.getByText("İnternetiz Çok Yavaş");

  //Tekrar Dene Butonunu Al
  const button = screen.getByRole("button", { name: "Tekrar Dene" });

  // Butona Tıkla
  fireEvent.click(button);

  // Fonksiyon Çağrıldı Mı?
  expect(mockFn).toHaveBeenCalled();
  
});