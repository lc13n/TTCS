import React from "react";

const collections = [
  {
    id: 1,
    title: "Phones",
    description:
      "Latest smartphones from top brands like Apple, Samsung, and more.",
    image:
      "https://www.apple.com/newsroom/images/2024/09/apple-debuts-iphone-16-pro-and-iphone-16-pro-max/article/Apple-iPhone-16-Pro-finish-lineup-240909_big.jpg.large.jpg",
    buttonText: "Shop Now",
  },
  {
    id: 2,
    title: "Computers",
    description: "Explore powerful laptops, desktops, and accessories.",
    image: "",
    buttonText: "Shop Now",
  },
  {
    id: 3,
    title: "SmartWatch",
    description:
      "Smart wearables to track your health and connect with the world.",
    image: "",
    buttonText: "Shop Now",
  },
  {
    id: 4,
    title: "Camera",
    description: "High-quality cameras for creators and professionals.",
    image: "",
    buttonText: "Shop Now",
  },
];

const NewArrival = () => {
  return (
    <div className="py-8">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-1 h-6 bg-red-500"></div>
        <h2 className="text-2xl font-semibold">Featured</h2>
      </div>

      <h1 className="text-3xl font-bold mb-8">New Arrival</h1>

      <div className="grid grid-cols-2 gap-6">
        {/* Large card - Phones */}
        <div className="row-span-2 bg-black text-white rounded-lg overflow-hidden">
          <div className="p-8 h-full flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-4">
                {collections[0].title}
              </h3>
              <p className="text-gray-300 mb-6">{collections[0].description}</p>
            </div>
            <div>
              <button className="px-6 py-2 bg-transparent border-2 border-white text-white rounded-md hover:bg-white hover:text-black transition-colors">
                {collections[0].buttonText}
              </button>
            </div>
          </div>
          <img
            src={collections[0].image}
            alt={collections[0].title}
            className="w-full h-[280px] object-cover"
          />
        </div>

        {/* Right column */}
        <div className="grid grid-rows-2 gap-6">
          {/* Computers */}
          <div className="bg-black text-white rounded-lg overflow-hidden">
            <div className="p-6 flex flex-col justify-between h-full">
              <div>
                <h3 className="text-xl font-bold mb-2">
                  {collections[1].title}
                </h3>
                <p className="text-sm text-gray-300 mb-4">
                  {collections[1].description}
                </p>
              </div>
              <button className="w-fit px-4 py-2 bg-transparent border border-white text-white rounded-md hover:bg-white hover:text-black transition-colors">
                {collections[1].buttonText}
              </button>
            </div>
            <img
              src={collections[1].image}
              alt={collections[1].title}
              className="w-full h-[130px] object-cover"
            />
          </div>

          {/* SmartWatch & Camera */}
          <div className="grid grid-cols-2 gap-6">
            {/* SmartWatch */}
            <div className="bg-black text-white rounded-lg overflow-hidden p-4">
              <h3 className="text-lg font-bold mb-2">{collections[2].title}</h3>
              <p className="text-xs text-gray-300 mb-3">
                {collections[2].description}
              </p>
              <button className="text-sm px-3 py-1 bg-transparent border border-white text-white rounded-md hover:bg-white hover:text-black transition-colors">
                {collections[2].buttonText}
              </button>
              <img
                src={collections[2].image}
                alt={collections[2].title}
                className="w-full h-[110px] object-cover mt-2"
              />
            </div>

            {/* Camera */}
            <div className="bg-black text-white rounded-lg overflow-hidden p-4">
              <h3 className="text-lg font-bold mb-2">{collections[3].title}</h3>
              <p className="text-xs text-gray-300 mb-3">
                {collections[3].description}
              </p>
              <button className="text-sm px-3 py-1 bg-transparent border border-white text-white rounded-md hover:bg-white hover:text-black transition-colors">
                {collections[3].buttonText}
              </button>
              <img
                src={collections[3].image}
                alt={collections[3].title}
                className="w-full h-[110px] object-cover mt-2"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewArrival;
