
const Error = ({ info, refetch }) => {
  return (
    <div data-testid="error" className="col-span-3 my-20 flex flex-col justify-center  text-center gap-10">
      <div className="bg-red-400 p-5 rounded-md">
        <p>"Üzgünüz Bir Sorun Oluştu."</p>
        <p>{info}</p>
      </div>
      <button
        onClick={refetch}
        className="border mt-10 text-white p-2 rounded-md transition-transform duration-300 ease-in-out bg-purple-500 hover:bg-purple-700 hover:scale-105 shadow-lg">
        Tekrar Dene
      </button>
    </div>
  );
};

export default Error;
// _________________________________________________________________________________________________________________
//tekrar dene butonuna anasayfa yonlendırmesı yaptık navıgate ıle ama testler ozuldu eskı halıne cevırdım :
// import { useNavigate } from 'react-router-dom';

// const Error = ({ info, refetch }) => {
//   const navigate = useNavigate();

//   const handleRedirect = () => {
//     navigate('/'); // Ana sayfaya yönlendir
//   };

//   return (
//     <div data-testid="error" className="col-span-3 my-20 flex flex-col justify-center text-center gap-10">
//       <div className="bg-red-400 p-5 rounded-md">
//         <p>"Üzgünüz Bir Sorun Oluştu."</p>
//         <p>{info}</p>
//       </div>

//       <button
//         onClick={() => { refetch(); handleRedirect(); }}
//         className="border mt-10 text-white p-2 rounded-md transition-transform duration-300 ease-in-out bg-purple-500 hover:bg-purple-700 hover:scale-105 shadow-lg"
//       >
//         Tekrar Dene
//       </button>
//     </div>
//   );
// };

// export default Error;














