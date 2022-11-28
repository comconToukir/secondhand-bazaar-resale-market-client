const AuthButton = ({ children, className, loading }) => {
  return (
    <button
      className={`btn btn-outline outline-1 outline-gray-800 font-semibold py-1 px-4 rounded-md cursor-pointer hover:bg-gray-800 hover:text-white ${className} ${
        loading ? "loading" : null
      }`}
      type="submit"
      disabled={loading}
    >
      {children}
    </button>
  );
};

export default AuthButton;
