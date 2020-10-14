const User = require('../models/user');
const user = require('../models/user');

//hendle erros
const handleErros = (err) => {
    console.log(err.messege, err.code);
}

module.exports.signup_get = (req, res) => {
    res.render('signup');
}

module.exports.login_get = (req, res) => {
    res.render('login');
}

module.exports.signup_post = async (req, res) => {
    const {email,password} = req.body;
    try {
      const user = await User.create({email,password});
      res.status(201).json(user);
    } catch (err) {
        handleErros(err);
        res.status(400).send('error, user not created');
    }
}

module.exports.login_post = async (req, res) => {
    const {email,password} = req.body;
    console.log(email,password);

    res.send('user login');
}
