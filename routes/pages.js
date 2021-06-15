const express = require('express');
const User = require('../core/user');
const pool = require('../core/pool');
const router = express.Router();


const user = new User();
let u;

router.get('/check', (req, res) => {
    if (req.session.admin == undefined) req.session.admin = 'guest';
    res.send([req.session.admin])
})
router.get('/updateTypingSpeed/:typSpeed', (req, res) => {
    console.log('HOHO', req.params.typSpeed, req.session.user.user_id)
    let sql = `UPDATE user 
    SET 
        typing_speed = ?
    WHERE
        user_id = ?;`
    pool.query(sql, [req.params.typSpeed, req.session.user.user_id],function(err, result) {
        if (err) throw err;
    });
});

router.get('/getHistoryId/:exId', (req, res) => {
    
    console.log('LELE', req.session.user.user_id);
    let sql = `SELECT * FROM history WHERE user_id = ?`;
    let sql2 = `INSERT INTO exercise_history(exercise_id, history_id) VALUES(?, ?)`;
    let sql3 = `SELECT  exercise_history_id FROM exercise_history WHERE exercise_id = ? AND history_id = ?;`;
    pool.query(sql, req.session.user.user_id, function(err, result) {
        if (err) throw err;
        console.log('LLLL', result[0].history_id)
        pool.query(sql3, [req.params.exId, result[0].history_id], function(err, result3) {
            if (err) throw err;
            console.log('GONG', result3, result3.length)
            // we should add into exercise_history
            if (result3.length == 0) {
                pool.query(sql2, [req.params.exId, result[0].history_id])
            }
        })
        
    })
});

router.get('/exercise/:id', (req,res)=>{
    console.log(req.params.id);
    console.log(req.params, 'PPPPP');
    console.log(req.method, 'WWWW');
    // random text
    if (req.params.id == 0){
        // query all texts
        var sql = `select * from exercise;`
        pool.query(sql, function(err, result) {
            if(err) throw err
            res.send(result)
        })
    } else {
        var sql = `select * from exercise where exercise_id = ${req.params.id};`
        pool.query(sql, function(err, result) {
            if(err) throw err
            res.send(result)
        })
    }

})

router.post('/exercise', (req,res)=>{
    console.log(req.params.id);
    console.log(req.params, 'PPPPP');
    console.log(req.method, 'WWWW');
    console.log(req.body, 'IDEMOOOOO   ');
    var sql = `INSERT INTO exercise(title, category_id, text) VALUES(?, ?, ?);`;
    var bind = [req.body.title, req.body.category, req.body.text];
    pool.query(sql, bind, function(err) {
        if (err) {
            res.send('Something went wrong :S! Exercise with that title already exists or category with that id does not exist!')
        } else {
            res.redirect('/texts.html');
        }
    });
})

router.put('/exercise/:id', (req,res)=>{
    console.log('SEEEEEEsew', req.body);
    console.log('JJJJ', req.params);
    var sql = `UPDATE exercise SET time_taken = ?, 
                      wpm = ?,
                      accuracy = ?,
                      wrong_chars = ?
    WHERE
        exercise_id = ?;`;
    
    var bind = [req.body.timeTaken, req.body.wpm, req.body.accuracy, req.body.wrongCs, req.params.id];
    pool.query(sql, bind);
})

router.post('/exercise/:id', (req,res)=>{
    console.log(req.params.id);
    console.log(req.params, 'PPPPP');
    console.log(req.method, 'WWWW');
    console.log(req.body, 'IDEMOOOOO   ');
    var sql = `UPDATE exercise SET title = ?, 
                      category_id = ?,
                      text = ?
    WHERE
        exercise_id = ?;`;
    
    var bind = [req.body.title, req.body.category, req.body.text, req.params.id];
    pool.query(sql, bind);
    res.redirect('/texts.html');
})

router.delete('/exercise/:id', (req,res)=>{
    console.log(req.params.id);
    console.log(req.params, 'PPPPP');
    console.log(req.method, 'WWWW');
    var sql = `delete from exercise where exercise_id = ?;`
    pool.query(sql, req.params.id)
    res.send('/texts.html');
})

router.get('/texts/:id', (req,res)=>{
    console.log(req.params.id);
    console.log(req.params, 'xxsxs');

    if (req.params.id == 'undefined'){
        console.log('yess')
        // query all texts
        var sql = `select * from exercise;`
        pool.query(sql, function(err, result) {
            if(err) throw err
            res.send(result)
        })
    } else {
        console.log('nooo')
        var sql = `select * from exercise where category_id = ${req.params.id};`
        pool.query(sql, function(err, result) {
            if(err) throw err
            res.send(result)
        })
    }

})


router.get('/photos', (req, res, next) => {
    var sql2 = 'select * from photo;'
    pool.query(sql2, function(err, result2) {
        res.send(result2)
    })
});
router.get('/categories', (req, res, next) => {
    var sql = 'select * from category;'
    pool.query(sql, function(err, result) {
        res.send(result)
    })
});

router.delete('/category/:id', (req,res)=>{
    console.log(req.params.id);
    console.log(req.params, 'PPPPP');
    console.log(req.method, 'WWWW');
    var sql = `delete from category where category_id = ?;`
    var sql2 = `delete from photo where category_id = ?;`
    pool.query(sql2, req.params.id, function(err, result) {
        pool.query(sql, req.params.id, function(err, result2) {
            res.send('/categories.html');
        })
    })
})

router.post('/category/:id', (req,res)=>{
    console.log(req.params.id);
    console.log(req.params, 'PPPPP');
    console.log(req.method, 'WWWW');
    console.log(req.body, 'IDEMOOOOO   ');
    var sql = `UPDATE category SET name = ?
        WHERE
        category_id = ?;`;
    var sql2 = `UPDATE photo SET image_path = ?
        WHERE
        category_id = ?;`;
    
    var bind = [req.body.categoryName, req.params.id];
    pool.query(sql, bind);
    var bind2 = [req.body.imagePath, req.params.id];
    pool.query(sql, bind2);
    res.redirect('/categories.html');
})
router.get('/category/:id', (req,res)=>{
    console.log(req.params.id);
    console.log(req.params, 'PPPPP');
    console.log(req.method, 'WWWW');
    console.log(req.body, 'IDEMOOOOO   ');
    var sql = `select * from category where category_id = ${req.params.id};`
    pool.query(sql, function(err, result) {
        if(err) throw err
        res.send(result)
    })
})

router.post('/category', (req,res)=>{
    console.log(req.params.id);
    console.log(req.params, 'PPPPP');
    console.log(req.method, 'WWWW');
    console.log(req.body, 'IDEMOOOOO   ');
    var sql = `INSERT INTO category(name) VALUES(?);`;
    var sql2 = `INSERT INTO photo(image_path, category_id) VALUES(?, ?);`;
    pool.query(sql, [req.body.categoryName], function(err, result) {
        if (err) res.send('Something went wrong :S')
        console.log('XXX', result)
        pool.query(sql2, [req.body.imagePath, result.insertId], function(err, result2) {
            if (err) res.send('Something went wrong :S')
            res.redirect('/categories.html')
        });
    });
})

router.get('/history', (req, res, next) => {
    // make sql select *
    user.findHistory(req.session.user.user_id, function(result) {
        if(result) {
            res.send(result);
        }
    });
});

router.get('/profile', (req, res, next) => {

    console.log(u, ' IDEMOO');

    res.send(u);
});

router.get('/', (req, res, next) => {
    let user = req.session.user;

    if(user) {
        res.redirect('/home');
        return;
    }
    res.render('index', {title:'My application'});
})

// get home page
router.get('/home', (req, res, next) => {
    let user = req.session.user;

    if(user) {

        console.log(user, {opp:req.session.opp, name:user.fullname}, req.session.admin)
        
        res.redirect('home.html');
        return;
    }

    res.redirect('/');
})

// post login data
router.post('/login', (req, res, next) => {
    
    user.login(req.body.username, req.body.password, function(result, adm) {
        if(result) {

            req.session.user = result;
            req.session.opp = 1;
            req.session.admin = adm;
            u = req.session.user;

            res.redirect('/home');
        } else {
            res.send('Username/Password incorrect!');
        }
         
    })

});


// post change pass
router.post('/changePass/:id', (req, res, next) => {
    let changeInput = {
        user_id: req.params.id,
        password: req.body.currentPassword,
        newPassword: req.body.newPassword,
        newPasswordConfirm: req.body.newPasswordConfirm,
    };
    console.log('LOLLL', changeInput)
    
    user.changePass(changeInput, function(result) {
        if(result) {
            console.log('MANAGED', result)
            req.session.user.password_hash = result;
            res.redirect('/profile.html');
        } else {
            console.log('MANAGED NOTTTT')

            res.send('Password incorrect or newPassword incorrect!');
        }
         
    })

});

// post register data
router.post('/register', (req, res, next) => {
    
    let userInput = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        typing_speed: 'very slow',
        confirm: req.body.confirm
    };

    user.create(userInput, function(lastId){
        if(lastId) {
            user.find(lastId, function(result) {
                req.session.user = result;
                req.session.opp = 1;
                req.session.admin = false;
                u = result;

                res.redirect('/home');
            })
        } else {
            res.send('Passwords must match!!')
        }
    })
});

router.get('/loggout', (req, res, next) => {
    if (req.session.user) {
        req.session.destroy(function() {
            res.redirect('/login.html')
        })
    } else {
        res.redirect('/login.html')
    }
})

module.exports = router;