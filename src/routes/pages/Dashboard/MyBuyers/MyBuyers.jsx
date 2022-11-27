import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";
import { UserContext } from "../../../../contexts/UserContext/UserContext";

const MyBuyers = () => {
  const { user } = useContext(UserContext);

  const {
    data: buyers = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-buyers"],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://localhost:5000/sold-products?email=${user.email}`
      );
      
      console.log(data);

      console.log(data[0].boughtBy);

      data.forEach(dt => {
        const buyerInfo = dt.bookers.filter(brs => brs.bookerEMail !== dt.boughtBy);
        dt.boughtBy = buyerInfo[0];
      });

      console.log(data);

      return data;
    },
  });

  if (isLoading) return "loading";

  return (
    <div className="px-5">
      <h1 className="text-2xl font-semibold mt-3 mb-5">My products</h1>
      <div className="overflow-x-auto">
        <table className="table table-compact w-full">
          <thead>
            <tr>
              <th className="rounded-none"></th>
              <th>Picture</th>
              <th>Name</th>
              <th>Price</th>
              <th>Buyer Name</th>
              <th>Buyer Email</th>
            </tr>
          </thead>
          <tbody>
            {buyers
              ? buyers.map((pd, idx) => (
                  <tr key={pd._id}>
                    <th>{idx + 1}</th>
                    <td>
                      <img
                        src={pd.image}
                        className="h-10"
                        alt="product_image"
                      />
                    </td>
                    <td>
                      <div
                        className="tooltip tooltip-right max-w-[150px]"
                        data-tip={pd.productName}
                      >
                        <div className="max-w-[120px] text-ellipsis overflow-hidden">
                          {pd.productName}
                        </div>
                      </div>
                    </td>
                    <td>{pd.price}</td>
                    <td>{pd.boughtBy.bookerName}</td>
                    <td>{pd.boughtBy.bookerEmail}</td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBuyers;
