
import { render, screen, waitFor } from "@testing-library/react";
import Statistics from './../pages/home/statistic';
import { totalApi } from "../utils/api";
import { totalData } from "../utils/constants";
import millify from "millify";


// _______________________________________________________________________________________________________________________
// Yazıcağımız testler kesinlikle Api isteklerine bağımlı olmamalı, yani Api'dan gelicek cevap testin geçip geçmeme durumunu etkilememelidir.

// Api isteği atan fonksiyonu "MOCK'layıp" Api'dan gelicek cevapları kendimiz belirleyeceğiz. Bu sayede component Api isteklerinden gelen cevabı düzgün bir şekilde ele alıyo mu test etmiş olucaz hemde gerçek Api'la olan bağı tamamen koparacağız.

// _______________________________________________________________________________________________________________________

// Api isteği atan fonksiyonu mock'la ,
// Bu ifade sayesinde test ortamında her totalApi.get() fonksiyonu vağrıldığı zaman Api isteği atılması yerine aşağıda oluşturduğumuz sahte fonksiyon çalışacak.

jest.mock("../utils/api", () => ({
    totalApi: { get: jest.fn() }
}));

// Aşağıya yazılan methodlar sadece ve sadece describe içinde kullanılır:
// describe("statistics component testleri", () => {
// beforeEach(()=>console.log("Her Testin Öncesinde Çalışır."));
// afterEach(() =>console.log("Her Testin Sonrasında Çalışır."));
// beforeAll(()=>console.log("Tüm Testlerin öncesinde BİR kez çalışır."));
// afterAll(()=>console.log("Tüm Testlerin sonrasınnda BİR kez çalışır."));
// });


describe("statistics component testleri", () => {

    // her testin sonrasında mockları temzile
    afterEach(() => {
        jest.clearAllMocks();
    });

    test("Bileşen Renderlandiğinda ekrana Loader Gelir.", () => {

        console.log("test 1 çalıştı");
        // Sahte get Fonksiyonu bize  Promise Döndürsün:
        totalApi.get.mockReturnValue(new Promise(() => { }));

        //Test Edilecek Componenti Renderla: 
        render(<Statistics />);

        //Ekranda Loader Componenti Vardır:
        screen.getByTestId("loader");
    });

    // ____________________________________________________________________________________________________________________

    test("Api'den Hata Gelirse Ekranda Hata Msjı Yazar.", async () => {

        console.log("test 2 çalıştı");
        // Sahte get Fonksiyonu bize Hata Döndürsün:
        totalApi.get.mockRejectedValue(new Error("404 Hatası"));

        //Test Edilecek Componenti Renderla: 
        render(<Statistics />);

        //Ekranda Loader Componenti Vardır:
        await waitFor(() => screen.getByText("Üzgünüz bir sorun oluştu"));
    });

    // ____________________________________________________________________________________________________________________

    test("Api'dan Veri Gelirse Ekrana Veriler Basılır", async () => {

        console.log("test 3 çalıştı");
        // Sahte get Fonksiyonu Çalıştığında Total Veriyi Döndürcek:
        totalApi.get.mockResolvedValue({ data: { data: totalData } });

        // Componenti Renderla
        render(<Statistics />);

        // Api isteğinin Atılmasını Beklicek:
        await waitFor(() => expect(totalApi.get).toHaveBeenCalled());

        // Toplam Vaka Sayısı Ekrana Basıcak:
        screen.getByText(millify(totalData.confirmed));

        // Toplam Vefat Sayısı Ekrana  Basıcak:
        screen.getByText(millify(totalData.deaths));

        // Aktif Vaka Sayısı Ekrana  Basıcak:
        screen.getByText(millify(totalData.active));
    });

});
