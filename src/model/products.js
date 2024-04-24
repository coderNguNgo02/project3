const connection = require("../db/db.js");

class Product {
  constructor(
    id_prd,
    cate,
    name_prd,
    img_prd,
    size,
    color,
    price,
    quantity,
    description
  ) {
      (this.id_prd = id_prd),
      (this.cate = cate),
      (this.name_prd = name_prd),
      (this.img_prd = img_prd),
      (this.size = size),
      (this.color = color),
      (this.price = price),
      (this.quantity = quantity),
      (this.description = description);
  }

  //Them san pham
  async addProduct() {
    const sql =
      "INSERT INTO product (name_prd, price, description, img_prd) VALUES (?,?,?,?)";
    return await connection.query(sql, [
      this.name_prd,
      this.price,
      this.description,
      this.img_prd,
    ]);
  }

  async addDetailProduct() {
    const sql =
      "INSERT INTO product_manage (id_prd, id_color, id_size, id_cate, quantity) VALUES (?,?,?,?,?)";

    return await connection.query(sql, [
      this.id_prd,
      this.color,
      this.size,
      this.cate,
      this.quantity,
    ]);
  }

  // xoa san pham
  async destroyProduct() {
    const sql =
      "DELETE FROM product_manage WHERE id_prd = ? AND id_size = ? AND id_color = ?";

    return await connection.query(sql, [this.id_prd, this.color, this.size]);
  }

  //sua san pham
  async updateProduct() {
    const sql =
      "UPDATE product SET name_prd = ?, img_prd = ?, price = ?, description = ? WHERE id_prd = ?";

    return await connection.query(sql, [
      this.name_prd,
      this.img_prd,
      this.price,
      this.description,
      this.id_prd,
    ]);
  }

  async updateDetailProduct() {
    const sql =
      "UPDATE product_manage SET quantity = ?, id_cate = ? WHERE id_prd = ? AND id_color = ? AND id_size = ?";

    return await connection.query(sql, [
      this.id_prd,
      this.cate,
      this.color,
      this.size,
      this.quantity
    ]);
  }

  async getAllProduct() {
    const sql =
      "SELECT * FROM product INNER JOIN product_manage ON product.id_prd = product_manage.id_prd";

    return new Promise((resolve, reject) => {
      connection.query(sql, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  async findById(idPrd) {
    const sql = "SELECT * FROM product INNER JOIN product_manage ON product.id_prd = product_manage.id_prd WHERE product.id_prd = ?";

    return new Promise((resolve, reject) => {
      connection.query(sql, idPrd, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }
}

module.exports = Product;
