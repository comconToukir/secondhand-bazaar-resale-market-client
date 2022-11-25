import React from "react";

const ProductCard = ({
  productData: {
    productName,
    image,
    askingPrice,
    retailPrice,
    productCondition,
    description,
    contact,
    location,
  },
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px,1fr]">
      <div>
        <img src={image} className="md:h-48 w-full" alt="" />
      </div>
      <div className="px-3 flex flex-col">
        <h2 className="text-2xl font-medium">{productName}</h2>
        <div className="grid grid-cols-2">
          <div>
            <p>Asking Price: ${askingPrice}</p>
            <p>Retail Price Price: ${retailPrice}</p>
            <p>Condition: {productCondition}</p>
          </div>
          <div>
            <p>Contact Number: {contact}</p>
            <p>Location: {location}</p>
          </div>
        </div>
        <div className="flex-grow">
          <p>Description: {description}</p>
        </div>
        <div className="flex justify-end">
          <button className="btn btn-secondary">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
