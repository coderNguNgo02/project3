const cateService = require('../service/cateService.js');

const cateController = {
    
    //them danh muc
    async createCate(req, res){
        const data = req.body;

        try{
            await cateService.createCate(data.nameCate);

            res.send("Them danh muc thanh cong.");
        }catch(error){
            res.status(500).send(error);
        }
    },

    //xoa danh muc
    async deleteCate(req, res){
        const data = req.body;

        try{
            await cateService.destroyCate(data.idCate);

            res.send("Xoa danh muc thanh cong.");
        }catch(error){
            res.status(500).send(error);
        }
    },

    //sua danh muc
    async editCate(req, res){
        const data = req.body;

        try{
            await cateService.updateCate(data.idPrd, nameCate);

            res.send("Sua danh muc thanh cong.");
        }catch(error){
            res.status(500).send(error);
        }
    }
}

module.exports = cateController;