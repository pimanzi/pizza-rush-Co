import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
import Button from '../../ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getCart, getTotalCartPrice } from '../cart/cartSlice';
import EmpytCart from '../cart/EmptyCart';
import store from '../../store';
import { formatCurrency } from '../../utils/helpers';
import { useState } from 'react';
import { fetchAdress } from '../user/userSlice';
// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

function CreateOrder() {
  const dispatch = useDispatch();
  const [withPriority, setWithPriority] = useState(false);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;
  const orderCart = useSelector(getCart);
  const {
    user,
    position,
    status: userStatus,
    address: userAdress,
    error: userError,
  } = useSelector((store) => store.user);
  const isLoading = userStatus === 'loading';
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const cart = orderCart;
  const formErrors = useActionData();

  if (!cart.length) return <EmpytCart></EmpytCart>;
  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            type="text"
            name="customer"
            required
            className="input grow"
            defaultValue={user}
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input type="tel" name="phone" required className="input w-full" />
            {formErrors?.phone ? (
              <p className="mt-2 rounded-md bg-red-100 px-2 py-1.5 text-sm text-red-700">
                {formErrors.phone}
              </p>
            ) : (
              ''
            )}
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center relative">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              type="text"
              name="address"
              disabled={isLoading}
              defaultValue={userAdress}
              required
              className="input w-full"
            />
            {userStatus === 'error' ? (
              <p className="mt-2 rounded-md bg-red-100 px-2 py-1.5 text-sm text-red-700">
                {userError}
              </p>
            ) : (
              ''
            )}
          </div>
          <span className="absolute right-[3px] top-[3px] md:right-[5px] md:top-[5px]">
            {' '}
            {!position?.latitude && !position?.longitude ? (
              <Button
                disabled={isLoading}
                type="small"
                onClick={(e) => {
                  {
                    e.preventDefault();
                    dispatch(fetchAdress());
                  }
                }}
              >
                Get position
              </Button>
            ) : (
              ''
            )}
          </span>
        </div>

        <div className="mb-12 flex items-center gap-4">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            value={withPriority}
            onChange={() => setWithPriority(!withPriority)}
          />
          <label className="font-medium" htmlFor="priority">
            Want to yo give your order priority?
          </label>
        </div>

        <input type="hidden" value={JSON.stringify(cart)} name="cart"></input>
        <input
          type="hidden"
          value={
            position?.longitude && position?.latitude
              ? `${position?.longitude} ${position?.latitude}`
              : ''
          }
          name="position"
        ></input>

        <div>
          <Button disabled={isSubmitting || isLoading} type="primary">
            {isSubmitting
              ? 'Placing order...'
              : `Order now from ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    priority: data.priority === 'true',
    cart: JSON.parse(data.cart),
  };

  const errors = {};
  if (!isValidPhone(order.phone)) {
    errors.phone = 'Please provide your correct phone, it is essential';
    return errors;
  }
  const result = await createOrder(order);

  store.dispatch(clearCart());

  return redirect(`/order/${result.id}`);
}

export default CreateOrder;
