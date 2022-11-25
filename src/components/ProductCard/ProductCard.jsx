import React from "react";

const ProductCard = ({
  openBookModal,
  productData,
  productData: {
    _id,
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
    <div className="grid grid-cols-1 md:grid-cols-[300px,1fr] h-min shadow-md border p-2">
      <div>
        <img
          src={image}
          className="md:h-60 max-h-72 w-full object-cover"
          alt=""
        />
      </div>
      <div className="px-2 flex flex-col">
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
        <div className="flex justify-end py-2">
          <label
            onClick={() => openBookModal(productData)}
            htmlFor="confirmation-modal"
            className="btn btn-sm btn-primary"
          >
            Buy now
          </label>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
