const AuthButton = ({ children }) => {
  return (
    <input
      className="outline outline-1 outline-gray-600 font-semibold py-1 mt-7 w-36 mx-auto rounded-md cursor-pointer hover:bg-slate-500 hover:text-gray-800 focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
      type="submit"
      value={children}
      aria-label="submit"
    />
  );
};

export default AuthButton;
