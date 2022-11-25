import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ThreeCategories = () => {
  const navigate = useNavigate();

  const handleClick = (id) => navigate(`/category/${id}`);

  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["three-categories"],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://localhost:5000/get-three-categories`
      );
      return data;
    },
  });

  if (isLoading) return "loading";

  return (
    <section className="my-40 px-3">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {categories.map((ct) => (
          <div
            key={ct._id}
            onClick={() => handleClick(ct._id)}
            className="h-36 group grid place-items-center bg-base-200 rounded-sm cursor-pointer  transition-all"
          >
            <p className="text-2xl font-semibold group group-hover:text-3xl group-hover:drop-shadow-lg transition-all">
              {ct.categoryName}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ThreeCategories;