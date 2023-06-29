import React, { useRef } from "react";

function Order(props) {
  const delOrderRef = useRef();
  const selectedTableOrder = (orders, tableCategory) => {
    return orders.filter((order) => {
      return order.category.toString() === tableCategory;
    });
  };

  const table = selectedTableOrder(props.orders, props.title);

  const cancelOrderHanlder = (e) => {
    const orderId = e.target.parentElement.id;
    props.onDelOrder(orderId);
  };

  return (
    <div>
      <h1>{props.title}</h1>
      <ul>
        {table.length > 0 &&
          table.map((order) => {
            return (
              <li key={order.id} id={order.id} ref={delOrderRef}>
                {order.dish} - {order.price}
                <button onClick={cancelOrderHanlder}>Delete Order</button>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default Order;
