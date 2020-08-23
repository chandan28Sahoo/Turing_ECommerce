// get all product
module.exports=((product,knex)=>{
    product
        .get('/',(req,res)=>{
            knex
            .select('*')
            .from('product')
            .then(data=>{
                res.send(data);
            }).catch(err=>{
                res.send(err)
            })
        })
})


// Product by ID
module.exports=((product,knex)=>{
    product
        .get('/:Product_by_ID',(req,res)=>{
            knex
            .select('*')
            .from('product')
            .where('product_id',[req.params.Product_by_ID])
            .then(data=>{
                res.send(data);
            }).catch(err=>{
                res.send(err)
            })
        })
})


// Get a lit of Products of Categories by category_id
module.exports=((product,knex)=>{
    product
        .get('/:category_id',(req,res)=>{
            knex
            .select('*')
            .from('product')
            .join('product_category', function() {
                this.on('product.product_id','=','product_category.product_id')
            })
            .join('category', function() {
                this.on('product_category.category_id','=','category.category_id')
            })
           .where('category.category_id',[req.params.category_id])
            .then(data=>{
                let list=[]
                for(i of data){
                    let dict={
                        "product_id":i.product_id,
                        "name": i.name,
                        "description":i.description,
                        "price":i.price,
                        "discounted_price":i.discounted_price,
                        "thumbnail":i.thumbnail
                    }
                    list.push(dict);
                }
                res.send(list);
            }).catch(err=>{
                res.send(err)
            })
        })
})

// Get a lit of Products on Department ny department id
module.exports=((product,knex)=>{
    product
        .get('/:department_id',(req,res)=>{
            knex
            .select('*')
            .from('product')
            .join('product_category', function() {
                this.on('product.product_id','=','product_category.product_id')
            })
            .join('category', function() {
                this.on('product_category.category_id','=','category.category_id')
            })
            .join('department', function() {
                this.on('category.department_id ','=','department.department_id ')
            })
           .where('department.department_id',[req.params.department_id])
            .then(data=>{
                let list=[]
                for(i of data){
                    let dict={
                        "product_id":i.product_id,
                        "name": i.name,
                        "description":i.description,
                        "price":i.price,
                        "discounted_price":i.discounted_price,
                        "thumbnail":i.thumbnail
                    }
                    list.push(dict);
                }
                res.send(list);
            }).catch(err=>{
                res.send(err)
            })
        })
})

// 
module.exports=((product,knex)=>{
        product
            .get('/:department_id',(req,res)=>{
                knex
                .select('*')
                .from('product')
                .join('product_category', function() {
                    this.on('product.product_id','=','product_category.product_id')
                })
                .join('category', function() {
                    this.on('product_category.category_id','=','category.category_id')
                })
                .join('department', function() {
                    this.on('category.department_id ','=','department.department_id ')
                })
               .where('department.department_id',[req.params.department_id])
                .then(data=>{
                    let list=[]
                    for(i of data){
                        let dict={
                            "product_id":i.product_id,
                            "name": i.name,
                            "description":i.description,
                            "price":i.price,
                            "discounted_price":i.discounted_price,
                            "thumbnail":i.thumbnail
                        }
                        list.push(dict);
                    }
                    res.send(list);
                }).catch(err=>{
                    res.send(err)
                })
            })


        product
            .get('/:product_id',(req,res)=>{
                knex.select("product_id","name","description","price","discounted_price","image","image_2")
                .from('product')
                .where('product_id',req.params.product_id)
                .then(data=>{
                    res.send(data);
                }).catch(err=>{
                    res.send(err)
                })
            })

    // location
    product
        .get('/location/:product_id',(req,res)=>{
            knex
            .select(
                'category.category_id',
                'category.name as category_name',
                'department.department_id',
                'department.name as department_name'
            )
            .from('product')
            .join('product_category', function() {
                this.on('product.product_id','=','product_category.product_id')
            })
            .join('category', function() {
                this.on('product_category.category_id','=','category.category_id')
            })
            .join('department', function() {
                this.on('category.department_id ','=','department.department_id ')
            })
            .where('product.product_id',req.params.product_id)
            .then(data=>{
                res.send(data)
            }).catch(err=>{
                console.log(err)
            })
            
        })

    // review
    product
        .get('/:product_id',(req,res)=>{
            knex.select('review.name','review','rating','created_on')
            .from("review")
            .join('product', function() {
                this.on('product.product_id', '=', 'review.product_id')
            })
            .where('review.product_id',req.params.product_id)
            .then(data=>{
                res.send(data)
            }).catch(err=>{
                res.send(err)
            })
        })

    product
        .post('/reviews/:customer_id',(req,res)=>{
            knex.select('name','customer_id')
            .from('customer')
            .where("customer_id",req.params.customer_id)
            .then((data)=>{
                let review_data = {
                    "customer_id":data[0].customer_id,
                    "product_id":req.body.product_id,
                    "review":req.body.review,
                    "rating":req.body.rating,
                    "created_on":new Date()
                }
                knex('review').insert(review_data)
                .then(data=>{
                    res.send("review sucessfully insert !")
                }).catch(err=>{
                    res.send(err)
                })
            }).catch(err=>{
                res.send(err)
            })
        })
})



