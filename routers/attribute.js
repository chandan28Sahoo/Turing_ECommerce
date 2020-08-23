// Get Attribute list
module.exports=((attribute,knex)=>{
    attribute
        .get('/',(req,res)=>{
            knex.select('*')
            .from('attribute')
            .then(data=>{
                res.send(data);
            }).catch(err=>{
                res.send(err);
            })
        })
})


// Get Attribute list by id
module.exports=((attribute,knex)=>{
    attribute
        .get('/:id',(req,res)=>{
            knex.select('*')
            .from('attribute')
            .where('attribute_id',[req.params.id])
            .then(data=>{
                res.send(data);
            }).catch(err=>{
                res.send(err);
            })
        })
})


// get attributes list by attribute_value_id
module.exports=((attribute,knex)=>{
    attribute
        .get('/:attribute_value_id',(req,res)=>{
            knex.select('attribute_value_id','value')
            .from('attribute_value')
            .where('attribute_value_id',[req.params.attribute_value_id])
            .then(data=>{
                res.send(data)
            }).catch(err=>{
                res.send(err);
            })
        })
})

// get attribute by product id
module.exports=((attribute,knex)=>{
    attribute
        .get('/:product_id',(req,res)=>{
            knex.select('*')
            .from('attribute')
            .join('attribute_value', function() {
                this.on('attribute.attribute_id','=','attribute_value.attribute_id')
            })
            .join('product_attribute', function() {
                this.on('attribute_value.attribute_value_id','=', 'product_attribute.attribute_value_id')
            })
            .where('product_attribute.product_id',[req.params.product_id])
            .then(data=>{
                let list=[]
                for (i of data){
                    let dict={
                        "attribute_name": i.name,
                        "attribute_value_id":i.attribute_value_id,
                        "attribute_value": i.value
                    }
                    list.push(dict)
                }
                res.send(list)
            }).catch(err=>{
                res.send(err);
            })
        })
})