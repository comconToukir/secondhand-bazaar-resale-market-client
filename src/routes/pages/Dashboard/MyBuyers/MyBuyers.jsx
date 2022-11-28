import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";
import Loading from "../../../../components/Loading/Loading";
import SectionHeader from "../../../../components/SectionHeader/SectionHeader";
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
        `https://secondhand-bazaar-server.vercel.app/sold-products?email=${user.email}`,
        {
          method: "GET",
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      data.forEach((dt) => {
        const buyerInfo = dt.bookers.filter(
          (brs) => brs.bookerEMail !== dt?.boughtBy
        );
        dt.boughtBy = buyerInfo[0];
      });

      return data;
    },
  });

  if (isLoading) return <Loading />;

  if (buyers.length === 0)
    return (
      <div className="m-4 text-2xl">Your products haven't been sold yet.</div>
    );

  return (
    <div className="m-4">
      <SectionHeader>
        <span className="px-4 py-1 bg-gray-800 text-2xl text-white">
          My Buyers
        </span>
      </SectionHeader>
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
