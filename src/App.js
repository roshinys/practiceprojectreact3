import { useEffect, useState } from "react";
import Waiters from "./Components/Waiters/Waiters";
import Orders from "./Components/Waiters/Orders";

const dummy_orders = [];

function App() {
  const [orders, setOrders] = useState(dummy_orders);

  useEffect(() => {
    const allOrders = [];
    for (let i = 0; i < localStorage.length; i++) {
      allOrders.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
    }
    setOrders(allOrders);
  }, []);

  const onPlaceOrder = (order) => {
    setOrders((prevState) => {
      localStorage.setItem(order.id, JSON.stringify(order));
      return [...prevState, order];
    });
  };

  const delOrderHandler = (id) => {
    if (localStorage.getItem(id)) {
      localStorage.removeItem(id);
    }
    setOrders((prevState) => {
      return prevState.filter((order) => {
        return order.id !== id;
      });
    });
  };

  return (
    <div>
      <Waiters onPlaceOrder={onPlaceOrder} />
      <Orders orders={orders} key="orders" onDelOrder={delOrderHandler} />
    </div>
  );
}

export default App;
