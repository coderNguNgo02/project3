const accountService = require("../service/accountService.js");

const accountController = {
    async register(req, res){
        const username = req.body.username;
        const password = req.body.password;
        const role = req.body.role;

        try{
            await accountService.register(username, password, role);
            res.sendStatus(200);
        }catch(error){
            res.send(error);
        }
    },

    async login(req, res){
        const username = req.body.username;
        const password = req.body.password;
        
        try{
            await accountService.login(username, password);
            res.status(200).send('done');
        }catch(erorr){
            res.send(erorr);
        }
    },

    async updateProduct(req, res){
        const idAcc = req.params.id;
        const username = req.body.username;
        const password = req.body.password;
        const role = req.body.role;

        try{
            await accountService.updateAccount(idAcc, username, password, role);
            res.status(200).send("Cat nhat thong tin tai khoan thanh cong !");
        }catch(error){
            res.send(error);
        }
    },

    async deleteAccount(req, res){
        const idAcc = req.params.id;

        try{
            await accountService.deleteAccount(idAcc);
            res.status(200).send("Xoa tai khoan thanh cong !");
        }catch(error){
            res.send(error);
        }
    }


}

module.exports = accountController;