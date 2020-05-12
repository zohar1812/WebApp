function UpdateQuantity(req, res){
    for(let i=0 ;i<10;i++){//Change
        const sql1 = `SELECT quantity from Product where prodid ='${req.list[i].prodid}'`;//Change
        const query1 = config.connection.query(sql, (err, result) => {
        // if (err) throw err;
            if (result.length != 0) {
                res.redirect('/', {error: 'No such product '})
            }
            } );  
            const sql2 = `UPDATE Product Set quantity -= '${req.list[i].prodid}' from Product where prodid ='${req.list[i].prodid}'`;//Change
            const query2 = config.connection.query(sql, (err, result) => {
            // if (err) throw err;
            console.log("record updated")
            res.redirect('/')
            });
            const sql3 = `UPDATE incomeByType Set totalIncome += '${req.list[i].price}' from Product where category ='${req.list[i].category}'`;//Change
            const query3 = config.connection.query(sql, (err, result) => {
            // if (err) throw err;
            console.log("record updated")
            res.redirect('/')
            });
        }
}

function checkstock(req,res) {
    for(let i=0 ;i<10;i++){//Change
        const sql = `SELECT quantity from Product where prodid ='${req.list[i].prodid}'`;//Change
        const query = config.connection.query(sql, (err, result) => {
            // if (err) throw err;
            if (result-'${req.body[i].prodid}' < 0) 
                res.redirect('/', {error: 'not in stock'})
       });
    }
}

