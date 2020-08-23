// get all departments
module.exports=((deparment,knex)=>{
    deparment
        .get('/',(req,res)=>{
            knex
            .select('*')
            .from('department')
            .then(data=>{
                res.send(data);
            }).catch(err=>{
                res.send(err)
            })
    })
})

// get department by id
module.exports=((deparment,knex)=>{
    deparment
        .get('/:department_by_id',(req,res)=>{
            knex
            .select('*')
            .from('department')
            .where('department_id',[req.params.department_by_id])
            .then(data=>{
                res.send(data);
            }).catch(err=>{
                res.send(err)
            })
    })
})