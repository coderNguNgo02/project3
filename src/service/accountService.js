const Account = require("../model/account.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const accountService = {
  //dang ky
  async register(username, password, role) {
    var re =
      /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

    const check = re.test(password);

    if (re.test(password)) {
      const hash = await bcrypt.hash(password, 10);
      const account = new Account(null, username, hash, role);
      return await account.registerAccount();
    } else {
      console.log("Username or password is wrong format...");
    }
  },

  //dang nhap
  async login(username, password) {
    const account = new Account(null, username, null, null);
    const result = await account.getLogin();

    if (result) {
      const rs = Object.values(result);
      const id_acc = rs[0];
      const pass = rs[1];
      const role = rs[2];

      const payLoad = {
        id_acc: id_acc,
        username: username,
        level: role,
      };

      const check = await bcrypt.compare(password, pass);

      if (check === true && role === 1) {
        console.log("Trang admin");
        const generateAccessToken = await jwt.sign(
          payLoad,
          process.env.SECRET_KEY_ACCESS_TOKEN,
          {expiresIn:"15m"}
        );

        const refreshToken  = await jwt.sign(
          payLoad,
          process.env.SECRET_KEY_REFRESH_TOKEN,
          {expiresIn:"3h"}
        );

        console.log(refreshToken + " s");

        account.generateRefreshToken(id_acc, refreshToken);

        return result;
      } else if (check === true && role === 2) {
        
        console.log("Trang user");

        const generateAccessToken = await jwt.sign(
          payLoad,
          process.env.SECRET_KEY_ACCESS_TOKEN,
          {expiresIn:"15m"}
        );

        const refreshToken  = await jwt.sign(
          payLoad,
          process.env.SECRET_KEY_REFRESH_TOKEN,
          {expiresIn:"3h"}
        );

        console.log(refreshToken + " s");

        account.generateRefreshToken(id_acc, refreshToken);
        return result;
      }
    }

    return console.log("Khong ton tai tai khoan!!!");
  },

  //Sua thong tin tai khoan
  async updateAccount(idAcc, username, password, role) {
    var re =
      /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

    if (re.test(password)) {
      const hash = await bcrypt.hash(password, 10);
      const account = new Account(idAcc , username, hash, role);
      return await account.update();
    } else {
      console.log("Username or password is wrong format...");
    }
  },

  async deleteAccount(id_acc) {
    const account = new Account(id_acc, null, null, null);
    return await account.delete();
  }
};

module.exports = accountService;
