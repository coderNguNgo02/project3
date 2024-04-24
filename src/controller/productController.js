const productService = require("../service/productService.js");

const productController = {

  //them san pham
  async createProduct(req, res) {
    const namePrd = req.body.name_prd;
    const imgPrd = req.body.img_prd;
    const price = req.body.price;
    const description = req.body.description;

    try {
      await productService.insertProduct(
        namePrd,
        price,
        description,
        imgPrd,
      );
      res.status(200).send("Them san pham thanh cong.");
    } catch (error) {
      res.status(500).send(error);
    }
  },

  async createDetailProduct(req, res) {
    const data = req.body;
    try {
      await productService.insertDetailProduct(
        data.id_prd,
        data.id_color,
        data.id_size,
        data.id_cate,
        data.quantity
      );
      res.status(200).send("Them san pham thanh cong.");
    } catch (error) {
      res.status(500).send(error);
    }
  },

  //xoa san pham
  async deleteProduct(req, res) {
    const data = req.params;

    try{
      await productService.destroyProduct(data.id,data.size,data.color);
      res.status(200).send("Xoa san pham thanh cong");
    }catch(error){
      res.status(500).send(error);
    }
  },

  //cat nhat san pham
  async editProduct(req, res){
    const idCate = req.body.idCate;
    const namePrd = req.body.namePrd;
    const imgPrd = req.body.imgPrd;
    const price = req.body.price;
    const description = req.body.description;
    const idPrd = req.params.id;
    console.log(imgPrd);
    try{
      await productService.updateProduct(idPrd, idCate, namePrd, imgPrd, price, description);
      res.status(200).send("Cat nhat san pham thanh cong");
    }catch(error){
      res.status(500).send(error);
    }
  },

  async editDetailProduct(req, res){
    const quantity = req.body.quantity;
    const data = req.params;

    try {
      await productService.updateDetailProduct(
        data.id,
        data.color,
        data.size,
        quantity
      );
      res.status(200).send("Cat nhat san pham thanh cong.");
    } catch (error) {
      res.status(500).send(error);
    }
  }

};

module.exports = productController;
