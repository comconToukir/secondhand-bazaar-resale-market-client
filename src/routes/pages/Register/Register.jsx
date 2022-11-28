import { useForm } from "react-hook-form";

import loginBanner from "../../../assets/images/login/login-header.jpg";
import SocialLogin from "../../../components/SocialLogin/SocialLogin";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../../../contexts/UserContext/UserContext";
import toast from "react-hot-toast";
import AuthButton from "../../../components/AuthButton/AuthButton";
import useGetToken from "../../../hooks/useGetToken";

const Register = () => {
  const { createUser, updateUser, loading, setLoading } =
    useContext(UserContext);
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
    const name = data.fullName;
    const email = data.email;
    const password = data.password;
    const role = data.role;

    // console.log({ name, email, password, role });

    const user = {
      name,
      email,
      role,
    };

    createUser(email, password)
      .then(() => updateUser({ displayName: name }))
      .then((result) => {
        fetch("http://localhost:5000/user", {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(user),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.acknowledged) {
              setLoginUserEmail(email);
              setLoading(false);
            }
          });
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.code);
        console.error(error);
      });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-screen-xl my-12 lg:my-0 lg:h-screen mx-auto">
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
              <AuthButton loading={loading} className="mt-5 mx-auto">
                Register
              </AuthButton>
            </div>
          </form>
          <p className="mt-8 text-center text-sm">
            Already have an account?{" "}
            <Link className="link ml-1" to="/login">
              Login
            </Link>
          </p>
          <div className="divider my-10 text-sm">Or Register As User With</div>
          <SocialLogin from={from}  setLoginUserEmail={setLoginUserEmail} loading={loading} setLoading={setLoading}  />
        </div>
      </div>
    </div>
  );
};

export default Register;
