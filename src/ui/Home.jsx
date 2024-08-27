import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser";
import Button from "./Button";
function Home() {
  const userName = useSelector((store) => store.user.user);
  return (
    <div className="my-10 text-center sm:my-16">
      <h1 className="mb-8 px-4 text-2xl font-semibold md:text-3xl">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>

      {userName ? (
        <Button type="primary" to="/menu">
          Continue to Menu, {userName}
        </Button>
      ) : (
        <CreateUser></CreateUser>
      )}
    </div>
  );
}

export default Home;
