import db from "../models/index";
import bcrypt from 'bcrypt';

const salt = bcrypt.genSaltSync(10);
// let hashUserPassword = (password) => {
//     // const salt = bcrypt.genSaltSync(10);
//     // return bcrypt.hashSync(password, salt);
//     return new Promise(async (resolve, reject) => {
//         try {
//             let hashPassword = await bcrypt.hashSync(password, salt);
//             resolve(hashPassword);
//         } catch (e) {
//             reject(e);
//         }
//     })
// };
let hashUserPassword = (password) => {
    try {
        let hashPassword = bcrypt.hashSync(password, salt);
        return hashPassword;
    } catch (e) {
        throw e;
    }
};


let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);
            if (isExist) {
                //user already exists
                //compare password
                let user = await db.User.findOne({
                    attributes: ['email', 'roleId', 'password'],
                    where: { email: email },
                    raw: true
                });
                if (user) {
                    //compare password
                    var check = await bcrypt.compareSync(password, user.password); // false
                    console.log(">>>>>>>>", check);
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = 'Ok';
                        console.log(user)
                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = "Wrong password";
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = `User's not found`
                }

            } else {
                //return error
                userData.errCode = 1;
                userData.errMessage = `Your's Email isn't exist in your system. Plz try other email`
            }

            resolve(userData)
        } catch (e) {
            reject(e);
        }
    })
}
// let getAllUsers = () => {
//     return new Promise((resolve, reject) => {
//         try {
//             let users = db.User.findAll({
//                 raw: true,
//             })
//             resolve(users);
//         } catch (e) {
//             reject(e)
//         }
//     })
// }
let getAllUsers = (userId) => {
    console.log('userId', userId)
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (userId === 'All') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            if (userId && userId !== 'All') {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            resolve(users)
        } catch (e) {
            reject(e)
        }
    })
}


let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (e) {
            reject(e);
        }
    })
}



let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            //check email is exist
            let check = await checkUserEmail(data.email);
            if (check === true) {
                resolve({
                    errCode: 1,
                    errMessage: 'Your email is already in used , Please trnpmy again'
                })
            } else {
                let hashPasswordFromBcrypt = await hashUserPassword(data.password);
                await db.User.create({
                    email: data.email,
                    password: hashPasswordFromBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phonenumber: data.phonenumber,
                    gender: data.gender === '1' ? true : false,
                    roleId: data.roleId
                })

                resolve({
                    errCode: 0,
                    message: 'Ok'
                })
            }


        } catch (e) {
            reject(e);
        }
    })
}


let deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        // let check = await checkUserEmail(data.email);
        // if (check == true) {
        //     resolve({
        //         errCode: 1,
        //         message: 'Your email is already in used , Plz try another email'
        //     })
        // }
        let foundUser = await db.User.findOne({
            where: { id: id }
        })
        if (!foundUser) {
            resolve({
                errCode: 2,
                errMessage: `The user isn't exist`
            })
        }
        // await foundUser.destroy();
        await db.User.destroy({
            where: { id: id }
        })
        resolve({
            errCode: 0,
            errMessage: `The user is deleted`
        })
    })
}

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameter',
                })
            }
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false
            })
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                await user.save();
                resolve({
                    errCode: 0,
                    message: 'Update the user successfully'
                });
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'Users not found'
                });
            }

        } catch (e) {
            reject(e);
        }
    })
}
module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    updateUserData: updateUserData
}