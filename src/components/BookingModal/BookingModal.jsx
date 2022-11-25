import React from "react";
import { useForm } from "react-hook-form";

const BookingModal = ({ buyingProduct, closeModal }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  return (
    <div>
      <input type="checkbox" id="confirmation-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Book Now</h3>
          <form className="grid grid-cols-1 gap-3 mt-10">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Your Full Name"
                className="input input-bordered w-full h-9 rounded-sm placeholder:text-gray-500"
                aria-invalid={errors.fullName ? "true" : "false"}
                {...register("fullName", {
                  required: true,
                })}
              />
              {errors?.fullName?.type === "required" && (
                <p className="text-red-500 text-xs">Your Name is required</p>
              )}
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Your email address"
                className="input input-bordered w-full h-9 rounded-sm placeholder:text-gray-500"
                aria-invalid={errors.email ? "true" : "false"}
                {...register("email", {
                  required: true,
                })}
              />
              {errors?.email?.type === "required" && (
                <p className="text-red-500 text-xs">
                  Email Address is required
                </p>
              )}
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Your password"
                className="input input-bordered w-full h-9 rounded-sm placeholder:text-gray-500"
                aria-invalid={errors.password ? "true" : "false"}
                {...register("password", {
                  required: true,
                })}
              />
              {errors?.password?.type === "required" && (
                <p className="text-red-500 text-xs">Password is required</p>
              )}
              <label className="label">
                <span className="label-text">Register As</span>
              </label>
              <select
                className="select select-bordered"
                aria-invalid={errors.role ? "true" : "false"}
                {...register("role", {
                  required: true,
                })}
              >
                <option value="buyer">Buyer</option>
                <option value="seller">Seller</option>
              </select>
              {errors?.role?.type === "required" && (
                <p className="text-red-500 text-xs">User Type is required</p>
              )}

              <div className="modal-action justify-between">
                <label
                  htmlFor="confirmation-modal"
                  onClick={closeModal}
                  className="btn btn-outline"
                >
                  Cancel
                </label>
                <label htmlFor="confirmation-modal">
                  <input
                    className="btn btn-accent w-full"
                    type="submit"
                    value="Submit"
                    aria-label="Submit"
                  />
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
