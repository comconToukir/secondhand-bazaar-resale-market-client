const AuthButton = ({ children, className, loading }) => {
  return (
    <button
      className={`btn btn-outline outline-1 outline-gray-600 font-semibold py-1 px-4 rounded-md cursor-pointer hover:bg-slate-500 hover:text-gray-800 ${className} ${
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
