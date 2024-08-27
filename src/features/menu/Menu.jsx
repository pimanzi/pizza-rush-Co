import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";

function Menu() {
  const menu = useLoaderData();

  return (
    <ul className="divide-y divide-stone-300 px-2">
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id}></MenuItem>
      ))}
    </ul>
  );
}

export async function loader() {
  const Menu = await getMenu();
  return Menu;
}

export default Menu;
