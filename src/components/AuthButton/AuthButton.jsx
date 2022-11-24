const AuthButton = ({ children, className }) => {
  return (
    <input
      className={`outline outline-1 outline-gray-600 font-semibold py-1 w-min px-4 rounded-md cursor-pointer hover:bg-slate-500 hover:text-gray-800 ${className}`}
      type="submit"
      value={children}
      aria-label="submit"
    />
  );
};

export default AuthButton;
