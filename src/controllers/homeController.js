import db from '../models/index'
let getHomePage = async (req, res) => {
    try{
        let data= await db.User.findAll();
        console.log(data)
        return res.render('homepage.ejs',{
            data: JSON.stringify(data)
        });
    }catch(e){
        console.log(e)
    }


}

let getAboutPage = (req, res) => {
    return res.render('test/about.ejs');
}

let getCRUD = (req, res) =>{
    return res.render('crud.ejs');
}

let postCRUD = (req, res) => {
    console.log(req.body);
  return res.send("post CRUD form server");
};

// object: {
//     key: '',
//     value: ''
// }
module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
}
