import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './ui/Home';
import Menu, { loader as menuLoader } from './features//menu/Menu';
import Cart from './features/cart/Cart';
import CreateOrder, {
  action as createAction,
} from './features/order/CreateOrder';
import Order, { loader as orderLoader } from './features/order/Order';
import AppLayout from './ui/AppLayout';
import Error from './ui/Error';
import { action as updateOrderAction } from './features/order/UpdateOrder';

import { useState } from 'react';

const router = createBrowserRouter([
  {
    element: <AppLayout></AppLayout>,
    errorElement: <Error></Error>,
    children: [
      { path: '/', element: <Home></Home> },
      {
        path: '/menu',
        element: <Menu></Menu>,
        loader: menuLoader,
        errorElement: <Error></Error>,
      },
      { path: '/cart', element: <Cart></Cart> },
      {
        path: '/order/new',
        element: <CreateOrder></CreateOrder>,
        action: createAction,
      },
      {
        path: '/order/:orderId',
        element: <Order></Order>,
        loader: orderLoader,
        errorElement: <Error></Error>,
        action: updateOrderAction,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
