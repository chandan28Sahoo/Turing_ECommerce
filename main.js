const express=require('express');
const knex=require('./knex')
const app=express();
const router =express.Router();
const jwt = require('jsonwebtoken');
app.use('/',router)
router.use(express.json())

router.get('/test',(req,res)=>{
    res.send("databases connect !")
})

// deparment
router.use('/data',router)
require("./routers/deparment")(router,knex);

// categories
router.use('/data',router)
require("./routers/categories")(router,knex);


// attribute
router.use('/data',router)
require("./routers/attribute")(router,knex);


// products
router.use('/data',router)
require("./routers/product")(router,knex);


// customer
//  sign up
router.use('/data',router)
require("./routers/customer")(router,knex);

// login
router.use('/data',router)
require("./routers/customer")(router,knex,jwt);

router.use('/data_by_id',router)
require("./routers/customer")(router,knex);

router.use('/data',router)
require("./routers/customer")(router,knex);

// Get a customer by ID. The customer is getting by Token.
router.use('/data',router)
require("./routers/customer")(router,knex,jwt);

// update address
router.use('/data',router)
require("./routers/customer")(router,knex,jwt);
// ###########

// order
router.use('/data',router)
require("./routers/order")(router,knex);


// tax
router.use('/data',router)
require("./tax")(router,knex);


// shipping
router.use('/data',router)
require("./routers/shipping")(router,knex);

// shopping_cart
router.use('/data',router)
require("./routers/shopping_cart")(router,knex);


app.listen(4000,()=>{
    console.log("server is running on port 4000")
})
