import { useForm } from "react-hook-form";

import loginBanner from "../../../assets/images/login/login-header.jpg";
import SocialLogin from "../../../components/SocialLogin/SocialLogin";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { UserContext } from "../../../contexts/UserContext/UserContext";
import toast from "react-hot-toast";
import AuthButton from "../../../components/AuthButton/AuthButton";

const Register = () => {
  const { createUser } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const name = data.fullName;
    const email = data.email;
    const password = data.password;
    createUser(email, password)
      .then((result) => {
        navigate(from);
      })
      .catch((error) => {
        toast.error(error.code);
        console.error(error);
      });
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 max-w-screen-xl lg:h-screen mx-auto">
      <div className="grid place-items-center">
        <img src={loginBanner} alt="login illustration" />
      </div>
      <div className="grid place-items-center">
        <div>
          <h1 className="text-3xl mb-10 text-center">Register</h1>
          <form className="" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control w-72">
            <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Your Full Name"
                className="input input-bordered w-full h-9 rounded-sm placeholder:text-gray-500"
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
                {...register("email", {
                  required: true,
                })}
              />
              {errors?.email?.type === "required" && (
                <p className="text-red-500 text-xs">Email Address is required</p>
              )}
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Your password"
                className="input input-bordered w-full h-9 rounded-sm placeholder:text-gray-500"
                {...register("password", {
                  required: true,
                })}
              />
              {errors?.password?.type === "required" && (
                <p className="text-red-500 text-xs">Password is required</p>
              )}
              
              <AuthButton>Register</AuthButton>
            </div>
          </form>
          <p className="mt-8 text-center text-sm">
                Already have an account?{" "}
                <Link className="link ml-1" to="/login">
                  Login
                </Link>
              </p>
          <div className="divider my-10">Or Login With</div>
          <SocialLogin />
        </div>
      </div>
    </div>
  );
};

export default Register;