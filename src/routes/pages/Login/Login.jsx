import { useForm } from "react-hook-form";

import loginBanner from "../../../assets/images/login/login-header.jpg";
import SocialLogin from "../../../components/SocialLogin/SocialLogin";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { UserContext } from "../../../contexts/UserContext/UserContext";
import toast from "react-hot-toast";

const Login = () => {
  const { logInUser } = useContext(UserContext);
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
    const email = data.email;
    const password = data.password;
    logInUser(email, password)
      .then((result) => {
        navigate(from);
      })
      .catch((error) => {
        toast.error(error.code);
        console.error(error);
      });
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 my-36 max-w-screen-xl mx-auto">
      <div className="grid place-items-center">
        <img src={loginBanner} alt="login illustration" />
      </div>
      <div className="grid place-items-center">
        <div>
          <h1 className="text-3xl mb-10 text-center">Login</h1>
          <form className="" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control w-72">
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
                <p className="text-red-500">Email Address is required</p>
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
                <p className="text-red-500">Password is required</p>
              )}
              
              <input
                className="outline outline-1 outline-gray-600 font-semibold py-1 mt-7 w-36 mx-auto rounded-md cursor-pointer hover:bg-slate-500 hover:text-gray-800 focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
                type="submit"
                value="Login"
                aria-label="submit"
              />
            </div>
          </form>
          <p className="mt-8 text-center text-sm">
                Don't have an account?{" "}
                <Link className="link ml-1" to="/register">
                  Register
                </Link>
              </p>
          <div className="divider my-10">Or Login With</div>
          <SocialLogin />
        </div>
      </div>
    </div>
  );
};

export default Login;
