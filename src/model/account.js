const connection = require("../db/db.js");

class Account {
    constructor(id_acc, username, password, role, refreshToken){
        this.id_acc = id_acc,
        this.username = username,
        this.password = password,
        this.role = role,
        this.refreshToken = refreshToken
    }

    async registerAccount(){
      const sql = "INSERT INTO account (username, password, role) VALUES (?,?,?)";
      return await connection.query(sql, [this.username, this.password, this.role]);
    }

    async getLogin(){
        const sql = "SELECT id_acc, password, role FROM account WHERE username = ?";
        return new Promise((resolve, reject) => {
            connection.query(sql, this.username, (error, results) => {
              if (error) {
                reject(error);
              } else {
                resolve(results[0]);
              }
            });
        });
    }

    async update(){
      const sql = "UPDATE account SET username = ?, password = ?, role = ? WHERE id_acc = ?";
      return await connection.query(sql, [this.username, this.password, this.role, this.id_acc]); 
    }

    async delete(){
      const sql = "DELETE FROM account WHERE id_acc = ?";
      return await connection.query(sql, this.id_acc);
    }

    async generateRefreshToken(id_acc, refreshToken){
      const sql = "UPDATE account SET refresh_token = ? WHERE id_acc = ?";
      return await connection.query(sql, [refreshToken, id_acc]);
    }

}

module.exports = Account;