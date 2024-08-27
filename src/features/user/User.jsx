import { useSelector } from "react-redux";

function User() {
  const userName = useSelector((store) => store.user.user);
  if (!userName) return;
  return <div className="hidden text-sm md:block">{userName}</div>;
}

export default User;
