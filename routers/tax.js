// get all tex 
module.exports=((tax,knex)=>{
    tax
        .get('/',(req,res)=>{
            knex
            .select('*')
            .from('tax')
            .then(data=>{
                res.send(data);
            }).catch(err=>{
                res.send(err)
            })
        })

    // get tax by id
    tax
        .get('/:tax_id',(req,res)=>{
            knex
            .select('*')
            .from('tax')
            .where('tax_id',[req.params.tax_id])
            .then(data=>{
                res.send(data);
            }).catch(err=>{
                res.send(err)
            })
        })
})
