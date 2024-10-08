import { Outlet, useNavigation } from 'react-router-dom';
import Header from './Header';
import CartOverview from '../features/cart/CartOverview';
import Loader from './Loader';

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      {isLoading && <Loader></Loader>}
      <Header></Header>
      <div className="w-full overflow-y-auto">
        <main className="mx-auto max-w-3xl">
          <Outlet></Outlet>
        </main>
      </div>

      <CartOverview></CartOverview>
    </div>
  );
}

export default AppLayout;
