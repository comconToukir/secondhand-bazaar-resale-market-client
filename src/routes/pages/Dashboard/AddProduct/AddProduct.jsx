import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import AuthButton from "../../../../components/AuthButton/AuthButton";
import { UserContext } from "./../../../../contexts/UserContext/UserContext";
import SectionHeader from "./../../../../components/SectionHeader/SectionHeader";

const AddProduct = () => {
  const imgBBKey = process.env.REACT_APP_imgbb_key;
  const navigate = useNavigate();

  const [isAdding, setIsAdding] = useState(false);
  const { user } = useContext(UserContext);

  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      fetch(`https://secondhand-bazaar-server.vercel.app/get-categories`).then(
        (res) => res.json()
      ),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setIsAdding(true);

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
          data.sellerEmail = user?.email;

          fetch("https://secondhand-bazaar-server.vercel.app/add-product", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(data),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.insertedId) {
                toast.success("Your product was added successfully");
                navigate("/dashboard/my-products");
                setIsAdding(false);
              }
            })
            .catch((error) => {
              setIsAdding(false);
              toast.error(
                "Sorry! Something unexpected happened. Please try again."
              );
              console.log(error);
            });
        }
      });
  };

  return (
    <div>
      <div className=" m-4">
        <SectionHeader>
          <span className="px-4 py-1 bg-gray-800 text-2xl text-white">
            Add Your Product
          </span>
        </SectionHeader>
        <form className="" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control max-w-lg mx-auto px-8">
            <label className="label">
              {" "}
              <span className="label-text">Product Image</span>
            </label>
            <input
              type="file"
              aria-invalid={errors.image ? "true" : "false"}
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
              aria-invalid={errors.productName ? "true" : "false"}
              {...register("productName", {
                required: true,
                maxLength: 48,
              })}
            />
            {errors?.productName?.type === "required" && (
              <p className="text-red-500 text-xs">Product Name is required</p>
            )}
            {errors?.productName?.type === "maxLength" && (
              <p className="text-red-500 text-xs">
                Product Name must be less than 48 characters
              </p>
            )}

            <label className="label">
              <span className="label-text">Your Asking Price</span>
            </label>
            <input
              type="number"
              placeholder="Price"
              className="input input-bordered w-full h-9 rounded-sm placeholder:text-sm placeholder:text-gray-500"
              aria-invalid={errors.askingPrice ? "true" : "false"}
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
              aria-invalid={errors.retailPrice ? "true" : "false"}
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
              aria-invalid={errors.productCondition ? "true" : "false"}
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
              <span className="label-text">Product Category</span>
            </label>
            <select
              className="select select-bordered"
              aria-invalid={errors.categoryId ? "true" : "false"}
              disabled={isLoading}
              {...register("categoryId", {
                required: true,
              })}
            >
              {categories.map((ct) => (
                <option key={ct._id} value={ct._id}>
                  {ct.categoryName}
                </option>
              ))}
            </select>
            {errors?.categoryId?.type === "required" && (
              <p className="text-red-500 text-xs">
                Product category is required
              </p>
            )}

            <label className="label">
              <span className="label-text">Purchase Year</span>
            </label>
            <input
              type="number"
              placeholder="YYYY"
              className="input input-bordered w-full h-9 rounded-sm placeholder:text-sm placeholder:text-gray-500"
              aria-invalid={errors.purchaseYear ? "true" : "false"}
              {...register("purchaseYear", {
                required: true,
              })}
            />
            {errors?.purchaseYear?.type === "required" && (
              <p className="text-red-500 text-xs">Purchase year is required</p>
            )}

            <label className="label">
              <span className="label-text">Product Description</span>
            </label>
            <textarea
              type="text"
              placeholder="Write something about the product"
              className="input input-bordered w-full h-24 py-2 rounded-sm placeholder:text-sm placeholder:text-gray-500"
              aria-invalid={errors.description ? "true" : "false"}
              {...register("description", {
                maxLength: 500,
                // required: true,
              })}
            />
            {errors?.description?.type === "maxLength" && (
              <p className="text-red-500 text-xs">
                Description must be less than 500 characters
              </p>
            )}

            <label className="label">
              <span className="label-text">Your Contact Number</span>
            </label>
            <input
              type="tel"
              placeholder="contact number"
              className="input input-bordered w-full h-9 rounded-sm placeholder:text-sm placeholder:text-gray-500"
              aria-invalid={errors.contact ? "true" : "false"}
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
              aria-invalid={errors.location ? "true" : "false"}
              {...register("location", {
                required: true,
              })}
            />
            {errors?.location?.type === "required" && (
              <p className="text-red-500 text-xs">Location is required</p>
            )}

            <button
              className={`btn btn-outline mt-5 transition-all mx-auto ${
                isAdding ? "loading" : null
              }`}
              disabled={isAdding}
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
