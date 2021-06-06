const pool = require('./pool');
const bcrypt = require('bcrypt');



function User() {};

User.prototype = {
    // Find the user data by id or username.
    find : function(user = null, callback)
    {
        // if the user variable is defind
        if(user) {
            // if user = number return field = id, if user = string return field = username.
            var field = Number.isInteger(user) ? 'user_id' : 'username';
        }
        // prepare the sql query
        let sql = `SELECT * FROM user WHERE ${field} = ?`;
        let sql2 = `SELECT * FROM administrator WHERE username = ?`;


        pool.query(sql, user, function(err, result) {
            if(err) throw err

            if(result.length) {
                console.log('RESULTTT ', result)
                // find all history of this user
                console.log('Usernaaaaame ', result[0].user_id)

                callback(result[0], false);
            }else {
                // if we cant find him in user try in administrator???
                //if callback(result2[0], true);
                // else callback(nulll)
                pool.query(sql2, user, function(err, result2) {
                    if(result2.length) {
                        callback(result2[0], true);
                    } else {
                        callback(null);
                    }
                })
                
            }
        });
    },
    findHistory : function(userId = null, callback)
    {
        // prepare the sql query
        let sql = `SELECT * FROM history WHERE user_id = ?`;
        let sql2 = `SELECT * FROM exercise_history WHERE history_id = ?`;
        let sql3 = `SELECT * FROM exercise WHERE exercise_id IN (?)`;

        let exercises = [];
        pool.query(sql, userId, function(err, result) {
            if(err) throw err

            console.log('AJMOOOOOOO ', result, result.length, result[0])
            pool.query(sql2, result[0].history_id, function(err, result2) {
                if(err) throw err
                console.log('OOOOOOO  ');
                var exIds = []
                for (var ex of result2) {
                    console.log(ex)
                    // just query and store into exercises
                    exIds.push(ex.exercise_id)
                }
                console.log('EXERCISE IDSSSS', exIds)
                if (exIds.length != 0) {
                    pool.query(sql3, [exIds], function(err, result3) {
                        console.log('WTF', result3, result3[0])
                        if(result3.length) {
                            console.log('HIIHIHI ', result3[0])
                            callback(result3);
                        } else {
                            callback([]);
                        }
                    });
                } else {
                    callback([]);
                }
                // wait to finish 3rd query
                
            })
            
        });
    },

    create : function(body, callback)
    {
        if (body.password != body.confirm) {
            callback();
            return;
        }  
        let pwd = body.password;
        body.password = bcrypt.hashSync(pwd,10);

        var bind = [];

        for(prop in body) {
            bind.push(body[prop]);
        }
        bind.pop();
        
        // prepare the sql query
        let sql = `INSERT INTO user(username, email, password_hash, typing_speed) VALUES (?, ?, ?, ?)`;
        let sql2 = `INSERT INTO history(average_speed, user_id) VALUES (?, ?)`;

        pool.query(sql, bind, function(err, result) {
            if (err) throw err;
            // make also history for this user
            pool.query(sql2, [0, result.insertId]);
            callback(result.insertId);
        })


    },

    login : function(username, password, callback)
    {
        // find the user data by his username.
        this.find(username, function(user, adm) {
            // if there is a user by this username.
            if(user) {
                // now we check his password.
                if(bcrypt.compareSync(password, user.password_hash)) {
                    // return his data.
                    callback(user, adm);
                    return;
                }  
            }
            // if the username/password is wrong then return null.
            callback(null);
        });
        
    }
}

module.exports = User;