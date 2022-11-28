import React from "react";
import toast from "react-hot-toast";
import { FaRegCheckCircle } from "react-icons/fa";

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
    purchaseYear,
    contact,
    location,
    sellerData,
  },
}) => {
  const [{ email, isVerified }] = sellerData;

  const reportProduct = () => {
    fetch(`http://localhost:5000/reported-product/`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ id: _id }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          toast.success(`The item has been reported.
        Thank you for Your Concern.`);
        }
      })
      .catch((error) => {
        toast.error("Something unexpected happened. Please try again.");
        console.error(error);
      });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px,1fr] gap-2 h-min border p-2">
      <div className="group">
        <img
          src={image}
          className="md:h-60 max-h-72 w-full object-cover group"
          alt=""
        />
      </div>
      <div className="px-2 flex flex-col">
        <h2 className="text-2xl font-bold mb-3">{productName}</h2>
        <div className="flex items-center gap-2">
          <p className="text-sm">
            <span className="font-semibold">Seller: </span>
            {email}
          </p>
          <span className="font-semibold"></span>
          {isVerified ? (
            <span
              className="text-blue-500 tooltip tooltip-right"
              data-tip="Verified"
            >
              <FaRegCheckCircle />
            </span>
          ) : null}
        </div>
        <div className="grid grid-cols-2">
          <div>
            <p className="text-sm">
              <span className="font-semibold">Asking Price: </span>${askingPrice}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Retail Price: </span>${retailPrice}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Condition: </span>
              {productCondition}
            </p>
          </div>
          <div>
            <p className="text-sm">
              <span className="font-semibold">Purchase Year: </span>
              {purchaseYear}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Contact Number: </span>
              {contact}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Location: </span>
              {location}
            </p>
          </div>
        </div>
        <div className="flex-grow my-3">
        <p><span className="font-semibold">Description: </span>{description}</p>
        </div>
        <div className="flex justify-between py-2">
          <button className="btn btn-warning btn-sm" onClick={reportProduct}>
            Report
          </button>
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
