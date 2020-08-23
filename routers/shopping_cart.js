module.exports=((shopping_cart,knex)=>{
    // Generete the unique CART ID
    shopping_cart
        .get('/',(req,res)=>{
            var id=Math.round((Math.random()*100)+1);
            var cart_id=({ cart_id:id });
            res.send(cart_id);
        })

//     ///Add a Product in the cart 
    shopping_cart
        .post('/shopping_cart/Add_Product',(req,res)=>{
            var id=Math.round((Math.random()*100)+1);
            var cart_id=id;
            let add_data={
                'cart_id':cart_id,
                'product_id':req.body.product_id,
                'attributes':req.body.attributes,
                'quantity':5,
                'added_on':new Date()
            }
            knex('shopping_cart')
            .insert(add_data)
            .then(()=>{
                knex.select('item_id','name','attributes','shopping_cart.product_id','price','quantity','image')
                .from('shopping_cart')
                .join('product', function() {
                    this.on('shopping_cart.product_id','=','product.product_id')
                })
                .then(data=>{
                    let list_data=[]
                    for(i of data){
                        let subtotal=i.quantity * i.price;
                        i.subtotal=subtotal
                    }
                    list_data.push(i)
                    res.send(list_data)

                }).catch(err=>{
                    console.log(err);
                })
                
            }).catch(err=>{
                res.send(err);
            })
        })
//         // get by cart id
    shopping_cart
        .get('/shopping_cart/:cart_id',(req,res)=>{
            knex.select('item_id','name','attributes','shopping_cart.product_id','price','quantity','image')
            .from('shopping_cart')
            .join('product', function() {
                this.on('shopping_cart.product_id','=','product.product_id')
            })
            .where('shopping_cart.cart_id',req.params.cart_id)
            .then(data=>{
                let list_data=[]
                for(i of data){
                    let subtotal=i.quantity * i.price;
                    i.subtotal=subtotal
                    list_data.push(i)
                }
                console.log(list_data)
                res.send(list_data)
            }).catch(err=>{
                console.log(err);
            })
        })
// // update
    shopping_cart
        .put('/shopping_cart/:item_id',(req,res)=>{
            knex('shopping_cart')
            .where('item_id',req.params.item_id)
            .update({
                'attributes':req.body.attributes,
                'quantity':req.body.quantity
            })
            .then(()=>{
                knex.select('item_id','name','attributes','shopping_cart.product_id','price','quantity','image')
                .from('shopping_cart')
                .where('item_id',req.params.item_id)
                .join('product', function() {
                    this.on('shopping_cart.product_id','=','product.product_id')
                })
                .then(data=>{
                    let list_data=[]
                    for(i of data){
                        let subtotal=i.quantity * i.price;
                        i.subtotal=subtotal
                        list_data.push(i)
                    }
                    console.log(list_data)
                    res.send(list_data)
                }).catch(err=>{
                    console.log(err);
                })
            }).catch(err=>{
                res.send(err)
            })

        })
        // delete
    shopping_cart
        .delete('/shopping_cart/:cart_id',(req,res)=>{
            knex('shopping_cart')
            .where('cart_id',req.params.cart_id)
            .del()
            .then(()=>{
                res.send("secuessfully deleted");
            }).catch(err=>{
                res.send(err);
            })
        })
    // move to cart
    shopping_cart
        .get('/shopping_cart/:item_id',(req,res)=>{
            knex.schema.hasTable('cart').then((exists) =>{
                if (!exists){
                    return knex.schema.createTable('cart',(t)=> {
                        t.increments('item_id').primary();
                        t.string('cart_id');
                        t.integer('product_id');
                        t.string('attributes');
                        t.integer('quantity');
                        t.integer('buy_now');
                        t.datetime('added_on');
                    }).then((data)=>{
                        // res.send("secuessfully done !");
                        knex('shopping_cart')
                        .where('item_id',req.params.item_id)
                        .then((data)=>{
                            // console.log(data)
                            knex('cart')
                            .insert(data)
                            .then(()=>{
                                // res.send("data move secuessfully !");
                                knex('shopping_cart')
                                .where('item_id',req.params.item_id)
                                .del()
                                .then(()=>{
                                    res.send("data deleted secuessfylly !")
                                }).catch(err=>{
                                    res.send(err);
                                })
                            }).catch(err=>{
                                res.send(err)
                            })
            
                        }).catch(err=>{
                            res.send(err)
                        })
                    }).catch(err=>{
                        res.send(404);
                    })
                }else{
                    knex('shopping_cart')
                    .where('item_id',req.params.item_id)
                    .then((data)=>{
                        // console.log(data)
                        knex('cart')
                        .insert(data)
                        .then(()=>{
                            knex('shopping_cart')
                            .where('item_id',req.params.item_id)
                            .del()
                            .then(()=>{
                                res.send("data deleted secuessfylly !")
                            }).catch(err=>{
                                res.send(err);
                            })
                        }).catch(err=>{
                            res.send(err)
                        })
        
                    }).catch(err=>{
                        res.send(err)
                    })
                }
            })

        })

    shopping_cart
        .get('/:cart_id',(req,res)=>{
            knex.select('price','quantity')
            .from('shopping_cart')
            .join('product', function() {
                this.on('shopping_cart.product_id','=','product.product_id')
            })
            .where('shopping_cart.cart_id',req.params.cart_id)
            .then(data=>{
                let list_data=[]
                for(i of data){
                    let total_amount=i.quantity * i.price;
                    i.total_amount=total_amount
                    list_data.push(i)
                }
                console.log(list_data)
                res.send(list_data)
            }).catch(err=>{
                console.log(err);
            })
        })
    
    // Remove a product in the cart
    shopping_cart
        .delete('/shopping_cart/:item_id',(req,res)=>{
            knex('cart')
            .where('item_id',req.params.item_id)
            .del()
            .then(()=>{
                res.send("secuessfully deleted");
            }).catch(err=>{
                res.send(err);
            })
        })
})

