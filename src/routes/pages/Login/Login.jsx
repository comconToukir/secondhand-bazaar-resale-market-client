import { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { UserContext } from "../../../contexts/UserContext/UserContext";
import loginBanner from "../../../assets/images/login/login-header.jpg";
import SocialLogin from "../../../components/SocialLogin/SocialLogin";
import AuthButton from "../../../components/AuthButton/AuthButton";
import useGetToken from './../../../hooks/useGetToken';
import Loading from './../../../components/Loading/Loading';

const Login = () => {
  const { logInUser, loading, setLoading } = useContext(UserContext);
  const [loginUserEmail, setLoginUserEmail] = useState("");
  
  const location = useLocation();
  
  const from = location.state?.from?.pathname || "/";
  
  const [token, isTokenLoading] = useGetToken(loginUserEmail, from);

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
    .then(({ user }) => {
        setLoginUserEmail(email);
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error.code);
        console.error(error);
        setLoading(false);
      });
  }

  // if (loading) return <Loading />;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 max-w-screen-xl mx-auto my-12 lg:h-screen">
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
                aria-invalid={errors.email ? "true" : "false"}
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
                aria-invalid={errors.password ? "true" : "false"}
                {...register("password", {
                  required: true,
                })}
              />
              {errors?.password?.type === "required" && (
                <p className="text-red-500 text-xs">Password is required</p>
              )}
              
              <AuthButton loading={loading} className={`mt-5 mx-auto`}>Login</AuthButton>
            </div>
          </form>
          <p className="mt-8 text-center text-sm">
                Don't have an account?{" "}
                <Link className="link ml-1 hover:font-medium" to="/register">
                  Register
                </Link>
              </p>
          <div className="divider my-10">Or Login With</div>
          <SocialLogin from={from} setLoginUserEmail={setLoginUserEmail} loading={loading} setLoading={setLoading} />
        </div>
      </div>
    </div>
  );
};

export default Login;
