const orderService = require("../service/orderService.js");

const orderController = {
  async createOrder(req, res) {
    const data = req.session.cart;
    const cusName = req.body.customer_name;
    const cusAdd = req.body.customer_add;
    const cusPhone = req.body.customer_phone;

    try {
      await orderService.createOrder(data, cusName, cusAdd, cusPhone);
      req.session.destroy((err) => {
        if (err) {
          console.error(err);
          res.sendStatus(500);
        }
      });
      res.send("Tạo đơn hàng thành công !")
    } catch (err) {
      res.status(500).send(err);
    }
  },
};

module.exports = orderController;
