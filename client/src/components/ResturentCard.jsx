import cardImage from "../assets/card.png";

function ResturentCard() {
  return (
    <>
      <div className="w-90 bg-white rounded-2xl flex flex-col items-center justify-center transition-transform duration-350 ease-out hover:scale-105 shadow-xl hover:shadow-2xl">
        <img
          src={cardImage}
          alt="cardimage"
          className="w-full rounded-t-2xl object-cover"
        />
        <div className="flex flex-col justify-center items-center py-3 px-5 gap-3">
          <div className="flex flex-col items-start justify-center gap-3">
            <span className="font-bold text-xl">Under The Mango Tree</span>
            <p className="font-medium text-sm">
              Enjoy the thrill of grill and barbecue at Under The Mango Tree
              restaurant at Jehan Numa Palace, Bhopal. Head here now!
            </p>
            <div className="flex items-start justify-center gap-2">
              <span className="bg-[#E7D9C9] rounded py-0.5 px-1.5 text-sm">
                Indian
              </span>
              <span className="bg-[#E7D9C9] rounded py-0.5 px-1.5 text-sm">
                chineese
              </span>
              <span className="bg-[#E7D9C9] rounded py-0.5 px-1.5 text-sm">
                ittalian
              </span>
            </div>
          </div>

          <hr className="border-gray-300" />

          <button className="bg-orange-700 font-medium w-80 text-white py-2.5 rounded-xl">
            Explore menu
          </button>
        </div>
      </div>
    </>
  );
}

export default ResturentCard;
