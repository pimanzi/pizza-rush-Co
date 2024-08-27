import { useFetcher } from 'react-router-dom';
import Button from '../../ui/Button';
import { updateOrder } from '../../services/apiRestaurant';

function UpdateOrder() {
  const fetcher = useFetcher();
  return (
    <div>
      <fetcher.Form method="PATCH" className="text-right">
        <Button type="primary">Make Priority</Button>
      </fetcher.Form>
    </div>
  );
}

export async function action({ request, params }) {
  console.log('yes');
  const data = { priority: true };
  await updateOrder(params.orderId, data);
  return null;
}

export default UpdateOrder;
