import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Loading from "../../../../components/Loading/Loading";
import SectionHeader from "../../../../components/SectionHeader/SectionHeader";
import { UserContext } from "../../../../contexts/UserContext/UserContext";
import ConfirmationModal from "./../../../../components/ConfirmationModal/ConfirmationModal";

//TODO: table, payment,  opt:remove booking,

const MyOrders = () => {
  const [deletingProduct, setDeletingProduct] = useState(null);
  const { user } = useContext(UserContext);

  const {
    data: orders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-orders"],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://secondhand-bazaar-server.vercel.app/book-product?email=${user.email}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      console.log(data);
      // const filteredByBoughtBy = data.filter(
      //   (dt) => dt.boughtBy === user.email || !dt.boughtBy
      // );
      // return filteredByBoughtBy;
      return data;
    },
  });

  if (isLoading) return <Loading />;

  const closeModal = () => setDeletingProduct(null);

  const deleteProduct = (id) => {
    fetch(
      `https://secondhand-bazaar-server.vercel.app/book-product?email=${user.email}&id=${id}`,
      {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          toast.success("Your booking has been removed");
          refetch();
        }
      })
      .catch((error) => {
        toast.error("Sorry! An error occurred. Please try again.");
      });
  };

  return (
    <div className="m-4">
      <SectionHeader>
        <span className="px-4 py-1 bg-gray-800 text-2xl text-white">
          My Orders
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
              <th>Seller Email</th>
              <th>Contact</th>
              <th>Paid</th>
              <th className="rounded-none">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders
              ? orders.map((od, idx) => (
                  <tr key={od._id}>
                    <th>{idx + 1}</th>
                    <td>
                      <img
                        src={od.image}
                        className="h-10"
                        alt="product_image"
                      />
                    </td>
                    <td>
                      <div
                        className="tooltip tooltip-right max-w-[150px]"
                        data-tip={od.productName}
                      >
                        <div className="max-w-[120px] text-ellipsis overflow-hidden">
                          {od.productName}
                        </div>
                      </div>
                    </td>
                    <td>{od.price}</td>
                    <td>{od.sellerEmail}</td>
                    <td>{od.sellerContact}</td>
                    <td>
                      {od?.boughtBy === user.email ? (
                        <span className="text-green-600">Paid</span>
                      ) : od.sellerRemoved || od.isPaid ? (
                        <span className="text-gray-400">Unavailable</span>
                      ) : (
                        <Link
                          className="btn-primary py-1 px-3 rounded-sm"
                          to={`/dashboard/payment/${od._id}`}
                        >
                          Pay
                        </Link>
                      )}
                    </td>
                    <td>
                      <label
                        htmlFor="confirmation-modal"
                        className="btn-error py-1 px-3 rounded-sm cursor-pointer hover:bg-red-500"
                        onClick={() => setDeletingProduct(od)}
                      >
                        Delete
                      </label>
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
        {deletingProduct ? (
          <ConfirmationModal
            modalTitle={deletingProduct.productName}
            message={`If you want you can book again.`}
            confirmAction={deleteProduct}
            buttonText="Delete"
            modalData={deletingProduct.productId}
            closeModal={closeModal}
          />
        ) : null}
      </div>
    </div>
  );
};

export default MyOrders;
