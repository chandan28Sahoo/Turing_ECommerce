// customer rigester
module.exports=((customer,knex)=>{
    customer
        .post('/sign_up',(req,res)=>{
            var decition = false;
            knex.select('*').from('customer')
            .then(row=>{
                if (row.length==0){
                    knex('customer').insert([req.body])
                    .then(row=>{
                        res.send('sucessfully done');
                    }).catch(err=>{
                        res.send(err)
                    })
                }else{       
                    knex.select('*').from('customer')
                    .then(row=>{
                        for (i in row){     
                            if(row[i].email===req.body.email && row[i].name===req.body.name){
                                decition = true
                            }else{
                                decition = false;
                            }
                        }if (decition){ 
                            res.send("data is alredy existed")
                        }else{
                            knex('customer').insert(req.body)
                            .then(row=>{
                                res.send("secuessfully sign up. !")
                            }).catch(err=>{
                                res.send(err)
                            })
                        }
                    })
                }
            })
    })
})


// customer login
module.exports = ((customer,knex,jwt)=>{
    customer
        .post('/login',(req,res)=>{
            knex.select('*').from('customer')
            .then(rows=>{
                var condition=false;
                for (i of rows){
                    if (i.email == req.body.email && i.password == req.body.password){
                            condition=true;
                            var token = jwt.sign({"email":req.body.email},'secret')
                    }
                }
                if (condition){
                    res.json({"message":'login sucessfully',"token":token})
                }
                else{
                    res.send("Invalid email & password ! try again !"); 
                }
            })
        })
})


// get customer by id
module.exports=((customer,knex)=>{
    customer
        .get('/:customer_id',(req,res)=>{
            knex
            .select('*')
            .from('customer')
            .where('customer_id',[req.params.customer_id])
            .then(data=>{
                res.send(data);
            }).catch(err=>{
                res.send(err)
            })
        })
})


// update
module.exports=((updates,knex,jwt)=>{
    updates
        .put('/',(req,res)=>{
            let decode = jwt.verify(req.headers.authorization,'secret')
            var user=req.body
            knex('customer')
            .where('email',decode.email)
            .update(user)
            .then(data=>{
                res.send(202);
            }).catch(err=>{
                res.send(err);
            })
        })
})

// ###################

// Get a customer by ID. The customer is getting by Token.
module.exports=((details,knex,jwt)=>{
    details
        .get('/',(req,res)=>{
            let decode = jwt.verify(req.headers.authorization,'secret')
            knex('customer')
            .where('email',decode.email)
            .then(data=>{
                res.send(data);
            }).catch(err=>{
                res.send(err);
            })
        })
})


// Update the address from customer
module.exports=((updates,knex,jwt)=>{
    updates
        .put('/',(req,res)=>{
            let decode = jwt.verify(req.headers.authorization,'secret')
            var address_1=req.body.address_1;
            var address_2=req.body.address_2;
            knex('customer')
            .where('email',decode.email)
            .update({'address_1':address_1,"address_2":address_2})
            .then(data=>{
                res.sendStatus(200);
            }).catch(err=>{
                res.send(err);
            })
        })
})

// Update the credit card from customer
module.exports=((updates,knex,jwt)=>{
    updates
        .put('/',(req,res)=>{
            let decode = jwt.verify(req.headers.authorization,'secret')
            var credit_card=req.body.credit_card;
            knex('customer')
            .where('email',decode.email)
            .update({'credit_card':credit_card})
            .then(data=>{
                res.sendStatus(200);
            }).catch(err=>{
                res.send(err);
            })
        })
})