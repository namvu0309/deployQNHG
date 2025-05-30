import React from "react";

// import cb1 from "@assets/admin/images/profile/1.png";
// import cb2 from "@assets/admin/images/profile/2.png";
// import cb3 from "@assets/admin/images/profile/3.png";
// import cb4 from "@assets/admin/images/profile/4.png";

const combos = [
  {
    id: 1,
    title: "COMBO 1",
    description: "Đầy đủ món Việt...",
    priceText: "1038K",
    price: "1,038,000",
    

  },
  {
    id: 2,
    title: "COMBO 2",
    description: "Hương vị cuốn hút...",
    priceText: "1044K",
    price: "1,044,000",
   
  },
  {
    id: 3,
    title: "COMBO 3",
    description: "Nậm chân hấp dẫn...",
    priceText: "1121K",
    price: "1,121,000",
   
  },
  {
    id: 4,
    title: "COMBO 4",
    description: "Đặc trưng vùng miền...",
    priceText: "1309K",
    price: "1,309,000",
  
  },
];

const Profile = () => {
  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6 text-green-800">Combo</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {combos.map((combo) => (
          <div
            key={combo.id}
            className="bg-white rounded-xl shadow hover:shadow-md transition"
          >
            <div className="relative h-64 rounded-t-xl overflow-hidden">
              <img
                src={combo.image}
                alt={combo.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 bg-green-900 text-yellow-300 text-sm font-bold px-3 py-1">
                ★ {combo.title}
              </div>
            </div>
            <div className="p-4">
              <p className="text-gray-700 text-sm line-clamp-2 mb-2">
                {combo.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm text-gray-800">{combo.title}</span>
                <span className="text-right text-gray-600 text-sm">{combo.price}</span>
              </div>
              <button className="mt-2 px-3 py-1 text-xs text-white bg-green-600 rounded hover:bg-green-700">
                Đặt
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
