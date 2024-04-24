const connection = require('../db/db.js');

class Categories {
    constructor(id_cate, name_cate){
        this.id_cate = id_cate,
        this.name_cate = name_cate
    };

    //them danh muc
    async createCate(){
        const sql = "INSERT INTO categories (name_cate) VALUES (?)";
        return await connection.query(sql, this.name_cate);
    }

    //xoa danh muc
    async destroyCate(){
        const sql = "DELETE FROM categories WHERE id_cate = ?";
        return await connection.query(sql, this.id_cate);
    }

    //sua danh muc
    async updateCate(){
        const sql = "UPDATE categories SET name_cate = ? WHERE id_cate = ?";
        return await connection.query(sql, [this.name_cate, this.id_cate]);
    }

}

module.exports = Categories;