import React from "react";
import { FaHeart, FaStar } from "react-icons/fa";

const wishlist = [
  { id: 1, name: "Spicy Grill", category: "Indian", rating: 4.8, image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&q=80" },
  { id: 2, name: "Ocean Sushi", category: "Japanese", rating: 4.9, image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500&q=80" },
  { id: 3, name: "Pasta House", category: "Italian", rating: 4.5, image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=500&q=80" },
];

const WishList = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-(--border-color) p-8">
      <h2 className="text-2xl font-bold text-(--text-color) mb-6">My Wishlist</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist.map((item) => (
          <div key={item.id} className="group relative rounded-2xl overflow-hidden border border-(--border-color) hover:shadow-lg transition-all duration-300">
            <div className="h-48 overflow-hidden">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            
            <button className="absolute top-4 right-4 bg-white/90 p-2 rounded-full text-red-500 hover:bg-red-500 hover:text-white transition">
              <FaHeart size={18} />
            </button>
            
            <div className="p-5">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-bold text-(--text-color)">{item.name}</h3>
                <span className="flex items-center gap-1 text-sm font-medium bg-green-100 text-green-700 px-2 py-1 rounded-md">
                  <FaStar size={12} /> {item.rating}
                </span>
              </div>
              <p className="text-(--text-light) text-sm">{item.category}</p>
              
              <button className="mt-4 w-full bg-(--primary-color) text-white font-medium py-2 rounded-xl hover:bg-(--secondary-color) transition">
                Order Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishList;
