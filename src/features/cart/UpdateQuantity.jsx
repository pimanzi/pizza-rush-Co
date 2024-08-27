import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { decreasingItem, increasingItem } from "./cartSlice";

function UpdateQuantity({ pizzaId, itemQuantity }) {
  const dispatch = useDispatch();
  return (
    <div className="flex items-center gap-1 md:gap-3">
      <Button type="round" onClick={() => dispatch(decreasingItem(pizzaId))}>
        -
      </Button>
      <span className="font-semibold">{itemQuantity}</span>
      <Button type="round" onClick={() => dispatch(increasingItem(pizzaId))}>
        +
      </Button>
    </div>
  );
}

export default UpdateQuantity;
