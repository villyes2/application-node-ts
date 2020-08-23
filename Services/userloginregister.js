const UserHWR = require('../HWR/userHWR');
var UPass = require("../Models/User");
let register = async (req, res) => {
 // console.log(req)
  if (!req.body.email || !req.body.password) {
    res.status(401).json({message:'Parameters are missing'})
  } else {
    try {
      let criteria = {
        email: req.body.email
      } 
     // console.log(req)
    // console.log(UserDAO.getUsers)
    //console.log(criteria)
      const checkEmail = await UserHWR.getUsers(criteria);
     // console.log(checkEmail)
      if (checkEmail && checkEmail.length==1) {
        res.status(401).json({message:'email already registered'})
      } else {
        let userData = {
          username: req.body.username ? req.body.username : "",
          email: req.body.email,
          password: req.body.password,
          status: true
        };
        const addUser = await UserHWR.createUser(userData);
        // console
        if (addUser) {
          res.status(200).json({message:'User registered successfully!'})
        } else {
          res.status(403).json({message:"Something went already wrong"});
        }
      }
    } catch (error) {
      res.status(404).json({message:"Something went wrong",error:error});
    }
  }
};


/* API to login user */
let login = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(401).json({message:'Parameters are missing'});
  } else {
    try {
      let criteria = {
        email: req.body.email
      //  status: true
      };
      const checkEmail = await UserHWR.getUsers(criteria);
      if (checkEmail) {
        let criteria = {
          email: req.body.email,
         /// password: MD5(MD5(req.body.password))
          password: UPass.validPassword(password)
         
        };
        console.log(password)
        const checkPassword = await UserHWR.getUsers(criteria);
        if (checkPassword && checkPassword.length==1) {
          res.status(200).json({message:'Logged in successfully!',result:checkPassword});
        } else {
          res.status(401).json({message:'Incorrect password'});
        }
      } else {
        res.status(401).json({message:'Email not exist!'});
      }
    } catch (error) {
      res.status(401).json({message:'Something went wrong here',error:error});
    }
  }
};
//console.log("coming here also");
module.exports = {
  register: register,
  login: login
}
