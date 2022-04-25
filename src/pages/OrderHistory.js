import styles from "./styles/OrderHistory.module.css";

const OrderHistory = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <div>
      <h2 style={{ marginTop: "3em" }}>Order History</h2>
      <div>
        {currentUser.currentUserOrderHistory
          ? currentUser.currentUserOrderHistory.reverse().map((order) => {
              return (
                <div key={order.date} className={styles.orderContainer}>
                  {" "}
                  {/* {console.log(order.date)} */}
                  <span>Date {order.date}</span>
                  <span>{order.paymentMethod}</span>
                  {order.products.map((product) => {
                    return (
                      <div
                        key={product[0].id}
                        className={styles.orderHistoryProductInfo}
                      >
                        <span>{product.productQuantity} x </span>
                        <span>{product[0].name} </span>{" "}
                        <span>(€{product[0].price.toFixed(2)}) </span>
                        <span>
                          {" "}
                          = €
                          {(product[0].price * product.productQuantity).toFixed(
                            2
                          )}
                        </span>
                      </div>
                    );
                  })}
                  <span className={styles.orderHistoryTotalAmount}>
                    Order Total: €{order.totalAmount.toFixed(2)}
                  </span>
                </div>
              );
            })
          : "No Orders yet"}
      </div>
    </div>
  );
};

export default OrderHistory;
