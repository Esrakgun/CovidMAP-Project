
import { render,screen } from "@testing-library/react";
import Item from "../pages/home/item";

// Not: Normal Şartlarda bir bileşeni kullanırken hangi propları gönderiyorsak test ederkende ,normalde gönderdiğimiz değerler bezer propları içermelidir.Yani benzer propları göndermeliyiz!

test("Gönderilen Proplar Doğru Şekilde Kullanılır", () => {
//  Test Edilecek Componenti Renderla:
render(<Item color="text-gray-500" text="Toplam Test" value="256M" />);

// Test Edilecek Elemanı Çağır:Son Çare İd vermek amacıyla items sayfasında data-testİd="icon" verdik..
// İcon Elementini Al:
const icon = screen.getByTestId("icon");

// Color prop'u ile gelen değer İcon'un class'ın da var mı?
expect(icon).toHaveClass("text-gray-500");

// Text içeriklerini incelerken 2 değer vardır:
// 1)Önce elementi Çağır Ardından Textine Bak:
const h2 = screen.getByRole("heading");
expect(h2).toHaveTextContent("256M");

// 2)Elementi Textine Göre Çağır:
screen.getByText("Toplam Test");

});
