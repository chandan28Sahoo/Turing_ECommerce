// get catagories
module.exports=((catagories,knex)=>{
    catagories
        .get('/',(req,res)=>{
            knex
            .select('*')
            .from('category')
            .then(data=>{
                res.send(data);
            }).catch(err=>{
                res.send(err)
            })
        })
})

// get catagories by id
module.exports=((catagories,knex)=>{
    catagories
        .get('/:category_by_id',(req,res)=>{
            knex
            .select('*')
            .from('category')
            .where('category_id',[req.params.category_by_id])
            .then(data=>{
                res.send(data);
            }).catch(err=>{
                res.send(err)
            })
        })
})



// Get a lit of Products of Categories by product_id
module.exports=((catagories,knex)=>{
    catagories
        .get('/:product_id',(req,res)=>{
            knex
            .select('*')
            .from('category')
            .join('product_category', function() {
                this.on('category.category_id ','=','product_category.category_id')
            })
            .join('product', function() {
                this.on('product_category.product_id ','=','product.product_id')
            })
           .where('product_category.product_id',[req.params.product_id])
            .then(data=>{
                let list=[]
                for(i of data){
                    let dict={
                        "category_id":i.category_id,
                        "department_id":i.department_id,
                        "name":i.name
                    }
                    list.push(dict);
                }
                res.send(list);
            }).catch(err=>{
                res.send(err)
            })
        })
})


// Get a lit of Products of Categories by department_id
module.exports=((catagories,knex)=>{
    catagories
        .get('/:department_id',(req,res)=>{
            knex
            .select('*')
            .from('category')
            .where('category.department_id',[req.params.department_id])
            .then(data=>{
                let list=[]
                for(i of data){
                    let dict={
                        "category_id": i.category_id,
                        "name":i.name,
                        "description": i.description,
                        "department_id":i.department_id
                    }
                    list.push(dict);
                }
                res.send(list);
            }).catch(err=>{
                res.send(err)
            })
        })
})