const OrderHistory = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <div>
      <h2>Order History</h2>
      <div>
        {currentUser.currentUserOrderHistory.orderHistory.map((order) => {
          console.log(order);
          return (
            <div key={order.date}>
              {" "}
              <span>{order.paymentMethod}</span>
              {order.products.map((product) => {
                return <div key={product[0].id}>{product[0].name}</div>;
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderHistory;
