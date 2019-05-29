const Test = require('../models/user')
const bcrypt = require('bcryptjs');

// Welcome Page
exports.test_main = async function(req, res) {
    try{
        res.send({message: "Benventuto nell area di test"});
    }catch(err){
        res.send({message: 'err'});
        console.log(err);
    }
}

exports.test_requestTest= async function(req, res) {
    try{
        res.render('test');
    }catch(err){
        res.send({message: 'err'});
        console.log(err);
    }
}

exports.test_dbFill = async function(req, res) {
    try{
        email = 'guest@gmail.com';
        name = 'guest';
        surname = 'guest';
        employeeId = 00000;
        password ='guestguest';
        const newTest = new Test({
            email,
            name,
            surname,
            employeeId,
            password
        });
        newTest
        .save()
        .then(test => {
            res.send({message: 'Inserito'});
        })
        .catch(err => {
            res.send({message: 'errore'});
        })
    }catch(err){
        res.send({message: 'fail'});
        console.log(err);
    }
}

exports.test_dbGet = async function(req, res) {
    try{
        Test.findOne({
            email: 'guest@gmail.com'
        })
        .then(Test =>{
            res.send({message: Test});
        })
        .catch(err => {
            res.send({ message: 'error'});
        })
    }catch(err){
        console.log(err);
        res.send({message: 'err'});
    }
}

exports.test_error = async function(req, res) {
    try{
        req.flash('success_msg', 'Heyhey funziono');
        res.redirect('/dashboard');
    }catch(err){
        console.log(err);
    }
}

exports.test_deleteUser = async function(req, res) {
    try{
        Test.findOneAndDelete({
            email: 'guest@gmail.com'
        })
        .then(Test =>{
            res.send({message: 'Eliminato'});
        })
        .catch(err => {
            res.send({ message: 'Errore'});
        })
    }catch(err){
        console.log(err);
    }
}

exports.test_modifyRequest = async function(req, res) {
    try{
        res.render('modifyRequest');
    }catch(err){
        console.log(err);
        res.send({message: 'err'});
    }
}

exports.test_modify = async function(req, res) {
    try{
        let userEmail = req.body;
        Test.findOne({
            email: userEmail.email
        })
        .then(Test =>{
            let email = Test.email;
            let name = Test.name;
            let surname = Test.surname;
            let employeeId = Test.employeeId;
            let password = '';
            res.render('modifyUser',{
                email,
                name,
                surname,
                employeeId,
                password
            });
        })
        .catch(err => {
            res.send({ message: 'error'});
        })
    }catch(err){
        console.log(err);
        res.send({message: 'err'});
    }
}

exports.test_modifyPost = async function(req, res) {
    try{
        let data = req.body;
        Test.findOne({
            email: data.email
        })
        .then(Test =>{
            Test.email = data.email,
            Test.name = data.name,
            Test.surname = data.surname,
            Test.employeeId = data.employeeId,
            Test.password =  bcrypt.hashSync(data.password, 10);
            Test.save();
            res.send({message: 'Modified'});
        })
        .catch(err => {
            res.send({ message: 'error'});
            console.log(err);
        })
    }catch(err){
        console.log(err);
        res.send({message: 'err'});
    }
}