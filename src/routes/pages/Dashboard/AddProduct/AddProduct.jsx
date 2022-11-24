import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import AuthButton from "../../../../components/AuthButton/AuthButton";

const AddProduct = () => {
  const imgBBKey = process.env.REACT_APP_imgbb_key;
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);

    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);

    // upload image to imgbb and receive url and send it database along with other data
    fetch(`https://api.imgbb.com/1/upload?key=${imgBBKey}`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData.success) {
          console.log(imgData);
          console.log(imgData.data.url);

          data.image = imgData.data.url;
          data.isSold = false;

          fetch('http://localhost:5000/add-product', {
            method: 'POST',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify(data)
          })
          .then(res => res.json())
          .then(data => {
            console.log(data)
            if (data.insertedId) {
              toast.success("Your product was added successfully");
              navigate('/dashboard/my-products');
            }
          })
        }
      });
  };

  return (
    <div>
      <div>
        <h1 className="text-3xl font-semibold my-5 text-center">
          Add Your Product
        </h1>
        <form className="" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control max-w-lg mx-auto px-8">
            <label className="label">
              {" "}
              <span className="label-text">Product Image</span>
            </label>
            <input
              type="file"
              {...register("image", {
                required: true,
              })}
              className="file-input file-input-bordered file-input-md w-full rounded-sm"
            />
            {errors?.image?.type === "required" && (
              <p className="text-red-500 text-xs">Product Image is Required</p>
            )}
            <label className="label">
              <span className="label-text">Product Name</span>
            </label>
            <input
              type="text"
              placeholder="Name"
              className="input input-bordered w-full h-9 rounded-sm placeholder:text-sm placeholder:text-gray-500"
              {...register("productName", {
                required: true,
                maxLength: 48,
              })}
            />
            {errors?.productName?.type === "required" && (
              <p className="text-red-500 text-xs">Product Name is required</p>
            )}
            {errors?.productName?.type === "maxLength" && (
              <p className="text-red-500 text-xs">Product Name must be less than 48 characters</p>
            )}

            <label className="label">
              <span className="label-text">Your Asking Price</span>
            </label>
            <input
              type="number"
              placeholder="Price"
              className="input input-bordered w-full h-9 rounded-sm placeholder:text-sm placeholder:text-gray-500"
              {...register("askingPrice", {
                required: true,
              })}
            />
            {errors?.askingPrice?.type === "required" && (
              <p className="text-red-500 text-xs">Asking Price is required</p>
            )}

            <label className="label">
              <span className="label-text">Product Retail Price</span>
            </label>
            <input
              type="number"
              placeholder="Retail Price"
              className="input input-bordered w-full h-9 rounded-sm placeholder:text-sm placeholder:text-gray-500"
              {...register("retailPrice", {
                required: true,
              })}
            />
            {errors?.retailPrice?.type === "required" && (
              <p className="text-red-500 text-xs">Retail Price is required</p>
            )}

            <label className="label">
              <span className="label-text">Product Condition</span>
            </label>
            <select
              className="select select-bordered"
              {...register("productCondition", {
                required: true,
              })}
            >
              <option value="excellent">Excellent</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
            </select>
            {errors?.productCondition?.type === "required" && (
              <p className="text-red-500 text-xs">
                Product Condition is required
              </p>
            )}

            <label className="label">
              <span className="label-text">Purchase Year</span>
            </label>
            <input
              type="number"
              placeholder="YYYY"
              className="input input-bordered w-full h-9 rounded-sm placeholder:text-sm placeholder:text-gray-500"
              {...register("retailPrice", {
                required: true,
              })}
            />
            {errors?.retailPrice?.type === "required" && (
              <p className="text-red-500 text-xs">Retail Price is required</p>
            )}

            <label className="label">
              <span className="label-text">Product Description</span>
            </label>
            <textarea
              type="text"
              placeholder="Write something about the product"
              className="input input-bordered w-full h-24 py-2 rounded-sm placeholder:text-sm placeholder:text-gray-500"
              {...register("description", {
                maxLength: 300,
                // required: true,
              })}
            />
            {errors?.description?.type === "maxLength" && (
              <p className="text-red-500 text-xs">Description must be less than 300 characters</p>
            )}

            <label className="label">
              <span className="label-text">Your Contact Number</span>
            </label>
            <input
              type="tel"
              placeholder="contact number"
              className="input input-bordered w-full h-9 rounded-sm placeholder:text-sm placeholder:text-gray-500"
              {...register("contact", {
                required: true,
              })}
            />
            {errors?.contact?.type === "required" && (
              <p className="text-red-500 text-xs">Contact Number is required</p>
            )}

            <label className="label">
              <span className="label-text">Your Location</span>
            </label>
            <input
              type="text"
              placeholder="location"
              className="input input-bordered w-full h-9 rounded-sm placeholder:text-sm placeholder:text-gray-500"
              {...register("location", {
                required: true,
              })}
            />
            {errors?.location?.type === "required" && (
              <p className="text-red-500 text-xs">Location is required</p>
            )}

            <button className="btn btn-outline mt-5 mx-auto">
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
