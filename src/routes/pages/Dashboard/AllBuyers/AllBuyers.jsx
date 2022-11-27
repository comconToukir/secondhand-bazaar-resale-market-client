import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const AllBuyers = () => {
  // const { user } = useContext(UserContext);

  const {
    data: buyers = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-buyers"],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://localhost:5000/all-buyers`
      );

      return data;
    },
  });

  if (isLoading) return "loading";

  if (buyers.length === 0) return <div className="mx-5 my-3 text-xl">Your products haven't been sold yet.</div>

  return (
    <div className="px-5">
      <h1 className="text-2xl font-semibold mt-3 mb-5">My products</h1>
      <div className="overflow-x-auto">
        <table className="table table-compact w-full">
          <thead>
            <tr>
              <th className="rounded-none"></th>
              <th>id</th>
              <th>Name</th>
              <th className="rounded-none">Email</th>
            </tr>
          </thead>
          <tbody>
            {buyers
              ? buyers.map((byr, idx) => (
                  <tr key={byr._id}>
                    <th>{idx + 1}</th>
                    <td>
                      {byr._id}
                    </td>
                    <td>
                      {byr.name}
                    </td>
                    <td>{byr.email}</td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllBuyers;