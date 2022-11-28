import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import ConfirmationModal from "../../../../components/ConfirmationModal/ConfirmationModal";
import Loading from "../../../../components/Loading/Loading";

const AllBuyers = () => {
  // const { user } = useContext(UserContext);
  const [deletingBuyer, setDeletingBuyer] = useState(null);

  const closeModal = () => setDeletingBuyer(null);

  const {
    data: buyers = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-buyers"],
    queryFn: async () => {
      const { data } = await axios.get(`http://localhost:5000/all-buyers`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`
        },
      });

      return data;
    },
  });

  const removeBuyer = (id) => {
    fetch(`http://localhost:5000/remove-buyer?id=${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`
      },
    })
      .then((res) => res.json())
      .then((data) => {
        refetch();
        if (data.deletedCount > 0) {
          toast.success("The buyer has been removed successfully.");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("An error occurred. Please check browser console.");
      });
  };

  if (isLoading) return <Loading />;

  return (
    <div className="m-4">
      <h1 className="border-b-2 mb-4 border-gray-800 flex justify-between  font-medium">
        <span className="px-4 py-1 bg-gray-800 text-2xl text-white">
          All Buyers
        </span>
      </h1>
      <div className="overflow-x-auto">
        <table className="table table-compact w-full">
          <thead>
            <tr>
              <th className="rounded-none"></th>
              <th>id</th>
              <th>Name</th>
              <th>Email</th>
              <th className="rounded-none">Action</th>
            </tr>
          </thead>
          <tbody>
            {buyers
              ? buyers.map((byr, idx) => (
                  <tr key={byr._id}>
                    <th>{idx + 1}</th>
                    <td>{byr._id}</td>
                    <td>{byr.name}</td>
                    <td>{byr.email}</td>
                    <td>
                      <label
                        htmlFor="confirmation-modal"
                        className="btn-error py-1 px-3 rounded-sm cursor-pointer hover:bg-red-500"
                        onClick={() => setDeletingBuyer(byr)}
                      >
                        Remove
                      </label>
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
        {deletingBuyer ? (
          <ConfirmationModal
            modalTitle={`Remove ${deletingBuyer.name}`}
            message={`Warning! Removed buyer cannot be recovered.`}
            confirmAction={removeBuyer}
            buttonText="Delete"
            modalData={deletingBuyer._id}
            closeModal={closeModal}
          />
        ) : null}
      </div>
    </div>
  );
};

export default AllBuyers;
