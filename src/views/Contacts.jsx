export default function Contacts() {

  const navigateToArticle = () => {
    window.location.href = 'https://thehotbid.com/2019/04/17/sold-rago-sold-that-stunning-circa-1880-punch-ladle-from-gorhams-narragansett-pattern-for-scroll-down-to-see/'; // Add the target URL here
  };

  return (
    <div className="container mt-auto mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center ">Контакти</h1>
      <div className="bg-orange-700 p-11 rounded-lg">
        <p className="mb-2 text-center text-base">Автори: Антония Асенова, Станислав Христов, Радослав Костадинов</p>
        <p className="mb-2 text-center">Държава: България</p>
        <p className="mb-2 text-center">Година: 2024</p>
      </div>
      <div className="flex justify-center items-center">

      <img className="w-60 h-60 " src="https://thehotbid.com/wp-content/uploads/2019/03/1210-3.jpg" alt="logo" />
      <p className=" content-center mb-7" >ПРОДАДЕНО! Черпак за пунш от Gorham’s Narragansett Pattern Commanded</p>
      <button onClick={navigateToArticle} className="bg-yellow-500 cursor-pointer hover:bg-green-700 ml-7 text-red font-bold
       py-4 px-7 rounded transition duration-300 ease-in-out">
        Линк към статията</button>
      </div>
      
    </div>
  );

}