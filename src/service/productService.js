const { sign } = require("jsonwebtoken");
const Product = require("../model/products.js");

const productService = {
  //them san pham
  async insertProduct(namePrd, price, description, imgPrd) {
    const prd = new Product(
      null,
      null,
      namePrd,
      imgPrd,
      null,
      null,
      price,
      null,
      description
    );
    return await prd.addProduct();
  },

  async insertDetailProduct(id_prd, idColor, idSize, idCate, quantity) {
    const prd = new Product(
      id_prd,
      idCate,
      null,
      null,
      idSize,
      idColor,
      null,
      quantity,
      null
    );

    return await prd.addDetailProduct();
  },

  //xoa san pham
  async destroyProduct(idPrd, idSize, idColor) {
    const prd = new Product(
      idPrd,
      null,
      null,
      null,
      idSize,
      idColor,
      null,
      null
    );

    return await prd.destroyProduct();
  },

  //sua san pham
  async updateProduct(idPrd, idCate, namePrd, imgPrd, price, description) {
    const prd = new Product(
      idPrd,
      idCate,
      namePrd,
      imgPrd,
      null,
      null,
      price,
      null,
      description
    );

    return await prd.updateProduct();
  },

  async updateDetailProduct(id_prd, idColor, idSize, quantity){
    const prd = new Product(
      id_prd,
      null,
      null,
      null,
      idSize,
      idColor,
      null,
      quantity,
      null
    );

    return await prd.updateDetailProduct();
  }
};

module.exports = productService;
