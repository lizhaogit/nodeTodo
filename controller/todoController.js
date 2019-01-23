module.exports = function (app) {
    var bodyParser = require('body-parser');
    var mysql      = require('mysql');
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'password',
        port: '3306',
        database : 'todo'
    });
    connection.connect();
    var urlencodeParser = bodyParser.urlencoded({extended:false})

    //获取数据
    app.get('/todo',function (req, res) {
        var  sql = 'SELECT * FROM todos';
        connection.query(sql,function (err, result) {
            if(err){
                return;
            }
            res.render('todo',{todos:result});
        });
    });

    //传递数据
    app.post('/todo',urlencodeParser,function (req,res) {
        var  addSql = 'INSERT INTO todos(item,state) VALUES(?,0)';
        var  addSqlParams = [req.body.item,0];
        connection.query(addSql,addSqlParams,function (err, result) {
            if(err){
                return;
            }
        });
    });

    // 删除数据
    app.delete('/delete/:item',function (req, res) {
        var delSql = 'DELETE FROM todos where item="'+req.params.item+'"';
        connection.query(delSql,function (err, result) {
            if(err){
                return;
            }
            res.json(result)
        });
    });

    // 更新数据
    app.post('/complete',urlencodeParser,function (req, res) {
        var modSql = 'UPDATE todos SET state = '+req.body.state+' WHERE item="'+req.body.item+'"';
        connection.query(modSql,function (err, result) {
            if(err){
                console.log(err)
                return;
            }
            res.json(result)
        });
    });
}