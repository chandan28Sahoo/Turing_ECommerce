module.exports=((order,knex)=>{
    order
        .post('/:email',(req,res)=>{
            knex
            .select('*')
            .from('customer')
            .where('email',req.params.email)
            .then(data=>{
                var catomer=data[0].customer_id
                // console.log(catomer)
                knex.select('*')
                .from('shopping_cart')
                .join('product', function() {
                    this.on('shopping_cart.product_id','=','product.product_id')
                })
                .where('shopping_cart.cart_id',req.body.cart_id)
                .then(data=>{
                    var add_data={
                        "total_amount":data[0].price*data[0].quantity,
                        "created_on":new Date(), 
                        "customer_id":catomer,
                        "shipping_id":req.body.shipping_id,
                        "tax_id":req.body.tax_id
                    };
                    knex('orders').insert(add_data)
                    .then(data1=>{
                        knex('order_detail').insert({
                            "order_id": data1[0],
                            "product_id":data[0].product_id,
                            "attributes":data[0].attributes,
                            "product_name":data[0].name,
                            "quantity":data[0].quantity,
                            "unit_cost":data[0].price
                        }).then(()=>{
                            res.send("order secuessfull created !");
                        }).then(err=>{
                            res.send(err);
                        })
                    }).catch(err=>{
                        res.send(err)
                    })
                }).catch(err=>{
                    console.log(err);
                })
            }).catch(err=>{
                res.send(err);
            })
        })


    // get order details by order_id
    order
        .get('/:order_id',(req,res)=>{
            knex
            .select('*')
            .from('order_detail')
            .where('order_id',req.params.order_id)
            .then(data=>{
                res.send(data);
            })
        })


    order
        .get('/get/:customer_id ',(req,res)=>{
            knex
            .select('*')
            .from('orders')
            .where('customer_id',req.params.customer_id)
            .then(data=>{
                res.send(data);
            }).then(err=>{
                console.log(err)
            })
            .join('order_detail', function() {
                this.on('orders.order_id ','=','order_detail.order_id ')
            })
            .where('orders.customer_id',req.params.customer_id)
            .then(data=>{
                res.send(data);
                let list=[]
                for (i of data){
                    let dict={
                        "item_id":i.item_id,
                        "order_id": i.order_id,
                        "product_id":i.product_id,
                        "attributes": i.attributes,
                        "product_name":i.product_name,
                        "quantity": i.quantity,
                        "unit_cost":i.unit_cost
                    }
                    list.push(dict);
                }
                // res.send(list);
                res.send(data);
            }).catch(err=>{
                res.send(err);
            })
        })



    order
        .get('/get/:order_id  ',(req,res)=>{
            knex
            .select('*')
            .from('orders')
            .join('order_detail', function() {
                this.on('orders.order_id ','=','order_detail.order_id ')
            })
            .where('orders.order_id ',req.params.order_id )
            .then(data=>{
                // res.send(data);
                let list=[]
                for (i of data){
                    let dict={
                        "item_id":i.item_id,
                        "order_id": i.order_id,
                        "product_id":i.product_id,
                        "attributes": i.attributes,
                        "product_name":i.product_name,
                        "quantity": i.quantity,
                        "unit_cost":i.unit_cost
                    }
                    list.push(dict);
                }
                // res.send(list);
                res.send(data);
            }).catch(err=>{
                res.send(err);
            })
        })
})



























// module.exports=((testing,knex,cookieParser)=>{
//     testing
//         .get("/send", (req, res) => {
//             res.cookie('name','fkjfklkl')
//             .send('cookie set')
//             // res.send('cookie',req.cookies);
//         });
// })

