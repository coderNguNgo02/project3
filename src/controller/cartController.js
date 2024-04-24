const { destroy } = require("../db/db.js");
const Product = require("../model/products.js");

const cartController = {
  async addToCart(req, res) {
    try {
      // Lấy ID sản phẩm và số lượng từ yêu cầu
      const productId = req.params.id;
      const sizeId = req.params.size;
      const colorId = req.params.color;
      const quantity = req.body.quantity || 1;

      // Tìm sản phẩm theo ID
      const prd = new Product();
      const rs = await prd.findById(productId);
      // Nếu sản phẩm không tồn tại
      if (rs[0]) {
        let price = rs[0].price;

        // Lấy giỏ hàng hiện tại từ session
        const cart = req.session.cart || [];

        // Tìm sản phẩm trong giỏ hàng
        const cartItem = cart.find((cart) => cart.product_id === productId);

        // Nếu sản phẩm đã có trong giỏ hàng
        if (cartItem) {
          // Cập nhật số lượng
          cartItem.quantity += quantity;
        } else {
          // Thêm sản phẩm mới vào giỏ hàng
          cart.push({
            product_id: productId,
            quantity: quantity,
            size: sizeId,
            color: colorId,
            unit_price: price,
          });
        }

        req.session.cart = cart;

        console.log(req.session.cart);

        // Gửi phản hồi thành công
        res.send("Sản phẩm đã được thêm vào giỏ hàng!");
      } else {
        res.send("Không tồn tại sản phẩm !!!");
      }
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm vào giỏ hàng:", error);
      res.status(500).send("Lỗi hệ thống");
    }
  },

  getCart(req, res) {
    const cart = req.session.cart || [];
    try {
      res.send(cart);
    } catch (error) {
      res.send(error);
    }
  },

  async deleteCart(req, res) {
    const id = req.params.id;
    const cart = req.session.cart || [];

    const productId = cart.findIndex((item) => item.product_id === id);

    if (productId !== -1) {
      cart.splice(productId, 1);
      req.session.cart = cart;
    }

    res.send("Xóa sản phẩm khỏi giỏ hàng thành công.");
  },
};

module.exports = cartController;
