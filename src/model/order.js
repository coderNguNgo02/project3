const connection = require("../db/db.js");

class Order {
  constructor(id_order, total_price, order_date, cus_name, cus_add, cus_phone) {
      (this.id_order = id_order),
      (this.total_price = total_price),
      (this.order_date = order_date),
      (this.cus_name = cus_name),
      (this.cus_add = cus_add),
      (this.cus_phone = cus_phone);
  }

  async createOrder(cart) {
    const sql =
      "INSERT INTO orders (order_date, customer_name, customer_add, customer_phone, status, total_price) VALUES (?,?,?,?,?,?)";
  
    const sql1 =
      "INSERT INTO order_detail (id_order, id_prd, quantity, unit_price, color, size) VALUES ?";
    //Them order
    await connection.query(sql, [
      this.order_date,
      this.cus_name,
      this.cus_add,
      this.cus_phone,
      1,
      this.total_price,
    ]);

    const getOrderIdLasted = await new Promise((resolve, reject) => {
      connection.query("SELECT id_order FROM orders ORDER BY id_order DESC LIMIT 1;", (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0]);
        }
      });
  });

    //them order_detail
    await connection.query(sql1, [
      cart.map((data) => [
        Object.values(getOrderIdLasted)[0],
        data.product_id,
        data.quantity,
        data.unit_price,
        data.color,
        data.size,
      ]),
    ]);

    return;
  }

 


}

module.exports = Order;
