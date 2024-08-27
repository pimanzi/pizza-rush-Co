import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import User from "../features/user/User";

function Header() {
  return (
    <header className="flex items-center justify-between border-b border-stone-500 bg-yellow-400 px-5 py-4 text-xl font-semibold uppercase sm:px-7">
      <Link to="/" className="tracking-widest">
        pizza rush Co
      </Link>
      <SearchOrder></SearchOrder>
      <User></User>
    </header>
  );
}

export default Header;
