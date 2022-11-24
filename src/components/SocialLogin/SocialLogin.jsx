import { useContext } from "react";
import toast from "react-hot-toast";
import { FaGoogle } from "react-icons/fa"
import { UserContext } from "../../contexts/UserContext/UserContext";

const SocialLogin = () => {
  const { googleSignIn } = useContext(UserContext);

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(() => {})
      .catch((error) => {
        console.error(error);
        toast.error(error.code);
      });
  };

  return (
    <div>
      <button onClick={handleGoogleSignIn} className="flex items-center gap-2 mx-auto outline outline-1  outline-gray-600 px-4 py-1 rounded-md">
          <FaGoogle />
          Google
        </button>
    </div>
  );
};

export default SocialLogin;