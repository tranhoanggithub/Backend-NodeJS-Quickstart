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
                    attributes: ['email', 'roleId', 'password', 'firstName', 'lastName'],
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
    console.log('userId', userId);
    return new Promise(async (resolve, reject) => {
        try {
            let users = [];
            if (userId === 'ALL') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                });
            }
            if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password']
                    }
                });
            }
            resolve(users);
        } catch (e) {
            reject(e);
        }
    });
};



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
                    gender: data.gender,
                    roleId: data.roleId,
                    positionId: data.positionId,
                    image: data.avatar
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
            if (!data.id || !data.roleId || !data.positionId || !data.gender) {
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
                user.roleId = data.roleId;
                user.positionId = data.positionId;
                user.gender = data.gender;
                user.phonenumber = data.phonenumber;
                if (data.avatar) {
                    user.image = data.avatar;
                }

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

let getAllCodeService = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!typeInput) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters !'
                })
            } else {
                let res = {};
                let allcode = await db.Allcode.findAll({
                    where: { type: typeInput }
                });
                res.errCode = 0;
                res.data = allcode;
                resolve(res);
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
    updateUserData: updateUserData,
    getAllCodeService: getAllCodeService
}