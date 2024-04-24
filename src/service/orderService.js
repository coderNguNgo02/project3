const Order = require('../model/order.js');

const orderService = {

    async createOrder(data, cus_name, cus_add, cus_phone){
        let totalPrice = 0;
        const pricePrd = data.map(cart => (cart.unit_price * cart.quantity));
        const date = new Date();
        const cart = data;
        // for(let i = 0; i <= data.length; i++){
        //     totalPrice += data[i].unit_price * data[i].quantity
        // }

        let currentDate = new Date().toISOString().slice(0, 10)

        for(let i = 0; i < pricePrd.length; i++){
            totalPrice += pricePrd[i];
        }

        const order = new Order(null, totalPrice, currentDate, cus_name, cus_add, cus_phone);
        order.createOrder(data);
    }
}

module.exports = orderService;