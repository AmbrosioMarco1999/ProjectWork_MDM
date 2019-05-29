// Welcome Page
exports.index_request = async function(req, res) {
    try{
        res.render('home');
    }catch(err){
        console.log(err);
    }
}

// Dashboard
exports.index_requestDashboard = async function(req, res) {
    try{
        res.render('dashboard',{
            user : req.user,
            scad : req.session.cookie.maxAge / 1000
        });
    }catch(err){
        console.log(err);
    }
}

//Info
exports.index_requestInfo = async function(req, res) {
    try{
        res.render('info');
    }catch(err){
        console.log(err);
    }
}
