import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
  const navigate = useNavigate();
  const [id, setId] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    navigate(`/order/${id}`);
  }
  return (
    <form onSubmit={handleSubmit}>
      {" "}
      <input
        placeholder="Search order"
        value={id}
        onChange={(e) => setId(e.target.value)}
        className="w-28 rounded-full bg-yellow-100 px-3 py-2 text-xs transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-opacity-50 sm:w-64 sm:text-sm sm:focus:w-72"
      ></input>
    </form>
  );
}

export default SearchOrder;
