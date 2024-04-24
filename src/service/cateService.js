const Categories = require('../model/categories.js');

const cateService = {

    //them danh muc
    async createCate(name_cate){
        const cate = new Categories(null, name_cate);

        return await cate.createCate();
    },

    //xoa danh muc
    async destroyCate(id_cate){
        const cate = new Categories(id_cate, null);

        return await cate.destroyCate();
    },

    //sua danh muc
    async updateCate(id_cate, name_cate){
        const cate = new Categories(id_cate, name_cate);

        return await cate.updateCate();
    }
}

module.exports = cateService;