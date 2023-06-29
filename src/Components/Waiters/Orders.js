import React from "react";
import Order from "./Order";

function Orders(props) {
  const allTables = ["Table1", "Table2", "Table3"];
  return (
    <div>
      {allTables.map((table) => {
        return (
          <Order
            key={table}
            title={table}
            orders={props.orders}
            onDelOrder={props.onDelOrder}
          />
        );
      })}
    </div>
  );
}

export default Orders;
