import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import ConfirmationModal from "../../../../components/ConfirmationModal/ConfirmationModal";

const AllSellers = () => {
  const [deletingSeller, setDeletingSeller] = useState(null);
  const [verifyingSeller, setVerifyingSeller] = useState(null);

  const { data: allSellers = [], refetch, isLoading } = useQuery({
    queryKey: ["all-sellers"],
    queryFn: () =>
      fetch(`http://localhost:5000/all-sellers`).then((res) => res.json()),
  });

  const closeModal = () => setDeletingSeller(null);
  const closeVrfModal = () => setVerifyingSeller(null);

  const verifySeller = (id) => {
    fetch('http://localhost:5000/verify-seller', {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ sellerId: id })
    })
    .then(res => res.json())
    .then(data => {
      
      refetch();
      if (data.modifiedCount > 0) {
        toast.success("The seller has been verified successfully.")
      }
    })
    .catch(err => {
      console.error(err);
      toast.error("An error occurred. Please check browser console.")
    })
  };

  const removeSeller = (email) => {
    fetch(`http://localhost:5000/remove-seller?email=${email}`, {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      refetch();
      if (data.deletedCount > 0) {
        toast.success("The seller has been removed successfully.")
      }
    })
    .catch(err => {
      console.error(err);
      toast.error("An error occurred. Please check browser console.")
    })
  };

  console.log(verifyingSeller);

  if (isLoading) return "loading";

  return (
    <div className="px-5">
      <h1 className="text-2xl font-semibold mt-3 mb-5">My products</h1>
      <div className="overflow-x-auto">
        <table className="table table-compact w-full">
          <thead>
            <tr>
              <th className="rounded-none"></th>
              <th>Name</th>
              <th>Email</th>
              <th>Verify</th>
              <th className="rounded-none">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allSellers
              ? allSellers.map((slr, idx) => (
                  <tr key={slr._id}>
                    <th>{idx + 1}</th>
                    <td>{slr.name}</td>
                    <td>{slr.email}</td>
                    <td>
                      {slr.isVerified ? (
                        "Verified"
                      ) : (
                        <label
                          htmlFor="confirmation-modal"
                          className="btn-primary py-1 px-3 rounded-sm cursor-pointer"
                          onClick={() => setVerifyingSeller(slr)}
                        >
                          Verify
                        </label>
                      )}
                    </td>
                    <td>
                      <label
                        htmlFor="confirmation-modal"
                        className="btn-error py-1 px-3 rounded-sm cursor-pointer hover:bg-red-500"
                        onClick={() => setDeletingSeller(slr)}
                      >
                        Remove
                      </label>
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
        {deletingSeller ? (
          <ConfirmationModal
            modalTitle={`Remove ${deletingSeller.name}`}
            message={`Warning! Removing seller will remove all his available product.`}
            confirmAction={removeSeller}
            buttonText="Delete"
            modalData={deletingSeller.email}
            closeModal={closeModal}
          />
        ) : null}
        {verifyingSeller ? (
          <ConfirmationModal
            modalTitle={verifyingSeller.name}
            message={`Verified seller will appear more trustworthy.`}
            confirmAction={verifySeller}
            buttonText="Verify"
            modalData={verifyingSeller._id}
            closeModal={closeVrfModal}
          />
        ) : null}
      </div>
    </div>
  );
};

export default AllSellers;
