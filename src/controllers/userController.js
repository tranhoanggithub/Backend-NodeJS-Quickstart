import userService from "../services/userService"
let handleLogin = async (req, res) => {
    let email = req.body.email;
    console.log("your email:" + email)
    let password = req.body.password;

    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: "Missing inputs parameter!"
        })
    }

    let userData = await userService.handleUserLogin(email, password);
    // check email exist
    //compare password
    //return userInfor
    //access_token : JWT json web token
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        userData: userData.user ? userData.user : {}
    })
}

let handleGetAllUsers = async (req, res) => {
    let id = req.body.id; //All , id
    console.log('id', id)
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameter',
            users: []
        })
    }
    let users = await userService.getAllUsers(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        users
    })

}

module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
}