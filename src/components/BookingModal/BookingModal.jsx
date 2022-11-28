import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext/UserContext";
import useCheckRole from "../../hooks/useCheckRole";

const BookingModal = ({
  buyingProduct,
  buyingProduct: {
    _id,
    image,
    productName,
    askingPrice,
    sellerData,
    location,
    contact,
  },
  closeModal,
}) => {
  const [ isPending, setIsPending ] = useState(false);
  const { user } = useContext(UserContext);
  const [role, isRoleLoading] = useCheckRole(user?.email);

  const navigate = useNavigate();

  // console.log(sellerData);

  const email = sellerData[0].email;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const bookProduct = (data) => {
    setIsPending(true);

    data.productId = _id;
    data.image = image;
    data.sellerEmail = email;
    data.sellerContact = contact;
    data.sellerLocation = location;
    
    fetch('https://secondhand-bazaar-server.vercel.app/book-product', {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem("accessToken")}`
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      if (data.acknowledged) {
        toast.success(`Your booking for ${productName} has been added successfully.`)
        setIsPending(false);
        navigate('/dashboard/my-orders');
      }
    })
  }

  return (
    <div>
      <input type="checkbox" id="confirmation-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Book Now</h3>
          <form onSubmit={handleSubmit(bookProduct)} className="">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                value={user?.displayName}
                className="input input-bordered w-full h-9 rounded-sm placeholder:text-gray-500"
                readOnly
                {...register("fullName")}
              />

              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                value={user?.email}
                className="input input-bordered w-full h-9 rounded-sm placeholder:text-gray-500"
                readOnly
                {...register("email")}
              />

              <label className="label">
                <span className="label-text">Product Name</span>
              </label>
              <input
                type="text"
                value={productName}
                className="input input-bordered w-full h-9 rounded-sm placeholder:text-gray-500"
                readOnly
                {...register("productName")}
              />

              <label className="label">
                <span className="label-text">Product Price</span>
              </label>
              <input
                type="text"
                value={askingPrice}
                className="input input-bordered w-full h-9 rounded-sm placeholder:text-gray-500"
                readOnly
                {...register("price")}
              />

              <label className="label">
                <span className="label-text">Phone Number</span>
              </label>
              <input
                type="tel"
                placeholder="Your contact number"
                className="input input-bordered w-full h-9 rounded-sm placeholder:text-gray-500"
                aria-invalid={errors.phoneNumber ? "true" : "false"}
                {...register("phoneNumber", {
                  required: true,
                })}
              />
              {errors?.phoneNumber?.type === "required" && (
                <p className="text-red-500 text-xs">
                  Your Contact Number is required
                </p>
              )}

              <label className="label">
                <span className="label-text">Meeting Location</span>
              </label>
              <input
                type="text"
                placeholder="Set meeting location"
                className="input input-bordered w-full h-9 rounded-sm placeholder:text-gray-500"
                aria-invalid={errors.location ? "true" : "false"}
                {...register("location", {
                  required: true,
                })}
              />
              {errors?.location?.type === "required" && (
                <p className="text-red-500 text-xs">
                  The meeting location is required
                </p>
              )}

              <div className="modal-action justify-between">
                <label
                  htmlFor="confirmation-modal"
                  onClick={closeModal}
                  className="btn btn-outline"
                >
                  Cancel
                </label>
                <label htmlFor="confirmation-modal" className={`${role !== "buyer" ? "tooltip tooltip-left" : null}`} data-tip="Please Login as a buyer.">
                  <button
                    className={`btn btn-accent w-full ${isPending ? 'loading': null}`}
                    type="submit"
                    aria-label="Submit"
                    disabled={isPending || isRoleLoading || role !== "buyer"}
                  >Submit</button>
                </label>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
