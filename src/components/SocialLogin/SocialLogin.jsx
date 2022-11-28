import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";
import { UserContext } from "../../contexts/UserContext/UserContext";

const SocialLogin = ({ setLoginUserEmail, loading, setLoading }) => {
  const [googleUser, setGoogleUser] = useState("");
  const { googleSignIn } = useContext(UserContext);

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(({ user }) => {
        const userData = {
          name: user.displayName,
          email: user.email,
          role: "buyer",
        };

        fetch("https://secondhand-bazaar-server.vercel.app/user", {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(userData),
        })
          .then((res) => res.json())
          .then((data) => {
            setGoogleUser(user.email);
            // setLoginUserEmail(googleUser);
          });
      })
      .then(() => setLoginUserEmail(googleUser))
      .catch((error) => {
        setLoading(false);
        console.error(error);
        toast.error(error.code);
      });
  };

  return (
    <div>
      <button
        onClick={handleGoogleSignIn}
        className={`flex items-center gap-2 mx-auto outline outline-1  outline-gray-800 text-gray-800 font-semibold hover:bg-gray-800 hover:text-white px-4 py-1 rounded-md ${
          loading ? "disabled loading" : null
        }`}
      >
        <FaGoogle />
        Google
      </button>
    </div>
  );
};

export default SocialLogin;
