const SectionHeader = ({ children}) => {
  return (
    <h1 className="border-b-2 border-gray-800 flex justify-between mb-4 font-barlow-cond">
        {children}
      </h1>
  );
};

export default SectionHeader;