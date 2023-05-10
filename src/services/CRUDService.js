import bcrypt from 'bcrypt';
import db from '../models/index'

const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
  console.log("data: ", data);
  return new Promise(async (resolve, reject) => {
    try {
      let hashPasswordFromBcrypt = await hashUserPassword(data.pass);
      await db.User.create({
        email: data.email,
        password: hashPasswordFromBcrypt,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phonenumber: data.phone,
        gender: data.gender === '1' ? true : false,
        roleId: data.roleId
      })

      resolve('ok create a new user succeed!')
    } catch (e) {
      rejected(e);
    }

  })
};
let hashUserPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};
let getAllUsers = () => {
  return new Promise((resolve, reject) => {
    try {
      let users = db.User.findAll({
        raw: true,
      })
      resolve(users);
    } catch (e) {
      reject(e)
    }
  })
}


module.exports = {
  createNewUser: createNewUser,
  getAllUsers: getAllUsers,
};
