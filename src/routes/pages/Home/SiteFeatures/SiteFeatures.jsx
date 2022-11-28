import { HiOutlineClipboardList, HiOutlineShieldCheck, HiOutlineGift, HiOutlineCurrencyDollar } from "react-icons/hi";

const SiteFeatures = () => {
  return (
    <div className='my-48 m-3 border grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-9 py-9 px-9'>
      <div className="flex items-center gap-3" >
        <HiOutlineClipboardList className="h-16 w-12" />
        <div >
          <p className="text-md font-bold font-barlow-cond ">FREE DELIVERY</p>
          <p className="text-xs font-poppins">On order over $49.86</p>
        </div>
      </div>
      <div className="flex items-center gap-3" >
        <HiOutlineShieldCheck className="h-16 w-12" />
        <div >
          <p className="text-md font-bold font-barlow-cond ">ORDER PROTECTION</p>
          <p className="text-xs font-poppins">Secured information</p>
        </div>
      </div>
      <div className="flex items-center gap-3" >
        <HiOutlineGift className="h-16 w-12" />
        <div >
          <p className="text-md font-bold font-barlow-cond ">PROMOTION GIFT</p>
          <p className="text-xs font-poppins">Special offers!</p>
        </div>
      </div>
      <div className="flex items-center gap-3" >
        <HiOutlineCurrencyDollar className="h-16 w-12" />
        <div >
          <p className="text-md font-bold font-barlow-cond ">MONEY BACK</p>
          <p className="text-xs font-poppins">Return over 30 days</p>
        </div>
      </div>
    </div>
  );
};

export default SiteFeatures;