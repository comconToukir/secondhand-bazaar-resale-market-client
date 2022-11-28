import { useContext } from "react";
import toast from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext/UserContext";

const SocialLogin = ({ from }) => {
  const { googleSignIn } = useContext(UserContext);
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(({ user }) => {
        console.log( user );

        const userData = {
          name: user.displayName,
          email: user.email,
          role: "buyer"
        }

        fetch("http://localhost:5000/user", {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(userData),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.acknowledged) {
              navigate(from);
            }
          });
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.code);
      });
  };

  return (
    <div>
      <button onClick={handleGoogleSignIn} className="flex items-center gap-2 mx-auto outline outline-1  outline-gray-800 text-gray-800 font-semibold hover:bg-gray-800 hover:text-white px-4 py-1 rounded-md">
          <FaGoogle />
          Google
        </button>
    </div>
  );
};

export default SocialLogin;
