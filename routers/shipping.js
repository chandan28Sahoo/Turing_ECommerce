//get all  shipping_region
module.exports=((shipping,knex)=>{
    shipping
        .get('/',(req,res)=>{
            knex
            .select('*')
            .from('shipping_region')
            .then(data=>{
                res.send(data);
            }).catch(err=>{
                res.send(err)
            })
        })
})


//get all  shipping_region by id
module.exports=((shipping,knex)=>{
    shipping
        .get('/:shipping_id',(req,res)=>{
            knex
            .select('*')
            .from('shipping')
            .where('shipping_id',[req.params.shipping_id])
            .then(data=>{
                res.send(data);
            }).catch(err=>{
                res.send(err)
            })
        })
})
