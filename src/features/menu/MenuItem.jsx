import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import {
  addItem,
  getItemQuantity,
  getPresenceOfItemInCart,
} from "../cart/cartSlice";
import DeleteItem from "../cart/DeleteItem";
import UpdateQuantity from "../cart/UpdateQuantity";

function MenuItem({ pizza }) {
  const dispatch = useDispatch();
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const itemInCart = useSelector((store) => getPresenceOfItemInCart(store, id));
  const itemQuantity = useSelector((store) => getItemQuantity(store, id));

  function handleAddItem() {
    const newPizza = {
      name,
      pizzaId: id,
      unitPrice,
      quantity: 1,
      totalPrice: unitPrice,
    };
    dispatch(addItem(newPizza));
  }
  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? "opacity-70 grayscale" : ""}`}
      />
      <div className="flex grow flex-col pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}
          {itemInCart && (
            <div className="flex items-center gap-3 sm:gap-8">
              <UpdateQuantity
                itemQuantity={itemQuantity}
                pizzaId={id}
              ></UpdateQuantity>
              <DeleteItem pizzaId={id}></DeleteItem>
            </div>
          )}
          {!soldOut && !itemInCart && (
            <Button onClick={handleAddItem} type="small">
              Add to Cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
