import React, { useState } from "react";
import { images } from "../model/pics";

// Import images correctly for Vite/React
import jeans1 from "../assets/jeans1.jpeg";
import jeans2 from "../assets/jeans2.jpeg";

// Map of actual image imports to replace string paths
const imageImports = {
  "../assets/jeans1.jpeg": jeans1,
  "../assets/jeans2.jpeg": jeans2,
  // Add other images as needed
};

const Closet = () => {
  const [activeTab, setActiveTab] = useState("Jeans");

  const closetItems = [
    "Jeans",
    "Shorts",
    "Shirts",
    "Tops",
    "Longsleeves",
    "Dresses",
    "Hoodies",
    "Shoes",
    "Accessories",
  ];

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // Helper function to get the correct image source
  const getImageSrc = (imagePath) => {
    // If we have a direct import, use it
    if (imageImports[imagePath]) {
      return imageImports[imagePath];
    }

    // Otherwise try to use the path directly (for public folder images)
    try {
      // For images in the public folder
      return new URL(`/public/${imagePath}`, import.meta.url).href;
    } catch (error) {
      console.error("Error loading image:", imagePath, error);
      return "";
    }
  };

  return (
    <div className="max-w-5xl mx-auto text-wrap p-4 flex flex-row justify-between text-center space-x-20">
      <div>
        <h2 className="text-2xl font-bold mb-4">Your Closet</h2>
        <div className="grid grid-cols-2 gap-4">
          {closetItems.map((item, index) => (
            <button
              key={index}
              className={`text-2xl ${
                activeTab === item ? "bg-pink-300" : "bg-pink-200"
              } px-12 py-10 text-center rounded-2xl hover:bg-pink-300 transition-colors`}
              onClick={() => handleTabClick(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">Items</h2>
        <div className="flex flex-col gap-4">
          {/* Map through the images based on the active tab */}
          {images[activeTab] &&
            Object.keys(images[activeTab]).map((key) => {
              const imagePath = images[activeTab][key].image;
              const imageSrc = getImageSrc(imagePath);
              const imageName = imagePath.split("/").pop().split(".")[0];

              return (
                <div key={key} className="max-w-md p-4 rounded-lg">
                  {imageSrc ? (
                    <>
                      <img
                        src={imageSrc}
                        alt={imageName}
                        className="w-full h-auto rounded-lg"
                      />
                      <p className="text-center mt-2">{imageName}</p>
                    </>
                  ) : (
                    <p className="text-center text-gray-500">Image not found</p>
                  )}
                </div>
              );
            })}
          {/* Add a message if no items are available */}
          {(!images[activeTab] ||
            Object.keys(images[activeTab]).length === 0) && (
            <div className="col-span-2 text-center text-gray-500">
              No items available
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Closet;
