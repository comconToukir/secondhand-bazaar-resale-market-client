import React, { useContext } from "react";
import { useNavigate, useRouteError } from "react-router-dom";
import { UserContext } from "../../../contexts/UserContext/UserContext";

import errorImage from "../../../assets/images/Error/Error-404-page.png";

const ErrorPage = () => {
  const { logOutUser } = useContext(UserContext);
  const error = useRouteError();
  const navigate = useNavigate();

  const handleLogOut = () => {
    logOutUser()
      .then(() => {
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  const navigateHome = () => navigate("/");

  return (
    <div className="w-screen h-screen grid place-items-center text-center">
      <div className="max-w-xl p-4">
        <img src={errorImage} className="mb-7" alt="" />
        <p className="text-4xl mb-7">Oops!!! An error has occurred.</p>
        <p className="text-red-500 mb-5">{error.statusText || error.message}</p>
        <div className="flex gap-5 justify-center">
          <button
            className="btn-outline text-md outline outline-1 py-2 px-5 font-semibold rounded-sm"
            onClick={handleLogOut}
          >
            Log Out
          </button>
          <button
            className="btn-secondary text-md outline outline-1 outline-secondary text-white py-2 px-5 font-semibold rounded-sm"
            onClick={navigateHome}
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
